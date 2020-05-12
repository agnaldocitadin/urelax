import { getModelForClass, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'

/**
 * OK
 *
 * @export
 * @class StockHistory
 * @extends {Typegoose}
 */
export class StockHistory {

    _id?: mongoose.Types.ObjectId

    @prop({ required: false })
    symbol!: string

    @prop({ required: false })
    date!: Date

    @prop()
    openingPrice?: number

    @prop()
    closingPrice?: number

    @prop()
    highestPrice?: number

    @prop()
    lowestPrice?: number

    @prop()
    volume?:number
    
}

export const StockHistoryModel = getModelForClass(StockHistory, {
    schemaOptions: {
        collection: "stock-history"
    }
})