import { arrayProp, getModelForClass, prop } from '@typegoose/typegoose'
import { Locales } from 'honeybee-api'
import mongoose from 'mongoose'

export class Device {
    
    @prop({ required: true })
    deviceId: string

    @prop({ required: true })
    token: string

    @prop({ required: true, default: false })
    active: boolean
}

export class Account {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true, default: false })
    active: boolean

    @prop({ required: true, default: false })
    simulation: boolean

    @arrayProp({ _id: false, items: Device })
    devices?: Device[]

    @prop({ _id: false, required: true })
    preference!: Preferences

    public getActiveDevice?(): Device {
        return this.devices.find(device => device.active)
    }
}

export class Preferences {

    @prop({ required: true, enum: Locales })
    language: string
    
    @prop({ required: true })
    receiveTradeNotification: boolean
    
    @prop({ required: true })
    receiveBalanceNotification: boolean
    
    @prop({ required: true })
    addStockTrackerPaused: boolean
}

/**
 *
 *
 * @export
 * @class Account
 * @extends {TimeStamps}
 */
export class Profile {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    name: string
    
    @prop({ required: true })
    nickname: string
    
    @prop({ required: true })
    email: string
    
    @prop({ required: true })
    password: string

    @arrayProp({ items: Account })
    accounts: Account[]

    @prop({ required: true })
    active!: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

    public getSimulation?(): Account {
        return this.accounts.find(account => account.simulation)
    }

}

export const ProfileModel = getModelForClass(Profile, {
    schemaOptions: {
        collection: "profile-test"
    }
})
