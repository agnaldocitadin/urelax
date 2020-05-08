import { prop, Typegoose } from '@hasezoey/typegoose'
import mongoose from 'mongoose'

/**
 * OK
 *
 * @export
 * @class StockHistory
 * @extends {Typegoose}
 */
export class StockHistory extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ required: false })
    symbol!: string

    @prop()
    date: Date

    @prop()
    openingPrice: number

    @prop()
    closingPrice: number

    @prop()
    highestPrice: number

    @prop()
    lowestPrice: number

    @prop()
    volume:number
    
}

export const StockHistoryModel = new StockHistory().getModelForClass(StockHistory, {
    schemaOptions: {
        collection: "stock-history"
    }
})