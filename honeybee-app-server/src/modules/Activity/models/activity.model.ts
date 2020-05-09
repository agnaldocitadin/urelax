import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Account } from '../../Identity/models/profile.model'

export enum ActivityType {
    STOCK_TRACKER = "STOCK_TRACKER",
    USER_ACCOUNT = "USER_ACCOUNT"
}

class Translation {

    @prop({ required: true })
    text!: string
    
    @arrayProp({ _id: false, items: String })
    args?: string[]
}

class ActivityDetail {

    @prop({ _id: false })
    title?: Translation | string

    @prop({ _id: false, required: true })
    description: Translation | string

    @prop({ default: true })
    hidden?: boolean
}

/**
 * OK
 * An activity is a screenshot of a specific time. It can't change after to be created.
 *
 * @export
 * @class Activity
 */
export class Activity {
    
    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ required: true, enum: ActivityType })
    activityType!: string

    @prop()
    ref?: string

    @prop({ required: true })
    icon!: string

    @prop({ _id: false, required: true })
    title!: Translation

    @arrayProp({ _id: false, items: ActivityDetail })
    details?: ActivityDetail[]

    @prop({ default: () => new Date() })
    createdAt?: Date

}

export const ActivityModel = getModelForClass(Activity, {
    schemaOptions: {
        collection: "activities-test"
    }
})