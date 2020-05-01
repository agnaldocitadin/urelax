import { addDays, endOfDay, endOfWeek, format, isSaturday, isSunday, lastDayOfMonth, lastDayOfWeek, lastDayOfYear, set, startOfDay, startOfWeek, subDays, subMonths, subWeeks, subYears } from "date-fns"
import { BalanceSheetHistorySummary, BalanceSheetSummary, GroupBy } from "honeybee-api"
import { ObjectId } from "mongodb"
import mongoose from 'mongoose'
import schedule from "node-schedule"
import { Logger } from "../core/Logger"
import { percentVariation, Utils } from "../core/Utils"
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
    return BalanceSheetModel.find({ userAccount: <any>userAccountId, brokerAccount: <any>brokerAccountId }).exec()
}

/**
 *
 *
 * @param {string} userAccountId
 * @returns {Promise<BalanceSheetSummary>}
 */
export const findAllBalanceSheetByUser = async (userAccountId: string): Promise<BalanceSheetSummary> => {
    
    let initialSummary: BalanceSheetSummary =  {
        amount: 0,
        amountVariation: 0,
        credits: 0,
        creditVariation: 0,
        stocks: 0,
        stockVariation: 0
    }

    // Find all balance sheets by user account and summarize them.
    const balances = await BalanceSheetModel.find({ userAccount: <any>userAccountId })
    const summary = balances.reduce((balance: BalanceSheetSummary, item: BalanceSheet) => {
        balance.amount += item.getTotalAmount()
        balance.credits += item.currentAmount
        balance.stocks += item.getTotalStock()
        return balance
    }, initialSummary)

    // Find the last one balance sheet history by user to calculate the variations
    const lastHistory = await findLastBalanceSheetHistoryByUser(userAccountId, new Date())
    let lastHistorySummary = sumBalanceSheetHistories([lastHistory])

    // If no balance sheet has been found, it means that the user hasn't started making orders yet.
    if (!lastHistory) {
        let initialAmount = balances.reduce((total, balance) => total += balance.initialAmount, 0)
        lastHistorySummary = {
            amount: initialAmount,
            credits: initialAmount
        }
    }
    
    summary.amountVariation = percentVariation(lastHistorySummary.amount, summary.amount)
    summary.creditVariation = percentVariation(lastHistorySummary.credits, summary.credits)
    summary.stockVariation = percentVariation(lastHistorySummary.stocks, summary.stocks)
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
    let _qty = qty

    switch (groupBy) {
        case "day":
            _qty += 2
            endDate = subDays(endOfDay(date), page * _qty)
            startDate = subDays(startOfDay(endDate), _qty)
            groupClause = { day: "$date" }
            label = "$date"
            break

        case "week":
            _qty += 1
            endDate = subWeeks(lastDayOfWeek(date), page * _qty)
            startDate = lastDayOfWeek(subWeeks(endDate, _qty))
            groupClause = { week: "$week" }
            label = { "$concat": [{ "$toString": { "$week": "$date" }}, "W-", { "$toString": { "$year": "$date" }}]}
            break

        case "month":
            _qty += 1
            endDate = subMonths(lastDayOfMonth(date), page * _qty)
            startDate = lastDayOfMonth(subMonths(endDate, _qty))
            groupClause = { month: "$month" }
            label = { "$concat": [{ "$toString": { "$month": "$date" }}, "M-", { "$toString": { "$year": "$date" }}]}
            break

        case "year":
            _qty += 1
            endDate = subYears(lastDayOfYear(date), page * _qty)
            startDate = lastDayOfYear(subYears(endDate, _qty))
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
                    root: "$history"
                }
            }
        ]).sort({ "root.date": "asc" })

    let balanceSheets = await findBalanceSheetOnCache(userAccountId)
    let initialAmount = balanceSheets.reduce((amount, sheet) => amount += sheet.initialAmount, 0)

    let groups = groupBalanceSheetHistories(query)
    let summaries = createBalanceSheetHistorySummaries(initialAmount, groups, groupBy)
    return Utils.Array.firstElements(summaries, qty) 
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

        case "year":
            return _date.getFullYear()
        
        default:
            return label
    }
}

/**
 *
 *
 * @param {{ label: string, root: BalanceSheetHistory }[]} query
 * @returns
 */
const groupBalanceSheetHistories = (query: { label: string, root: BalanceSheetHistory }[]) => {
    return query.reduce((groups: any, item: any) => {
        let label = item["label"]
        groups[label] = groups[label] || []
        groups[label].push(item)
        return groups
    }, {})
}

/**
 * FIXME There's a workaround here!
 *
 * @param {*} groups
 * @param {GroupBy} groupBy
 * @returns {BalanceSheetHistorySummary[]}
 */
