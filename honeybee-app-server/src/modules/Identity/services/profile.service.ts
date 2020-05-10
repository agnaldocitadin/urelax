import { Locales } from 'honeybee-api'
import { ErrorCodes } from '../../../core/error.codes.d'
import { ts } from '../../../core/i18n'
import Logger from '../../../core/Logger'
import { flatObject } from '../../../core/Utils'
import { onActivateSimulationAccount, onCreateAccount } from '../../Activity/services/activity.service'
import { Account, Preferences, Profile, ProfileModel } from '../models/profile.model'

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
export const findAllowedProfiles = (): Promise<Profile[]> => {
    return ProfileModel.find({ active: true }).exec()
}

/**
 *
 *
 * @param {*} { name, nickname, email, password }
 * @returns {Promise<Profile>}
 */
export const createProfile = async ({ name, nickname, email, password }: any): Promise<Profile> => {
    const profile: Profile = {
        name,
        nickname,
        email,
        password,
        active: true,
        accounts: [
            {
                active: true,
                simulation: false,
                preference: defaultPreferences
            }
        ]
    }
    validateProfile(profile)
    let _profile = await ProfileModel.create(profile)
    onCreateAccount(_profile)
    return _profile
}

/**
 *
 *
 * @param {Profile} profile
 */
const validateProfile = (profile: Profile) => {
    // TODO Validate diplicated e-mail.
}

/**
 *
 *
 * @param {string} _id
 * @param {Account} changes
 * @returns
 */
export const updateAccount = (_id: string, changes: Account) => {
    let _changes = flatObject(changes)
    return ProfileModel.updateOne({ _id }, { "$set": _changes }).exec()
}

/**
 *
 *
 * @param {string} profileId
 */
export const activateSimulation = async (profileId: string) => {
    let profile = await findProfileById(profileId)
    let hasSimulation = profile.getSimulation()
    
    if (hasSimulation) {
        Logger.throw(ErrorCodes.ACCOUNT_HAS_SIMULATION, ts("account_has_already_simulation", { id: profileId }))
    }

    profile.accounts.push({
        active: true,
        simulation: true,
        preference: defaultPreferences
    })
    
    await profile.save()
    onActivateSimulationAccount(profile)
    // TODO create finantial history
}

/**
 *
 *
 * @param {string} email
 * @param {string} password
 * @returns
 */
export const findByEmailPassword = (email: string, password: string) => {
    return ProfileModel.findOne({ email, password }).exec()
}