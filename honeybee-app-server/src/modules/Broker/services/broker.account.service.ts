import { BrokerAccountInput, Brokers } from "honeybee-api"
import { utils } from "js-commons"
import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"
import { toObjectId } from "../../../core/server-utils"
import { createInvestimentAccount } from "../../Financial/services/investiment.account.service"
import { Profile } from "../../Identity/models"
import { ts } from "../../Translation/i18n"
import { ClearHelper } from "../helpers/clear.helper"
import { BrokerAccount, BrokerAccountModel } from "../models/broker.account.model"

export interface BrokerHelperInterface {
    code: Brokers
    validateExtraData(brokerAccount: BrokerAccountInput): boolean
    loadExtraData(brokerAccount: BrokerAccountInput): Promise<void>
}

/**
 *
 *
 * @param {{ id: string, account: string }} options
 * @returns
 */
export const findBrokerAccounts = (options: { id: string, account: string }) => {
    const { id, account } = options
    return BrokerAccountModel.find({
        ...toObjectId("_id", id),
        ...toObjectId("account", account),
    }).exec()
}

/**
 *
 *
 * @param {BrokerAccountInput} input
 * @returns
 */
export const createBrokerAccount = async (input: BrokerAccountInput) => {
    const helper = BrokerAccountHelper.convert(input.brokerCode)
    validate(input)
    if (helper.validateExtraData(input)) {
        await helper.loadExtraData(input)
        const brokerAccount = await BrokerAccountModel.create(input)
        createInvestimentAccount(brokerAccount._id)
        return brokerAccount
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
    const _input = utils.mergeObjects<BrokerAccountInput>(account.toObject(), input)
    validate(_input)
    
    const helper = BrokerAccountHelper.convert(_input.brokerCode)
    if (helper.validateExtraData(_input)) {
        await helper.loadExtraData(_input)
        await BrokerAccountModel.updateOne({ _id }, _input as any)
        return true
    }
    return false
}

/**
 *
 *
 * @param {Profile} profile
 */
export const createSimulationAccounts = async (profile: Profile) => {
    const simulationId = profile.getSimulation()._id
    await Promise.all(Object.values(Brokers).map(async (code) => {
        const brokerAccount = await BrokerAccountModel.create({
            account: simulationId,
            accountName: "0001-Simulation",
            brokerCode: code,
            simulation: true,
            extraData: {}
        })
        createInvestimentAccount(brokerAccount._id)
    })) 
}


/**
 *
 *
 * @param {BrokerAccount} brokerAccount
 */
const validate = (brokerAccount: BrokerAccountInput) => {
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