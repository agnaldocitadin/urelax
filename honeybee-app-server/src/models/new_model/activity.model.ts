import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import mongoose from 'mongoose'
import { Account } from './account.model'

export enum ActivityType {
    STOCK_TRACKER = "STOCK_TRACKER",
    USER_ACCOUNT = "USER_ACCOUNT"
}

/**
 * OK
 * An activity is a screenshot of a specific time. It can't change after to be created.
 *
 * @export
 * @class Activity
 * @extends {Typegoose}
 */
class Activity extends TimeStamps {
    
    _id?: mongoose.Types.ObjectId

    @prop({ ref: "Account", required: true })
    account!: Ref<Account>

    @prop({ required: true, enum: ActivityType })
    activityType!: string

    @prop()
    ref?: string

    @prop({ required: true })
    icon!: string

    @prop({ required: true })
    title!: Translation

    @arrayProp({ items: "ActivityDetail" })
    details?: ActivityDetail[]

}

class ActivityDetail {

    @prop({ required: true })
    title: Translation

    @prop({ required: true })
    description: Translation

    @prop({ default: true })
    hidden?: boolean
}

class Translation {

    @prop({ required: true })
    text!: string
    
    @arrayProp({ default: [] })
    args: any[]
}

export const ActivityModel = getModelForClass(Activity, {
    schemaOptions: {
        collection: "activities-test"
    }
})