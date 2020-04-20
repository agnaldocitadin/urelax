import Logger from "../../core/Logger"
import { Utils } from "../../core/Utils"
import { BrokerAccountModel } from "../../models/broker.account.model"
import { registerChange } from "../../services/stock.history.service"
import { ClearConnection } from "../broker/clear/clear.connection"
import { ClearMessages } from "../broker/clear/clear.messages"
import { ClearRequest, PromiseResponse } from "../broker/clear/clear.request"
import { StockUpdaterPlugin } from "./stock.updater.plugin"

const SYMBOL_SIGNATURE_DELAY = 5000

/**
 *
 *
 * @export
 * @class StockUpdater
 */
export class ClearStockUpdater implements StockUpdaterPlugin {

    symbols: string[]
    connection: ClearConnection
    request: ClearRequest

    async start(symbols: string[]): Promise<void> {
        this.symbols = symbols
        const clearAccount = await BrokerAccountModel.findOne({ "extraData.cpf": process.env.STOCKWATCHER_API_ID }).exec()
        this.connection = ClearConnection.build(clearAccount, true)
        this.connection.attachAuthenticationListener(() => this.signSymbols())
        this.request = ClearRequest.build(this.connection, this.stockChanges)
        this.connection.ready()
    }    
    
    async stop(): Promise<void> {
        this.request.shuttdown()
        this.connection.destroy()
        this.symbols = []
    }

    /**
     *
     *
     * @private
     * @param {PromiseResponse} response
     * @memberof StockUpdater
     */
    private stockChanges(response: PromiseResponse): void {
        const { message, identifier } = response
        if (identifier === ClearMessages.QUOTE_INFO) {
            const { Symbol, Price, TradeVolume, TradeDate } = message
            registerChange(Symbol, Price, TradeVolume, TradeDate.toNumber())
        }
    }

    /**
     *
     *
     * @private
     * @memberof ClearStockUpdater
     */
    private async signSymbols() {
        for (let symbol of this.symbols) {
            await Utils.sleep(50)
            this.signMessage(symbol)
        }
    }

    /**
     *
     *
     * @private
     * @param {string} symbol
     * @memberof StockUpdater
     */
    private signMessage(symbol: string): void {
        this.request.send(ClearMessages.SignQuoteRequest, { Symbol: symbol, Sign: true }).then(response => {
            if (response.message.Result === -100) {
                Utils.delayedAction().run(() => this.signMessage(symbol), SYMBOL_SIGNATURE_DELAY)
                Logger.error(`${symbol} Symbol signature error, retrying in ${SYMBOL_SIGNATURE_DELAY} miliseconds`, response.message)
                return
            }
            Logger.info("Symbol %s signed.", symbol)
        })
    }

}