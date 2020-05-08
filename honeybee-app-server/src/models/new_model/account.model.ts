import { arrayProp, getModelForClass, prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import mongoose from 'mongoose'

/**
 *
 *
 * @export
 * @class Account
 * @extends {TimeStamps}
 */
export class Account extends TimeStamps {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    profile!: Profile

    @prop({ required: true })
    preference!: Preferences

    @arrayProp({ items: "Device" })
    devices: Device[]

    @prop({ required: true })
    active!: boolean

}

class Profile {

    @prop({ required: true })
    name: string
    
    @prop({ required: true })
    nickname: string
    
    @prop({ required: true })
    email: string
    
    @prop({ required: true })
    password: string
}

class Preferences {

    @prop({ required: true })
    language: string
    
    @prop({ required: true, default: true })
    receiveTradeNotification: boolean
    
    @prop({ required: true, default: true })
    receiveBalanceNotification: boolean
    
    @prop({ required: true, default: true })
    addStockTrackerPaused: boolean
}

class Device {
    
    @prop({ required: true })
    deviceId: string

    @prop({ required: true })
    token: string

    @prop({ required: true, default: false })
    active: boolean
}

export const AccountModel = getModelForClass(Account, {
    schemaOptions: {
        collection: "accounts-test"
    }
})
