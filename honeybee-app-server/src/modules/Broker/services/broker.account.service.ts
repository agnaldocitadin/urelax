import { BrokerAccountInput, Brokers } from "honeybee-api"
import { utils } from "js-commons"
import { ErrorCodes } from "../../../core/error.codes"
import { ts } from "../../../core/i18n"
import Logger from "../../../core/Logger"
import { ClearHelper } from "../helpers/clear.helper"
import { BrokerAccount, BrokerAccountModel } from "../models/broker.account.model"

export interface BrokerHelperInterface {
    code: Brokers
    validateExtraData(brokerAccount: BrokerAccount): boolean
    loadExtraData(brokerAccount: BrokerAccount): Promise<void>
}

/**
 *
 *
 * @param {{ id: string, account: string }} options
 * @returns
 */
export const findBrokerAccounts = (options: { id: string, account: string }) => {
    const { id, account } = options
    return BrokerAccountModel.find({ account }).exec()
}

/**
 *
 *
 * @param {BrokerAccountInput} input
 * @returns
 */
export const createBrokerAccount = async (input: BrokerAccount) => {
    const helper = BrokerAccountHelper.convert(input.brokerCode)
    validate(input)
    if (helper.validateExtraData(input)) {
        await helper.loadExtraData(input)
        return BrokerAccountModel.create(input)
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
    const account = await BrokerAccountModel.findById(_id)
    const _input = utils.mergeObjects<BrokerAccount>(account.toObject(), input)
    validate(_input)
    
    const helper = BrokerAccountHelper.convert(_input.brokerCode)
    if (helper.validateExtraData(_input)) {
        await helper.loadExtraData(_input)
        await BrokerAccountModel.updateOne({ _id }, _input)
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
        const value = Object.values(BrokerAccountHelper).find(helper => helper.code === code)
        if (value) return value
        Logger.throw(ErrorCodes.BROKERCODE_UNKNOWN, ts("brokercode_invalid"))
    }

}