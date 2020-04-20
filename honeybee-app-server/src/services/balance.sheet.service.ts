import { addDays, endOfDay, endOfWeek, format, isSaturday, isSunday, lastDayOfMonth, lastDayOfWeek, lastDayOfYear, set, startOfDay, startOfWeek, subDays, subMonths, subWeeks, subYears } from "date-fns"
import { ObjectId } from "mongodb"
import mongoose from 'mongoose'
import schedule from "node-schedule"
import { percentVariation } from "../core/Utils"
import { BalanceSheetHistory, BalanceSheetHistoryModel } from "../models/balance.sheet.history.model"
import { BalanceSheet, BalanceSheetModel, StockSheet } from "../models/balance.sheet.model"
import { OrderModel, OrderSides, OrderStatus } from "../models/order.model"
import { Stock } from "../models/stock.model"
import { StockTracker } from "../models/stock.tracker.model"
import { UserAccount } from "../models/user.account.model"
import { OrderExecution } from "../plugins/broker/broker.plugin"
import { cache } from "./cache.service"
import { getLastClosingPrice } from "./stock.history.service"
import { findAllowedAccounts } from "./user.account.service"

type BalanceSheeSummary = {
    amount?: number
    amountVariation?: number
    credits?: number
    creditVariation?: number
    stocks?: number
    stockVariation?: number
}

type BalanceSheetHistorySummary = {
    label?: string
    amount?: number
    amountVariation?: number
    credits?: number
    creditVariation?: number
    stocks?: number
    stockVariation?: number
}

type GroupBy = "day" | "week" | "month" | "year"

/**
 * 
 *
 */
export const scheduleBalanceProcessor = () => {
    schedule.scheduleJob(process.env.BALANCE_SHEET_JOB, () => processDailyBalanceSheet())
}

/**
 *
 *
 * @param {(ObjectId | string)} userAccountId
 * @param {(ObjectId | string)} [brokerAccountId]
 * @returns
 */
export const findBalanceSheetOnCache = (userAccountId: ObjectId | string, brokerAccountId?: ObjectId | string): Promise<BalanceSheet[]> => {
    const key = `findBalanceSheet_${userAccountId}_${brokerAccountId}`
    return cache.get(key, () => findBalanceSheet(userAccountId, brokerAccountId))
}

/**
 *
 *
 * @param {(ObjectId | string)} userAccountId
 * @param {(ObjectId | string)} [brokerAccountId]
 * @returns {Promise<BalanceSheet[]>}
 */
export const findBalanceSheet = (userAccountId: ObjectId | string, brokerAccountId?: ObjectId | string): Promise<BalanceSheet[]> => {
    return BalanceSheetModel.find({ userAccount: userAccountId, brokerAccount: brokerAccountId }).exec()
}

/**
 *
 *
 * @param {string} userAccountId
 * @returns {Promise<BalanceSheeSummary>}
 */
export const findAllBalanceSheetByUser = async (userAccountId: string): Promise<BalanceSheeSummary> => {
    
    const balances = await BalanceSheetModel.find({ userAccount: userAccountId })
    const summary = balances.reduce((summary, item) => {
        summary.amount += item.getTotalAmount()
        summary.credits += item.currentAmount
        summary.stocks += item.getTotalStock()
        return summary
    }, {
        amount: 0,
        amountVariation: 0,
        credits: 0,
        creditVariation: 0,
        stocks: 0,
        stockVariation: 0
    })

    const lastHistory = await findLastBalanceSheetHistoryByUser(userAccountId, new Date())
    const lastHistorySummary = sumBalanceSheetHistories([lastHistory])
    if (lastHistory){
        summary.amountVariation = percentVariation(lastHistorySummary.amount, summary.amount)
        summary.creditVariation = percentVariation(lastHistorySummary.credits, summary.credits)
        summary.stockVariation = percentVariation(lastHistorySummary.stocks, summary.stocks)
    }

    return summary
}

/**
 *
 *
 * @param {string} userAccountId
 * @param {Date} date
 * @param {number} page
 * @param {number} qty
 * @param {GroupBy} [groupBy]
 * @returns {Promise<BalanceSheetHistorySummary[]>}
 */
