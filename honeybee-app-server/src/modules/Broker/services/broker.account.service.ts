import { BrokerAccountInput, Brokers } from "honeybee-api"
import { ErrorCodes } from "../../../core/error.codes"
import { ts } from "../../../core/i18n"
import Logger from "../../../core/Logger"
import { flatObject } from "../../../core/Utils"
import { ClearHelper } from "../helpers/clear.helper"
import { BrokerAccount, BrokerAccountModel } from "../models/broker.account.model"

// FIXME O merge do BrokerAccount precisa ser melhorado!

export interface BrokerHelperInterface {
    code: Brokers
    validateExtraData(brokerAccount: BrokerAccount): boolean
    loadExtraData(brokerAccount: BrokerAccount): Promise<void>
}

export const findBrokerAccounts = (options: {
    id: string,
    account: string
}) => {
    const { id, account } = options
    return BrokerAccountModel.find({ account }).exec()
}

export const createBrokerAccount = async (brokerAccount: BrokerAccountInput) => {
    const _brokerAccount = BrokerAccount.from(brokerAccount)
    const helper = BrokerAccountHelper.convert(_brokerAccount.brokerCode)
    validate(_brokerAccount)
    if (helper.validateExtraData(_brokerAccount)) {
        await helper.loadExtraData(_brokerAccount)
        return BrokerAccountModel.create(_brokerAccount)
    }
}

/**
 *
 *
 * @param {string} _id
 * @param {BrokerAccount} input
 * @returns
 */
export const updateBrokerAccountById = async (_id: string, input: BrokerAccountInput) => {
    
    // console.log("---->", input)
    // const _brokerAccount = BrokerAccount.from(input)
    // console.log("000----", _brokerAccount)
    // let accountDB = await BrokerAccountHelper.merge(_id, _brokerAccount)
    // console.log("------------------", accountDB)
    
    const _input = flatObject(input)
    const account = await BrokerAccountModel.findByIdAndUpdate(_id, { "$set": _input })
    let helper = BrokerAccountHelper.convert(account.brokerCode)
    
    validate(account)
    if (helper.validateExtraData(account)) {
        await helper.loadExtraData(account)
        BrokerAccountModel.updateOne({ _id }, { ...account }).exec()
        return true
    }
    return false
}

/**
 *
 *
 * @param {BrokerAccount} brokerAccount
 */
const validate = (brokerAccount: BrokerAccount) => {
    if (!brokerAccount.account) {
        Logger.throw(ErrorCodes.BROKER_ACCOUNT_USERACCOUNT_REQUIRED)
    }
    
    if (!brokerAccount.accountName) {
        Logger.throw(ErrorCodes.BROKER_ACCOUNT_NAME_REQUIRED)
    }
    
    if (!brokerAccount.brokerCode) {
        Logger.throw(ErrorCodes.BROKER_ACCOUNT_BROKERCODE_REQUIRED)
    }
}

class BrokerAccountHelper {

    /**
     *
     *
     * @static
     * @type {BrokerHelperInterface}
     * @memberof BrokerAccountHelper
     */
    static CLEAR: BrokerHelperInterface = ClearHelper
    // ...

    static convert(code: string): BrokerHelperInterface {
        const value = Object.values(BrokerAccountHelper).find(h => h.code === code)
        if (value) return value
        Logger.throw(ErrorCodes.BROKERCODE_UNKNOWN, ts("brokercode_invalid"))
    }

    static async merge(_id: string, { extraData, ...brokerAccount }: BrokerAccount): Promise<BrokerAccount> {
        let accountDB: any = await BrokerAccountModel.findById(_id)
        accountDB._doc = { ...accountDB._doc, ...brokerAccount }
        accountDB._doc.extraData = { ...accountDB._doc.extraData, ...extraData }
        return accountDB._doc
    }

}