const createBalanceSheetHistorySummaries = (initalAmount: number, groups: any, groupBy: GroupBy): BalanceSheetHistorySummary[] => {
    let keys = Object.keys(groups)
    let lastAmount = 0, lastCredit = 0, lastStock = 0

    return keys.map(key => {
        let roots = groups[key]
        let balances: BalanceSheetHistory[] = roots.map((r: any) => r.root)
        let historySummary = sumBalanceSheetHistories(balances)
        lastAmount = (lastAmount === 0 ? initalAmount : lastAmount)
        
        let summary: BalanceSheetHistorySummary = { 
            label: createLabel(groupBy, roots[0].root.date),
            profit: historySummary.amount - lastAmount,
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
        let stocks = balance && balance.stocks.reduce((sum, stock) => sum += (stock.qty * stock.lastAvailablePrice), 0) || 0
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
 * @param {Date} referenceDate
 * @returns
 */
export const findLastBalanceSheetHistoryByUser = (userAccountId: string, referenceDate: Date) => {
    return BalanceSheetHistoryModel.findOne({ userAccount: <any>userAccountId, date: { "$lt": referenceDate} })
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
    Logger.info("[BalanceSheetService] Daily balance sheet process has stated...")
    const now = new Date()
    const userAccounts = await findAllowedAccounts()

    Logger.info("[BalanceSheetService] Generating balances to %s accounts.", userAccounts.length)
    await Promise.all(userAccounts.map(async (userAccount) => {
        const balances = await findBalanceSheetOnCache(userAccount._id)
        await updateStockPriceFrom(balances, now)
        const histories = await generateDailyBalanceSnapshot(balances, now)
        BalanceSheetHistoryModel.create(histories)
    }))

    Logger.info("[BalanceSheetService] Daily balance sheet process finished successfully!")
}

/**
 *
 *
 * @param {BalanceSheet[]} balances
 * @param {Date} referenceDate
 */
const updateStockPriceFrom = async (balances: BalanceSheet[], referenceDate: Date) => {
    for (let balance of balances) {
        for (let stock of balance.stocks) {
            if (stock.qty > 0) {
                const price = await getLastClosingPrice(stock.symbol, referenceDate)
                stock.lastAvailablePrice = price
            }
        }
        cache.save(balance, BalanceSheetModel)
    }
}

/**
 * 
 *
 * @param {UserAccount} userAccount
 * @param {Date} date
 * @returns
 */
const generateDailyBalanceSnapshot = async (balances: BalanceSheet[], date: Date): Promise<BalanceSheetHistory[]> => {
    const histories = await Promise.all(balances.map(async (balance) => await generateBalanceSnapshot(balance, date)))
    return histories.filter(history => history !== undefined)
}

/**
 *
 *
 * @param {BalanceSheet} balance
 * @param {Date} date
 * @returns {Promise<BalanceSheetHistory>}
 */
const generateBalanceSnapshot = async (balance: BalanceSheet, date: Date): Promise<BalanceSheetHistory> => {
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
        stocks.push({
            ...stockEntry,
            progress: 0
        })
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
                stockEntry.lastAvailablePrice = stockEntry.qty === 0 ? stockEntry.averagePrice : stockEntry.lastAvailablePrice
                stockEntry.qty += qty
                stockEntry.progress = _progress
                balance.currentAmount -= qty * price
            }
    
            if (side === OrderSides.SELL) {
                stockEntry.qty -= qty
                stockEntry.averagePrice = stockEntry.qty === 0 ? 0 : stockEntry.qty
                stockEntry.lastAvailablePrice = stockEntry.qty === 0 ? 0 : stockEntry.lastAvailablePrice
                stockEntry.progress = _progress
                balance.currentAmount += qty * price
            }
    
            return balance
        }
    
        balance.currentAmount -= qty * price
        balance.stocks.push({
            symbol, 
            qty, 
            averagePrice: price, 
            lastAvailablePrice: price, 
            progress: _progress
        })
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
    await BalanceSheetHistoryModel.deleteMany({ userAccount: <any>userAccountId })
    
    const now = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) 
    const balances = await findBalanceSheetOnCache(userAccountId)
    for (let balance of balances) {

        balance.currentAmount = balance.initialAmount
        balance.stocks = []
        cache.save(balance, BalanceSheetModel)

        let currentDate =  set(balance.createdAt, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        while(currentDate <= now) {

            let isWeekend = isSaturday(currentDate) || isSunday(currentDate)
            if (!isWeekend) {
                
                // busca os ordens para processamento
                const orders = await OrderModel.find({ userAccount: balance.userAccount, createdAt: { "$gte": currentDate, "$lt": addDays(currentDate, 1) }})
                    .populate("stock")
                    .sort({ "createdAt": "asc" })

                if (orders.length === 0) {
                    // atualiza ultimo preco do dia
                    await updateStockPriceFrom([balance], currentDate)
                    let history = await generateBalanceSnapshot(balance, currentDate)
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
                        // Logger.info("=====>", dd)
                        await updateStockPriceFrom([balance], dd)
                        let history = await generateBalanceSnapshot(balance, dd)
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