export const findAllBalanceSheetHistoryByUser = async (userAccountId: string, date: Date, 
    page: number, qty: number, groupBy?: GroupBy): Promise<BalanceSheetHistorySummary[]> => {

    let startDate
    let endDate
    let groupClause: any
    let label: any

    switch (groupBy) {
        case "day":
            endDate = subDays(endOfDay(date), page * qty)
            startDate = subDays(startOfDay(endDate), qty)
            groupClause = { day: "$date" }
            label = "$date"
            break

        case "week":
            endDate = subWeeks(lastDayOfWeek(date), page * qty)
            startDate = lastDayOfWeek(subWeeks(endDate, qty))
            groupClause = { week: "$week" }
            label = { "$concat": [{ "$toString": { "$week": "$date" }}, "W-", { "$toString": { "$year": "$date" }}]}
            break

        case "month":
            endDate = subMonths(lastDayOfMonth(date), page * qty)
            startDate = lastDayOfMonth(subMonths(endDate, qty))
            groupClause = { month: "$month" }
            label = { "$concat": [{ "$toString": { "$month": "$date" }}, "M-", { "$toString": { "$year": "$date" }}]}
            break

        case "year":
            endDate = subYears(lastDayOfYear(date), page * qty)
            startDate = lastDayOfYear(subYears(endDate, qty))
            groupClause = { year: "$year" }
            label = "$_id.year"
            break
    }

    let query = await BalanceSheetHistoryModel
        .aggregate([
            {
                "$match": { 
                    userAccount: mongoose.Types.ObjectId(userAccountId), 
                    date: { "$gt": startDate, "$lte": endDate }
                }
            },
            {
                "$addFields": { 
                    week: { "$week": "$date" },
                    month: { "$concat": [{ "$toString": { "$month": "$date" }}, "-", { "$toString": { "$year": "$date" }}]},
                    year: { "$year": "$date" }
                }
            },
            {
                "$group": {
                    _id: { ...groupClause, userAccount: "$userAccount", brokerAccount: "$brokerAccount" },
                    date: { "$max": "$date" },
                    history: { "$last": "$$ROOT" }
                }
            },
            {
                "$project": {
                    _id: 0,
                    label,
                    root: "$history",
                }
            }
        ]).sort({ "root.date": "asc" })

    let groups = groupBalanceSheetHistories(query)
    return createBalanceSheetHistorySummaries(groups, groupBy)
}

/**
 *
 *
 * @param {GroupBy} group
 * @param {*} label
 * @returns
 */
const createLabel = (group: GroupBy, label: any) => {
    let _date = new Date(label)
    switch(group) {

        case "day":
            return format(_date, "dd/MMM")
        
        case "week":
            let st = startOfWeek(_date)
            let ed = endOfWeek(_date)
            return `${format(st, "dd/MMM")} to ${format(ed, "dd/MMM")}`

        case "month":
            return format(_date, "MMM/yyyy")
        
        default:
            return label
    }
}

const groupBalanceSheetHistories = (query: { label: string, root: BalanceSheetHistory }[]) => {
    return query.reduce((groups: any, item: any) => {
        let label = item["label"]
        groups[label] = groups[label] || []
        groups[label].push(item)
        return groups
    }, {})
}


/**
 *
 *
 * @param {*} groups
 * @param {GroupBy} groupBy
 * @returns {BalanceSheetHistorySummary[]}
 */
const createBalanceSheetHistorySummaries = (groups: any, groupBy: GroupBy): BalanceSheetHistorySummary[] => {
    let keys = Object.keys(groups)
    let lastAmount = 0, lastCredit = 0, lastStock = 0
    return keys.map(key => {
        let roots = groups[key]
        let historySummary = sumBalanceSheetHistories(roots.map((r: any) => r.root))
        let summary: BalanceSheetHistorySummary = { 
            label: createLabel(groupBy, roots[0].root.date), 
            amount: historySummary.amount,
            amountVariation: percentVariation(lastAmount, historySummary.amount),
            credits: historySummary.credits,
            creditVariation: percentVariation(lastCredit, historySummary.credits),
            stocks: historySummary.stocks,
            stockVariation: percentVariation(lastStock, historySummary.stocks)
        }
        lastAmount = historySummary.amount
        lastCredit = historySummary.credits
        lastStock = historySummary.stocks
        return summary
    })
    .reverse()
}

