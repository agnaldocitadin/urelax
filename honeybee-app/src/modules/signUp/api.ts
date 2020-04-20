import { API, UserAccount } from "honeybee-api"

/**
 *
 *
 * @param {UserAccount} userAccount
 * @returns {Promise<UserAccount>}
 */
export const createUserAccount = async (userAccount: UserAccount): Promise<UserAccount> => {
    return API.createUserAccount(userAccount, `
        _id
        name
        nickname
        passwd
        email
        active
        simulation
        simulationAccountId
    `)
}