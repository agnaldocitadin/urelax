import { Utils } from "../../../core/Utils"
import { Order, OrderPlatforms, OrderSides, OrderStatus } from "../../Order/models/order.model"
import { StockTracker } from "../../Stock/models/stock.tracker.model"
import { AdapterCallbacks, BaseBrokerPlugin } from "./base.broker.plugin"
import { OrderExecution } from "./broker.plugin"

const EXECUTION_DELAY = 1000

export class MockBrokerPlugin extends BaseBrokerPlugin {
    
    init(): void {}    
    
    async buy(order: Order): Promise<string> {
        const code = generateCode(order)
        
        let orderExecution: OrderExecution = {
            orderCode: code,
            price: order.price,
            progress: 100,
            quantity: order.quantity,
            message: "Buy simulation",
            status: OrderStatus.FILLED,
        }

        Utils.delayedAction().run(() => this.callbacks.get(AdapterCallbacks.ORDER_EXECUTION)(orderExecution), EXECUTION_DELAY)
        return code
    }
    
    async sell(order: Order): Promise<string> {
        const code = generateCode(order)
        
        let orderExecution: OrderExecution = {
            orderCode: code,
            price: order.price,
            progress: 100,
            quantity: order.quantity,
            message: "Sell simulation",
            status: OrderStatus.FILLED
        }

        Utils.delayedAction().run(() => this.callbacks.get(AdapterCallbacks.ORDER_EXECUTION)(orderExecution), EXECUTION_DELAY)
        return code
    }
    
    async totalAvailableAmount(stockTracker: StockTracker, plaftorm: OrderPlatforms, orderSide: OrderSides, symbol: string): Promise<number> {
        // const balance = (await findBalanceSheetOnCache((<UserAccount>stockTracker.userAccount)._id))[0]
        // FIXME
        const balance = {}
        return balance.currentAmount || 0
    }

}

const generateCode = (order: Order) => {
    return `BROKER_${order._id}_${process.hrtime()[1]}`
}