import { instanceMethod, prop, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"

enum InvestimentType {

}

type StockInfo = {
    symbol: string
    stockLot: number
}

/**
 * OK
 * - Aqui terá todos os investimentos disponíveis para aplicação (Ação, LCI, LCA, Tesouro, etc)
 * - Separa por tipo
 *
 * @export
 * @class Stock
 * @extends {Typegoose}
 */
export class Investiments extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    type!: InvestimentType
    
    @prop({ required: true })
    description!: string

    @prop({ required: true })
    active!: Boolean

    @prop({ required: true })
    logo!: string

    // ---- Stock -----
    @prop()
    stock?: StockInfo


    @instanceMethod
    public toStockPresentation(): string {
        return `${this.description} (${this.stock.symbol})`
    }
}

export const InvestimentsModel = new Investiments().getModelForClass(Investiments, {
    schemaOptions: {
        collection: "investiments"
    }
})