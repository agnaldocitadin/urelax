import { BrokerAccountInput, Brokers, TransactionType } from "honeybee-api"
import { utils } from "js-commons"
import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"
import { toObjectId } from "../../../core/server-utils"
import { onDepositForFree } from "../../Activity/services"
import { addTransaction } from "../../Financial/services"
import { Profile } from "../../Identity/models"
import { ts } from "../../Translation/i18n"
import { ClearHelper } from "../helpers/clear.helper"
import { BrokerAccountModel } from "../models/broker.account.model"
import { findCurrencyByBrokerCode } from "./broker.service"

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
 * @param {BrokerAccountInput} brokerAccount
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
        return BrokerAccountModel.create(input)
    }
}

/**
 *
 *
 * @param {string} _id
 * @param {BrokerAccountInput} input
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
    const now = new Date()
    await Promise.all(Object.values(Brokers).map(async code => {
        const brokerAccount = await BrokerAccountModel.create({
            account: simulationId,
            accountName: "0001-Simulation",
            brokerCode: code,
            simulation: true,
            extraData: {}
        })

        const currency = await findCurrencyByBrokerCode(code)
        addTransaction(brokerAccount._id, {
            value: Number(process.env.INITIAL_SIMULATION_AMOUNT),
            type: TransactionType.DESPOSIT,
            investiment: currency._id,
            dateTime: now
        })
        
        onDepositForFree(simulationId)
    })) 
}

/**
 *
 *
 * @class BrokerAccountHelper
 */
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