/**
 *
 *
 * @param {BalanceSheetHistory[]} balances
 * @returns {BalanceSheetHistorySummary}
 */
const sumBalanceSheetHistories = (balances: BalanceSheetHistory[]): BalanceSheetHistorySummary => {
    return balances.reduce((summary, balance) => {
        let credits = balance && balance.currentAmount || 0
        let stocks = balance && balance.stocks.reduce((sum, stock) => sum += (stock.qty * stock.averagePrice), 0) || 0
        summary.amount += credits + stocks
        summary.credits += credits
        summary.stocks += stocks
        return summary
    }, {
        amount: 0,
        credits: 0,
        stocks: 0
    })
}

/**
 *
 *
 * @param {string} userAccountId
 * @param {Date} dateReference
 * @returns
 */
export const findLastBalanceSheetHistoryByUser = (userAccountId: string, dateReference: Date) => {
    return BalanceSheetHistoryModel.findOne({ userAccount: userAccountId, date: { "$lt": dateReference} })
        .sort({ date: "desc" })
        .limit(1)
}

/**
 * 
 *
 * @param {ObjectId} userAccount
 * @param {ObjectId} [brokerAccount]
 */
export const createNewBalanceSheet = async (userAccount: ObjectId, brokerAccount?: ObjectId) => {
    let isSimulation = !brokerAccount
    let initialAmount = isSimulation ? process.env.INITIAL_SIMULATION_AMOUNT : 0
    let currentAmount = initialAmount
    BalanceSheetModel.create({ userAccount, brokerAccount, initialAmount, currentAmount })
}

/**
 * 
 *
 */
const processDailyBalanceSheet = async () => {
    const now = new Date()
    const userAccounts = await findAllowedAccounts()
    await Promise.all(userAccounts.map(async (userAccount) => {
        const histories = await generateDailyBalanceSheetHistory(userAccount, now)
        BalanceSheetHistoryModel.create(histories)
    }))
}

/**
 * 
 *
 * @param {UserAccount} userAccount
 * @param {Date} date
 * @returns
 */
const generateDailyBalanceSheetHistory = async (userAccount: UserAccount, date: Date) => {
    const balances = await findBalanceSheetOnCache(userAccount._id)
    const histories = await Promise.all(balances.map(async (balance) => generateBalanceSheetHistory(balance, date)))
    return histories.filter(history => history !== undefined)
}

/**
 *
 *
 * @param {BalanceSheet} balance
 * @param {Date} date
 * @returns {Promise<BalanceSheetHistory>}
 */
const generateBalanceSheetHistory = async (balance: BalanceSheet, date: Date): Promise<BalanceSheetHistory> => {
    const _date = set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0})
    const history = await BalanceSheetHistoryModel.findOne({ userAccount: balance.userAccount, brokerAccount: balance.brokerAccount, date: _date })
    if (history) {
        return
    }

    const historySheet = {
        userAccount: balance.userAccount,
        brokerAccount: balance.brokerAccount,
        currentAmount: balance.currentAmount,
        date: _date
    } as BalanceSheetHistory

    const stocks: StockSheet[] = []
    for (let stockEntry of balance.stocks) {
        const lastPrice = stockEntry.qty > 0 ? await getLastClosingPrice(stockEntry.symbol, date) : 0
        stocks.push({ symbol: stockEntry.symbol, qty: stockEntry.qty, averagePrice: lastPrice, progress: 0 })
    }
    
    historySheet["stocks"] = stocks
    return historySheet
}

/**
 * 
 *
 * @param {BalanceSheet} balance
 * @param {string} symbol
 * @param {OrderSides} side
 * @param {number} qty
 * @param {number} price
 * @returns {BalanceSheet}
 */
