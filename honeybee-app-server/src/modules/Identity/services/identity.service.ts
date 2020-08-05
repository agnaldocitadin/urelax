import { Locales, ProfileInput } from "honeybee-api"
import { utils } from "js-commons"
import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"
import { onCreateAccount } from "../../Activity/services"
import { Account, AccountModel, Preferences, Profile, ProfileModel } from "../models"

const defaultPreferences: Preferences = {
    language: Locales.PT_BR,
    addStockTrackerPaused: true,
    receiveBalanceNotification: true,
    receiveTradeNotification: true
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const findProfileById = (id: string) => {
    return ProfileModel.findById(id).exec()
}

/**
 *
 *
 * @returns {Promise<Profile[]>}
 */
export const findAllowedAccounts = async (): Promise<Account[]> => {
    return AccountModel.find({ active: true }).exec()
}

/**
 *
 *
 * @param {*} { name, nickname, email, password }
 * @returns {Promise<Profile>}
 */
export const createProfile = async ({ name, nickname, email, password }: ProfileInput): Promise<Profile> => {
    // Real account
    const account = await AccountModel.create({
        preference: defaultPreferences,
        simulation: false,
        active: true
    })

    // Simulation account
    const simulation = await AccountModel.create({
        preference: defaultPreferences,
        simulation: true,
        active: true
    })

    const profile: Profile = {
        name,
        nickname,
        email,
        password,
        accounts: [ account, simulation ],
        activeAccount: account.id,
        active: true
    }
    
    await validateProfile(profile)
    let _profile = await ProfileModel.create(profile)
    onCreateAccount(_profile)
    return _profile
}

/**
 *
 *
 * @param {Profile} profile
 */
const validateProfile = async (profile: Profile) => {
    if (await ProfileModel.exists({ email: profile.email })) {
        Logger.throw(ErrorCodes.PROFILE_EMAIL_DUPLICATED)
    }
}

/**
 *
 *
 * @param {string} _id
 * @param {ProfileInput} changes
 * @returns
 */
export const updateProfile = (_id: string, changes: ProfileInput) => {
    const _changes = utils.flatObject(changes)
    return ProfileModel.updateOne({ _id }, { "$set": _changes }).exec()
}

/**
 *
 *
 * @param {string} _id
 * @param {Account} changes
 * @returns
 */
export const updateAccount = (_id: string, changes: Account) => {
    let _changes = utils.flatObject(changes)
    return AccountModel.updateOne({ _id }, { "$set": _changes }).exec()
}

/**
 *
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const findByEmailPassword = (email: string, password: string) => {
    return ProfileModel.findOne({ email, password })
        .populate("accounts")
        .exec()
}