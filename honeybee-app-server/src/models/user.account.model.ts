import { prop, Typegoose } from "@hasezoey/typegoose"
import mongoose from "mongoose"

export type Preferences = {
    receiveTradeNotification: boolean
    receiveBalanceNotification: boolean
    addStockTrackerPaused: boolean
}

export const initialPreferences: Preferences = {
    receiveBalanceNotification: true,
    receiveTradeNotification: true,
    addStockTrackerPaused: false
}

/**
 *
 *
 * @export
 * @class Account
 * @extends {Typegoose}
 */
export class UserAccount extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    name!: string

    @prop({ required: true })
    nickname!: string
    
    @prop({ validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })
    email?: string
    
    @prop()
    passwd?: string

    @prop({ required: true, default: "pt_BR" })
    language: string

    @prop({ required: true })
    active!: boolean

    @prop()
    deviceToken?: string

    @prop({ default: false })
    simulation?: boolean

    @prop()
    simulationAccountId?: mongoose.Types.ObjectId

    @prop({ required: true })
    preferences: Preferences

    @prop({ default: () => new Date() })
    createdAt?: Date

}

export const UserAccountModel = new UserAccount().getModelForClass(UserAccount, {
    schemaOptions: {
        collection: "user-accounts"
    }
})