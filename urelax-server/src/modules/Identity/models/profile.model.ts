import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Account } from './account.model'

/**
 *
 *
 * @export
 * @class Device
 */
export class Device {
    
    @prop({ required: true })
    deviceId: string

    @prop({ required: true })
    token: string

    @prop({ required: true, default: false })
    active: boolean
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
    name!: string
    
    @prop({ required: true })
    nickname!: string
    
    @prop({ required: true })
    email!: string
    
    @prop({ required: true })
    password!: string

    @arrayProp({ ref: Account })
    accounts: Ref<Account>[]

    @prop({ required: true })
    activeAccount!: mongoose.Types.ObjectId

    @prop({ required: true })
    active!: boolean

    @arrayProp({ _id: false, items: Device })
    devices?: Device[]

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

    public getSimulation?(): Account {
        return <Account>this.accounts.find(account => (<Account>account).simulation)
    }

    public getActiveDevice?(): Device {
        return this.devices.find(device => device.active)
    }

    public getAccount?(id: string): Account {
        return <Account>this.accounts.find(account => (<Account>account)._id.toHexString() === id)
    }
}

export const ProfileModel = getModelForClass(Profile, {
    schemaOptions: {
        collection: "profiles"
    }
})