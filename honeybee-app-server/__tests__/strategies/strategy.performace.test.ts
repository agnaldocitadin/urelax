import dotenv from 'dotenv-flow'
import fs from "fs"
import { connectDB } from "../../src/db/mongo"
import Logger from "../../src/logger"
import { OrderModel, OrderSides, OrderStatus } from "../../src/modules/Order/models/order.model"
import { StockHistory, StockHistoryModel } from "../../src/modules/Stock/models/stock.history.model"
import { Stock, StockModel } from "../../src/models/stock.model"
import { StockTracker, StockTrackerModel } from "../../src/modules/Stock/models/stock.tracker.model"
import { BrokerPlugin, OrderExecution } from "../../src/modules/Broker/plugins/broker.plugin"
import { MockBrokerPlugin } from "../../src/modules/Broker/plugins/mock.broker.plugin"
import { StockService } from "../../src/modules/Stock/services/stock.service"
import { BeeService } from '../../src/modules/Stock/services/stock.tracker.service'
import { BBStochasticRSIStrategy } from "../../src/modules/Stock/strategies/bb.stochastic.rsi.strategy"
import { Utils } from "../../src/Utils"

//  Test performance on AZUL4 (2019-12-27 to 2019-12-27)
//  Test performance on AZUL4 (2020-01-28 to 2020-01-29)
//  Test performance on AZUL4 (2020-02-12 to 2020-02-13)
const ROBOT_ID = "5e27195eec4b394420df714a"
const STRATEGY_TYPE = BBStochasticRSIStrategy
const PROGRESS = 100
const TEST_PRESETS = [
    // { 
    //     symbol: "MGLU3",
    //     ranges: [
    //         { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" }, // <--
    //         { start: "2019-09-16T00:00:00.000Z", end: "2019-09-17T00:00:00.000Z" },
    //         { start: "2019-09-17T00:00:00.000Z", end: "2019-09-18T00:00:00.000Z" }
    //         // { start: "2019-09-18T00:00:00.000Z", end: "2019-09-19T00:00:00.000Z" }
    //     ]
    // },
    // { 
    //     symbol: "GOLL4",
    //     ranges: [
    //         { start: "2019-09-10T00:00:00.000Z", end: "2019-09-11T00:00:00.000Z" },
    //         { start: "2019-09-11T00:00:00.000Z", end: "2019-09-12T00:00:00.000Z" }, // <----
    //         { start: "2019-09-12T00:00:00.000Z", end: "2019-09-13T00:00:00.000Z" },
    //         // { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" }
    //     ]
    // },
    // { 
    //     symbol: "CMIG4",
    //     ranges: [
    //         { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" },
    //         { start: "2019-09-16T00:00:00.000Z", end: "2019-09-17T00:00:00.000Z" },
    //         { start: "2019-09-17T00:00:00.000Z", end: "2019-09-18T00:00:00.000Z" },
    //         // { start: "2019-09-18T00:00:00.000Z", end: "2019-09-19T00:00:00.000Z" },
    //     ]
    // },
    // { 
    //     symbol: "ITSA4",
    //     ranges: [
    //         { start: "2019-09-10T00:00:00.000Z", end: "2019-09-11T00:00:00.000Z" },
    //         { start: "2019-09-11T00:00:00.000Z", end: "2019-09-12T00:00:00.000Z" },
    //         { start: "2019-09-12T00:00:00.000Z", end: "2019-09-13T00:00:00.000Z" },
    //         // { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" },
    //     ]
    // },
    // { 
    //     symbol: "ITUB4",
    //     ranges: [
    //         { start: "2019-09-12T00:00:00.000Z", end: "2019-09-13T00:00:00.000Z" },
    //         { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" },
    //         { start: "2019-09-16T00:00:00.000Z", end: "2019-09-17T00:00:00.000Z" },
    //         // { start: "2019-09-17T00:00:00.000Z", end: "2019-09-18T00:00:00.000Z" },
    //     ]
    // },
    // { 
    //     symbol: "PETR3",
    //     ranges: [
    //         { start: "2019-09-10T00:00:00.000Z", end: "2019-09-11T00:00:00.000Z" },
    //         { start: "2019-09-11T00:00:00.000Z", end: "2019-09-12T00:00:00.000Z" },
    //         { start: "2019-09-12T00:00:00.000Z", end: "2019-09-13T00:00:00.000Z" },
    //         // { start: "2019-09-13T00:00:00.000Z", end: "2019-09-14T00:00:00.000Z" }
    //     ]
    // },
    { 
        symbol: "AZUL4",
        ranges: [
            // { start: "2019-10-01T00:00:00.000Z", end: "2019-10-02T00:00:00.000Z" },
            // { start: "2019-10-02T00:00:00.000Z", end: "2019-10-03T00:00:00.000Z" },
            // { start: "2019-10-03T00:00:00.000Z", end: "2019-10-04T00:00:00.000Z" },
            // { start: "2019-10-04T00:00:00.000Z", end: "2019-10-05T00:00:00.000Z" },
            { start: "2019-12-27T00:00:00.000Z", end: "2019-12-28T00:00:00.000Z" },
        ]
    }
]

beforeAll(async () => {
    dotenv.config()
    await connectDB()
})
  
