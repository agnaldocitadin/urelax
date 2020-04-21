import { API, UserAccount } from "honeybee-api"

export const updateUserAccount = async (id: string, userAccount: UserAccount): Promise<boolean> => {
    if (!id) return Promise.reject("id not provided")
    const transformed = {
        name: userAccount.name,
        nickname: userAccount.nickname,
        passwd: userAccount.passwd,
        email: userAccount.email,
    } as UserAccount
    return API.updateUserAccount(id, transformed)
}