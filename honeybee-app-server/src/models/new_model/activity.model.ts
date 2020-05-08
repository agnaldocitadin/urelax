import { arrayProp, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import mongoose from 'mongoose'
import { Account } from './account.model'

export enum ActivityType {
    STOCK_TRACKER = "STOCK_TRACKER",
    USER_ACCOUNT = "USER_ACCOUNT"
}

export type ActivityDetail = {
    title: Translation
    description: Translation
    hidden?: boolean
}

type Translation = {
    text: string
    args: any[]
}

/**
 * OK
 * An activity is a screenshot of a specific time. It can't change after to be created.
 *
 * @export
 * @class Activity
 * @extends {Typegoose}
 */
export class Activity extends Typegoose {
    
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

    @arrayProp({ items: Object, default: [] })
    details?: ActivityDetail[]

    @prop({ default: () => new Date() })
    createdAt?: Date
    
}

export const ActivityModel = new Activity().getModelForClass(Activity, {
    schemaOptions: {
        collection: "activities"
    }
})