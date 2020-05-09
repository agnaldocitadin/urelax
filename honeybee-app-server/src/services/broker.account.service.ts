import { Brokers } from "honeybee-api"
import { ErrorCodes } from "../core/error.codes.d"
import { ts } from "../core/i18n"
import Logger from "../core/Logger"
import { BrokerAccount, BrokerAccountModel } from "../models/broker.account.model"
import { ClearHelper } from "./helpers/clear.helper"

export interface BrokerHelperInterface {
    code: Brokers
    validateExtraData(brokerAccount: BrokerAccount): boolean
    loadExtraData(brokerAccount: BrokerAccount): Promise<void>
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const findBrokerAccount = (id: string) => {
    return BrokerAccountModel.findById(id).exec()
}

/**
 *
 *
 * @param {string} accountId
 * @returns
 */
export const findBrokerAccountByUser = (accountId: string) => {
    return BrokerAccountModel.find({ account: accountId }).exec()
}

/**
 * FIXME
 *
 * @param {BrokerAccount} brokerAccount
 * @returns
 */
export const createBrokerAccount = async (brokerAccount: BrokerAccount) => {
    let helper = BrokerAccountHelper.convert(brokerAccount.brokerCode)
    validate(brokerAccount)
    if (helper.validateExtraData(brokerAccount)) {
        await helper.loadExtraData(brokerAccount)
        const savedAccount = await BrokerAccountModel.create(brokerAccount)
        // createNewBalanceSheet((<UserAccount>savedAccount.userAccount)._id, savedAccount._id)
        return savedAccount
    }
}

/**
 *
 *
 * @param {string} _id
 * @param {BrokerAccount} brokerAccount
 * @returns
 */
export const updateBrokerAccountById = async (_id: string, brokerAccount: BrokerAccount) => {
    let accountDB = await BrokerAccountHelper.merge(_id, brokerAccount)
    let helper = BrokerAccountHelper.convert(accountDB.brokerCode)
    
    validate(accountDB)
    if (helper.validateExtraData(accountDB)) {
        await helper.loadExtraData(accountDB)
        BrokerAccountModel.updateOne({ _id }, { ...accountDB }).exec()
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