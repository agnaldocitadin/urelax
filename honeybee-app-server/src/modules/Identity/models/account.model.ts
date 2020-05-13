import { arrayProp, getModelForClass, mongoose, prop } from "@typegoose/typegoose"
import { Locales } from "honeybee-api"

export class Device {
    
    @prop({ required: true })
    deviceId: string

    @prop({ required: true })
    token: string

    @prop({ required: true, default: false })
    active: boolean
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

export const AccountModel = getModelForClass(Account, {
    schemaOptions: {
        collection: "accounts"
    }
})