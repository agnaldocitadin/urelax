import { Types } from "mongoose"
import { ErrorCodes } from "../../../core/error.codes.d"
import Logger from "../../../core/Logger"
import { Utils } from "../../../core/Utils"
import { BrokerAccount, BrokerAccountModel } from "../../../models/broker.account.model"
import { Order, OrderPlatforms, OrderSides, OrderTypes } from "../../../models/order.model"
import { Stock } from "../../../models/stock.model"
import { StockTracker } from "../../../models/stock.tracker.model"
import { Clear } from "../../../models/types"
import { AdapterCallbacks, BaseBrokerPlugin } from '../base.broker.plugin'
import { OrderExecution } from "../broker.plugin"
import { ClearConnection } from "./clear.connection"
import { ClearConnectionPool } from "./clear.connection.pool"
import { ClearEnums, ClearMessages } from "./clear.messages"
import { ClearRequest, PromiseResponse } from "./clear.request"

const PIT_NOVO_SWINGTRADE = "pit-novo-swingtrade"

/**
 * Real order id: 349f2c50-e407-4868-b6ce-81e5cb22374d (This order exists at Clear)
 * TODO Maybe it's a good idea to load all unfinished orders of every robot
 * 
 *
 * @export
 * @class ClearAdapter
 * @extends {BaseBrokerPlugin}
 */
export class ClearPlugin extends BaseBrokerPlugin {

    clearAccount: BrokerAccount
    request: ClearRequest
    ordersMadeBy: Array<string>
    connection: ClearConnection
    
    constructor(brokerAccountId: Types.ObjectId) {
        super(brokerAccountId)
        this.ordersMadeBy = []
    }
    
    async init(): Promise<void> {
        this.clearAccount = await BrokerAccountModel.findOne({ _id: this.brokerAccountId }).exec()
        this.connection = ClearConnectionPool.getConnection(this.clearAccount)
        this.request = ClearRequest.build(this.connection, (response: PromiseResponse) => this.orderCallback(response))
        Logger.debug("New ClearAdapter created. Account ID: { _id: %s }", this.clearAccount._id)
    }

    destroy() {
        super.destroy()
        this.request.shuttdown()
    }

    buy(order: Order): Promise<string> {
        if (order.platform === OrderPlatforms.DAYTRADE) {
            return this.buyDayTrade(order)
        }
            
        if (order.platform === OrderPlatforms.SWINGTRADE) {
            return this.buySwingTrade(order)
        }
    }

    sell(order: Order): Promise<string> {
        if (order.platform === OrderPlatforms.DAYTRADE) {
            return this.sellDayTrade(order)
        }
            
        if (order.platform === OrderPlatforms.SWINGTRADE) {
            return this.sellSwingTrade(order)
        }
    }

    async totalAvailableAmount(stockTracker: StockTracker, plaftorm: OrderPlatforms, orderSide: OrderSides, symbol: string): Promise<number> {
        const payload =  {
            Module: ClearEnums.Module.convert(plaftorm),
            Side: ClearEnums.ExchangeOrderSide.convert(orderSide),
            Symbol: symbol
        }

        const response = await this.request.send(ClearMessages.WarrantiesReportRequest, payload)
        try {
            if (plaftorm === OrderPlatforms.SWINGTRADE) return Utils.Number.toFixed(response.message.Report.SwingTradeWarrantiesReportInfo.TotalAmount, 2)
            if (plaftorm === OrderPlatforms.DAYTRADE) return Utils.Number.toFixed(response.message.Report.DayTradeWarrantiesReportInfo.Available, 2)
            return 0
        }
        catch(e) {
            Logger.error(e)
            return 0
        }
    }

    /**
     * TODO
     *
     * @private
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof ClearAdapter
     */
    private buyDayTrade(order: Order): Promise<string> {
        return Logger.throw(ErrorCodes.NOT_IMPLEMENTED)
    }

    /**
     * TODO
     *
     * @private
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof ClearAdapter
     */
    private sellDayTrade(order: Order): Promise<string> {
        return Logger.throw(ErrorCodes.NOT_IMPLEMENTED)
    }

    /**
     *
     *
     * @private
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof ClearAdapter
     */
    private async buySwingTrade(order: Order): Promise<string> {
        const clear = <Clear>this.clearAccount.extraData
        return this.sendOrder({
            ESignature: clear.signature,
            Info: {
                ClientIpAddress: await this.connection.getIPAddress(),
                ExchangeOrderType: ClearEnums.ExchangeOrderType.convert(order.type),
                Module: ClearEnums.Module.SWINGTRADE,
                OrderSource: PIT_NOVO_SWINGTRADE,
                Price: order.type === OrderTypes.STOP ? 0 : order.price,
                Quantity: order.quantity,
                Side: ClearEnums.ExchangeOrderSide.BUY,
                Symbol: (<Stock>order.stock).symbol,
                SwingTradeOrderInfo: this.buildSwingTradeOrderInfo(order)
            }
        })
    }

    /**
     *
     *
     * @private
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof ClearAdapter
     */
    private async sellSwingTrade(order: Order): Promise<string> {
        const clear = <Clear>this.clearAccount.extraData
        return this.sendOrder({
            ESignature: clear.signature,
            Info: {
                ClientIpAddress: await this.connection.getIPAddress(),
                ExchangeOrderType: ClearEnums.ExchangeOrderType.convert(order.type),
                Module: ClearEnums.Module.SWINGTRADE,
                OrderSource: PIT_NOVO_SWINGTRADE,
                Price: order.type === OrderTypes.STOP ? 0 : order.price,
                Quantity: order.quantity,
                Side: ClearEnums.ExchangeOrderSide.SELL,
                Symbol: (<Stock>order.stock).symbol,
                SwingTradeOrderInfo: this.buildSwingTradeOrderInfo(order)
            }
        })
    }

    /**
     *
     *
     * @private
     * @param {Order} order
     * @returns
     * @memberof ClearAdapter
     */
    private buildSwingTradeOrderInfo(order: Order) {
        return { 
            ExpiresAt: order.expiresAt.getTime(), 
            ... order.type === OrderTypes.STOP ? { StopPx: Utils.Number.toFixed(order.price, 2) } : {}
        }
    }

    /**
     *
     *
     * @private
     * @param {*} payload
     * @returns {Promise<string>}
     * @memberof ClearAdapter
     */
    private async sendOrder(payload: any): Promise<string> {
        Logger.debug(payload, "-> Payload")
        const response = await this.request.send(ClearMessages.NewOrderRequest, payload)
        const { OrderID } = response.message
        this.ordersMadeBy.push(OrderID)
        return OrderID
    }

    /**
     * 
     *
     * @private
     * @param {PromiseResponse} response
     * @memberof ClearAdapter
     */
    private orderCallback(response: PromiseResponse) {
        if (response.identifier === ClearMessages.ORDER_BASE && this.ordersMadeBy.includes(response.message.Id)) {
            const { Id, Quantity, Price, Progress, Status, Message } = response.message
            this.callbacks.get(AdapterCallbacks.ORDER_EXECUTION)({
                orderCode: Id,
                status: ClearEnums.ClearOrderStatus.convert(Status),
                price: Price,
                quantity: Quantity,
                progress: Progress,
                message: Message
            } as OrderExecution)
        }
    }
}