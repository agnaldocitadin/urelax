import mongoose from 'mongoose'
import { ErrorCodes } from '../core/error.codes.d'
import { ts } from '../core/i18n'
import Logger from '../core/Logger'
import { initialPreferences, Preferences, UserAccount, UserAccountModel } from '../models/user.account.model'
import { onActivateSimulationAccount, onCreateAccount } from './activity.service'
import { createNewBalanceSheet } from './balance.sheet.service'

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const findById = (id: string) => {
    return UserAccountModel.findById(id).exec()
}

/**
 *
 *
 * @returns {Promise<UserAccount[]>}
 */
export const findAllowedAccounts = (): Promise<UserAccount[]> => {
    return UserAccountModel.find({ active: true }).exec()
}

/**
 *
 *
 * @param {*} { name, email, passwd }
 * @returns {Promise<UserAccount>}
 */
export const createAccount = async ({ name, nickname, email, passwd }: any): Promise<UserAccount> => {
    const account = {
        name,
        nickname,
        email,
        passwd,
        active: true,
        preferences: initialPreferences
    } as UserAccount
    validateAccount(account)
    let savedAccount = await UserAccountModel.create(account)
    onCreateAccount(savedAccount)
    return savedAccount
}

/**
 *
 *
 * @param {UserAccount} userAccount
 */
const validateAccount = (userAccount: UserAccount) => {
    // TODO Validate diplicated e-mail.
}

/**
 *
 *
 * @param {string} userAccountId
 * @returns {Promise<mongoose.Types.ObjectId>}
 */
export const activateSimulationAccount = async (userAccountId: string): Promise<mongoose.Types.ObjectId> => {
    let userAccountDB = await findById(userAccountId)

    if (userAccountDB.simulation) {
        Logger.throw(ErrorCodes.ACCOUNT_IS_SIMULATION, ts("account_is_simulation"))
    }
    
    if (userAccountDB.simulationAccountId) {
        Logger.throw(ErrorCodes.ACCOUNT_HAS_SIMULATION, ts("account_has_already_simulation", { id: userAccountDB._id }))
    }

    let simulationAccountDB = await UserAccountModel.create({
        ...(<any>userAccountDB)._doc,
        _id: undefined,
        simulationAccountId: undefined,
        simulation: true,
        active: true
    })

    userAccountDB.simulationAccountId = simulationAccountDB._id
    await userAccountDB.save()
    createNewBalanceSheet(simulationAccountDB._id)
    onActivateSimulationAccount(simulationAccountDB._id)
    return simulationAccountDB._id
}

/**
 *
 *
 * @param {string} email
 * @param {string} passwd
 * @param {boolean} simulation
 * @returns {Promise<UserAccount>}
 */
export const findByEmailPasswd = async (email: string, passwd: string, simulation: boolean): Promise<UserAccount> => {
    const userAccount = await UserAccountModel.findOne({ email, passwd }).exec()
    if (userAccount && simulation) {
        return UserAccountModel.findById(userAccount.simulationAccountId).exec()
    }
    return userAccount
}

/**
 *
 *
 * @param {string} _id
 * @param {UserAccount} changes
 * @returns {Promise<boolean>}
 */
export const updateAccount = async (_id: string, changes: UserAccount): Promise<boolean> => {
    await UserAccountModel.updateOne({ _id }, { ...changes })
    updateSimulationAccount(_id, changes)
    return true
}

/**
 *
 *
 * @param {string} _id
 * @param {Preferences} preferences
 * @returns {Promise<boolean>}
 */
export const updateUserPreferences = async (_id: string, preferences: Preferences): Promise<boolean> => {
    let userAccountDB = await UserAccountModel.findById(_id)
    userAccountDB.preferences = { ...userAccountDB.preferences, ...preferences }
    await userAccountDB.save()
    return true
}

/**
 * FIXME There's a bug when it's updated the simulation account.
 *
 * @param {string} realAccountId
 * @param {UserAccount} changes
 */
const updateSimulationAccount = async (realAccountId: string, changes: UserAccount) => {
    const realAccount = await UserAccountModel.findById(realAccountId)
    const canChange = !realAccount.simulation && realAccount.simulationAccountId !== undefined
    if (canChange) {
        UserAccountModel.updateOne({ _id: realAccount.simulationAccountId }, {
            ...changes,
            simulation: true,
            "$unset": { simulationAccountId: null }
        }).exec()
    }
}