it("opa", async () => {
    jest.setTimeout(50000)

    const adapter: BrokerPlugin = new MockBrokerPlugin(null)
    const impl: any = new STRATEGY_TYPE()
    Logger.debug("Loaded strategy: %s", STRATEGY_TYPE.name)

    let robot: StockTracker = await loadRobot()
    
    // Sumary
    let totalBuyOrder = 0
    let totalSellOrder = 0
    let totalGain = 0
    let totalLoss = 0

    for (let preset of TEST_PRESETS) {
        let stock = await loadStock(preset)

        for (let range of preset.ranges) {
            Logger.debug("========== Starting test ==========>")
            await resetRobot(robot, stock)
            await removeAllOrders()
            const history = await prepareStrategy(robot, range, adapter, impl)

            let idx = 0
            let idxBuySell = 0
            let buys = []
            let sells = []
            for (let event of history) {
                const prediction = await impl.predict(event.date, robot, adapter)
    
                if (prediction.price && prediction.price !== 0) {
                    let code = "orderCode" + idx++
                    const buyOrderModel = await StockService.makeAOrder(robot, prediction)
                    await StockService.updateOrderCode(buyOrderModel, code)
                    
                    const execution: OrderExecution = { 
                        orderCode: code, 
                        status: OrderStatus.FILLED,
                        price: prediction.price,
                        quantity: prediction.quantity,
                        progress: PROGRESS
                    }
                    await StockService.addOrderExecution(execution)
    
                    if (prediction.orderSide === OrderSides.BUY) {
                        buys.push(idxBuySell)
                    }
                    if (prediction.orderSide === OrderSides.SELL) { 
                        sells.push(idxBuySell)
                    }
                }
    
                idxBuySell++
            }

            totalBuyOrder += buys.length
            totalSellOrder += sells.length
            totalGain += robot.gain
            totalLoss += robot.loss

            printTestResult(range, robot, buys, sells)
            writeFileGraph(history, impl, buys, sells)
        }
    }
    printProcessSummary(totalBuyOrder, totalSellOrder, totalGain, totalLoss)
})

const writeFileGraph = (history: StockHistory[], impl: any, buys: number[], sells: number[]) => {
    fs.writeFileSync("./src/sandbox/closes.js", `const closes = [${history.map(value => value.closingPrice)}]`)
    fs.writeFileSync("./src/sandbox/labels.js", `const label = [${history.map(h => `"${moment(h.date).format("MM-DD HH:mm")}"`)}]`)
    fs.writeFileSync("./src/sandbox/rsi.js", `const fundosTopos = [${impl.fundosTopos}]`)
    fs.writeFileSync("./src/sandbox/altaBaixa.js", `const altaBaixa = [${impl.altaBaixa}]`)
    fs.writeFileSync("./src/sandbox/buys.js", `const buys = [${buys}]`)
    fs.writeFileSync("./src/sandbox/sells.js", `const sells = [${sells}]`)
}

const loadRobot = async () => {
    let robot: any = await StockTrackerModel.findById(ROBOT_ID)
        .populate("userAccount")
        .populate("broker")
        .populate("stock")
        .exec()
    Logger.debug("Robot loaded. ID: %s", robot._id)
    return robot
}

const resetRobot = async (robot: any, stock: Stock) => {
    // Reset robot
    robot.gain = 0
    robot.loss = 0
    robot.stockTotalAmount = 0
    robot.stockQuantity = 0
    robot.lastOrder = null
    robot.stock = stock
    Logger.debug("Robot reseted.")
    return robot.save()
}

const removeAllOrders = async () => {
    // Remove all robot's orders
    await OrderModel.deleteMany({ robot: ROBOT_ID }).exec()
    Logger.debug("Removed all pending orders.")
}

const loadStock = async (preset: any) => {
    let stock: Stock = await StockModel.findOne({ symbol: preset.symbol }).exec()
    Logger.debug("Stock %s loaded.", stock.symbol)
    return stock
}

const prepareStrategy = async (robot: any, range: any, adapter: BrokerPlugin, strategyImpl: any): Promise<StockHistory[]> => {
    const history = await StockHistoryModel.find({ symbol: robot.stock.symbol, date: { "$gt": range.start, "$lt": range.end }}).sort({ "date": "asc" }).exec()
    await strategyImpl.prepare(range.start, robot, adapter)
    Logger.debug("Running strategy... %s", robot.stock.symbol)
    return history
}

const printTestResult = async (range: any, robot: any, buys: number[], sells: number[]) => {
    Logger.debug("------ Robot Summary ------")
    Logger.debug("From %s to %s", range.start, range.end)
    Logger.debug("Symbol: %s", robot.stock.symbol)
    Logger.debug("Buy orders: %s", buys.length)
    Logger.debug("Sell orders: %s", sells.length)
    Logger.debug(`Gain: $${Utils.Number.toFixed(robot.gain, 2)}`)
    Logger.debug(`Loss: $${Utils.Number.toFixed(robot.loss, 2)}`)
    Logger.debug(`Result: $${Utils.Number.toFixed(robot.gain - robot.loss, 2)}`)
    Logger.debug("Performance +: %s%", (robot.gain === 0 && robot.loss === 0) ? 0 : Utils.Number.toFixed(100 - (100 / robot.gain * robot.loss), 2))
    if (await BeeService.isBought(robot)) {
        Logger.warn("WARNNING: Robot stopped bought!")
    }
    Logger.debug("========== Finishing test <==========\n")
}

const printProcessSummary = (totalBuyOrder: number, totalSellOrder: number, totalGain: number, totalLoss: number) => {
    Logger.debug("------ Process Summary ------")
    Logger.debug("Buy orders: %s", totalBuyOrder)
    Logger.debug("Sell orders: %s", totalSellOrder)
    Logger.debug(`Gain: $${Utils.Number.toFixed(totalGain, 2)}`)
    Logger.debug(`Loss: $${Utils.Number.toFixed(totalLoss, 2)}`)
    Logger.debug(`Result: $${Utils.Number.toFixed(totalGain - totalLoss, 2)}`)
    Logger.debug("Performance +: %s%", (totalGain === 0 && totalLoss === 0) ? 0 : Utils.Number.toFixed(100 - (100 / totalGain * totalLoss), 2))
}
