import { instanceMethod, prop, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"

/**
 * OK
 *
 * @export
 * @class Stock
 * @extends {Typegoose}
 */
export class Stock extends Typegoose {

    _id?: mongoose.Types.ObjectId
    
    @prop({ required: true })
    symbol!: string

    @prop({ required: true })
    description!: string

    @prop({ required: true })
    active!: Boolean

    @prop({ required: true })
    stockLot!: number

    @instanceMethod
    public toPresentation(): string {
        return `${this.description} (${this.symbol})`
    }
}

export const StockModel = new Stock().getModelForClass(Stock, {
    schemaOptions: {
        collection: "stocks"
    }
})