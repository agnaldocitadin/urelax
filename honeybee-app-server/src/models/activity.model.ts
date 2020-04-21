import { arrayProp, prop, Ref, Typegoose } from "@hasezoey/typegoose"
import mongoose from "mongoose"
import { UserAccount } from "./user.account.model"

export enum ActivityType {
    STOCK_TRACKER = "STOCK_TRACKER",
    USER_ACCOUNT = "USER_ACCOUNT"
}

export type ActivityDetail = {
    title: string
    description: string
    hidden?: boolean
}

/**
 * An activity is a screenshot of a specific time. It can't change after to be created.
 *
 * @export
 * @class Activity
 * @extends {Typegoose}
 */
export class Activity extends Typegoose {
    
    _id?: mongoose.Types.ObjectId

    @prop({ ref: UserAccount, required: true })
    userAccount!: Ref<UserAccount>

    @prop({ required: true, enum: ActivityType })
    activityType: string

    @prop()
    ref?: string

    @prop({ required: true })
    icon!: string

    @prop({ required: true })
    dateTime!: Date

    @prop({ required: true })
    title!: string

    @arrayProp({ items: Object, default: [] })
    details?: ActivityDetail[]
    
}

export const ActivityModel = new Activity().getModelForClass(Activity, {
    schemaOptions: {
        collection: "activities"
    }
})