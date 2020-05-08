import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'

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

class Account {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Profile, required: true })
    profile!: Ref<Profile>

    @prop({ ref: Profile, required: true })
    preference!: Ref<Preferences>

    @arrayProp({ ref: Device, default: [] })
    devices: Ref<Device>[]

    @prop({ required: true })
    active!: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

}

export const AccountModel = getModelForClass(Account, {
    schemaOptions: {
        collection: "accounts-test"
    }
})