import { API, UserAccount } from "honeybee-api"

export const updateUserAccount = async (id: string, userAccount: UserAccount): Promise<boolean> => {
    if (!id) return Promise.reject("id not provided")
    return API.updateUserAccount(id, userAccount)
}