const addBalanceOrderExecution = (balance: BalanceSheet, symbol: string, side: OrderSides, qty: number, price: number, status: OrderStatus, progress: number): BalanceSheet => {
    
    if (status === OrderStatus.PARTIAL_FILLED || OrderStatus.FILLED) {
        const stockEntry = balance.stocks.find(stock => stock.symbol === symbol)
        const _progress = progress < 100 ? progress : 0

        if (stockEntry) {

            if (stockEntry.progress === progress) {
                return balance
            }
    
            if (side === OrderSides.BUY) {
                stockEntry.averagePrice = stockEntry.qty > 0 ? (stockEntry.averagePrice + price) / 2 : price
                stockEntry.qty += qty
                stockEntry.progress = _progress
                balance.currentAmount -= qty * price
            }
    
            if (side === OrderSides.SELL) {
                stockEntry.qty -= qty
                stockEntry.averagePrice = stockEntry.qty === 0 ? 0 : stockEntry.qty
                stockEntry.progress = _progress
                balance.currentAmount += qty * price
            }
    
            return balance
        }
    
        balance.currentAmount -= qty * price
        balance.stocks.push({ symbol, qty, averagePrice: price, progress: _progress })
    }

    return balance
}

/**
 *
 *
 * @param {OrderExecution} { orderCode, quantity, price, status, progress }
 * @param {StockTracker} stockTracker
 */
export const processBalanceByExecution = async ({ orderCode, quantity, price, status, progress }: OrderExecution, stockTracker: StockTracker) => {
    const balances = await findBalanceSheetOnCache(stockTracker.getUserAccountId(), stockTracker.getBrokerAccountId())
    balances.forEach(async (balance) => {
        const side = <OrderSides>(await OrderModel.findOne({ orderBrokerId: orderCode })).side
        let updatedBalance = addBalanceOrderExecution(balance, stockTracker.getSymbol(), side, quantity, price, status, progress)
        cache.save(updatedBalance, BalanceSheetModel)
    })
}





/**
 * ------------------------------------------------------------------------------------------------------------
 * FIXME It works but it's too ugly!
 *
 * @param {string} userAccountId
 */
export const regenerateBalanceSheetAndHistory = async (userAccountId: string) => {
    
    // reseta balanco history
    await BalanceSheetHistoryModel.deleteMany({ userAccount: userAccountId })
    
    const now = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) 
    const balances = await findBalanceSheetOnCache(userAccountId)
    for (let balance of balances) {

        balance.currentAmount = balance.initialAmount
        balance.stocks = []
        cache.save(balance, BalanceSheetModel)

        let currentDate = balance.createdAt
        while(currentDate <= now) {
            
            let isWeekend = isSaturday(currentDate) || isSunday(currentDate)
            if (!isWeekend) {
                
                // Logger.debug("Generating balance to", balanceCreatedAt, isWeekend)
                // busca os ordens para processamento
                const orders = await OrderModel.find({ userAccount: balance.userAccount, createdAt: { "$gte": currentDate, "$lt": addDays(currentDate, 1) }})
                    .populate("stock")
                    .sort({ "createdAt": "asc" })

                if (orders.length === 0) {
                    let history = await generateBalanceSheetHistory(balance, currentDate)
                    if (history) {
                        await BalanceSheetHistoryModel.create(history)
                    }
                }
                else {
                    // agrupa ordens por data
                    let mapa = orders.reduce((group, order) => {
                        let _data = set(order.createdAt, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toString()
                        
                        let arr = group.get(_data)
                        if (arr === undefined) {
                            arr = []
                            group.set(_data, arr)
                        }
                        arr.push(order)
                        return group
    
                    }, new Map())
    
                    // percorre grupos de datas
                    for (let key of mapa.keys()) {
    
                        let ords = mapa.get(key)
    
                        // atualiza o balanco
                        for (let ord of ords) {
                            addBalanceOrderExecution(balance, (<Stock>ord.stock).symbol, ord.side, ord.getQuantityExecuted(), ord.getExecutedPriceAverage(), ord.status, ord.progress)
                        }
    
                        // salva alterações balance
                        let dd = new Date(key)
                        let history = await generateBalanceSheetHistory(balance, dd)
                        if (history) {
                            await BalanceSheetHistoryModel.create(history)
                        }
    
                        cache.save(balance, BalanceSheetModel)
                    }
                }
            }
            
            currentDate = addDays(currentDate, 1)
        }
    }
}


