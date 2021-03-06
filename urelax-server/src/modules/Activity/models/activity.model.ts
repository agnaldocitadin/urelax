import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { ActivityType } from 'urelax-api'
import mongoose from 'mongoose'
import { Account } from '../../Identity/models'
import { ts } from '../../Translation/i18n'

export class Translation {

    @prop({ required: true })
    text!: string
    
    @arrayProp({ _id: false, items: Object })
    args?: Object

    public static translate(input: Translation): string {
        if (!input) return null
        return input.text ? ts(input.text, input.args) : String(input)
    }
}

export class ActivityDetail {

    @prop({ _id: false })
    title?: Translation | string

    @prop({ _id: false, required: true })
    description: Translation | string

    @prop({ default: true })
    hidden?: boolean
}

/**
 * OK
 * An activity is a screenshot of a specific time. It can't be changed after being created.
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
    title!: Translation | string

    @arrayProp({ _id: false, items: ActivityDetail })
    details?: ActivityDetail[]

    @prop({ default: () => new Date() })
    createdAt?: Date

    public static translate(activity: Activity) {
        activity.title = Translation.translate(<Translation>activity.title)
        activity.details.forEach(detail => {
            detail.title = Translation.translate(<Translation>detail.title)
            detail.description = Translation.translate(<Translation>detail.description)
        })
        return activity
    }
}

export const ActivityModel = getModelForClass(Activity, {
    schemaOptions: {
        collection: "activities"
    }
})