import { format } from "date-fns"
import { Brokers } from "honeybee-api"
import { ErrorCodes } from "../../core/error.codes.d"
import Logger from "../../core/Logger"
import { BrokerAccount } from "../../models/broker.account.model"
import { BrokerHelperInterface } from "../broker.account.service"

export const ClearHelper: BrokerHelperInterface = {
    code: Brokers.CLEAR,

    validateExtraData: (brokerAccount: BrokerAccount) => {
        const { cpf, signature, passwd, birthdate } = brokerAccount.extraData || {}

        if (!cpf) {
            Logger.throw(ErrorCodes.UNKNOWN, "cpf")
        }

        if (!signature) {
            Logger.throw(ErrorCodes.UNKNOWN, "singature")
        }

        if (!passwd) {
            Logger.throw(ErrorCodes.UNKNOWN, "passwd")
        }

        if (!birthdate) {
            Logger.throw(ErrorCodes.UNKNOWN, "birthdate")
        }

        return true
    },
    
    loadExtraData: async (brokerAccount: BrokerAccount) => {
        let extraData = brokerAccount.extraData
        extraData["birthdate"] = new Date(extraData.birthdate)
        extraData["cpf"] = String(extraData.cpf).replace(/\D/g, "")
        extraData["platformUID"] = "35cb2446-76e3-4082-bc34-1de0ae89c534"

        if (process.env.PRODUCTION_MODE) {
            let { authCookie, sessionId } = await getCredentials(extraData.cpf, extraData.passwd, extraData.birthdate)
            extraData["token"] = authCookie
            extraData["sessionId"] = sessionId
        }
    }
}

/**
 *
 *
 * @param {string} cpf
 * @param {string} password
 * @param {Date} birthdate
 * @returns {Promise<{ authCookie: string, sessionId: string }>}
 */
const getCredentials = async (cpf: string, password: string, birthdate: Date): Promise<{ authCookie: string, sessionId: string }> => {
    try {
        const requestBody = `refer=&identificationNumber=${cpf}&password=${password}&dob=${format(birthdate, "dd/MM/yyyy")}`
        const response = await fetch("https://www.clear.com.br/pit/signin/Do?controller=SignIn", {
            method: "POST",
            redirect: "manual",
            body: requestBody,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
                "Connection": "keep-alive",
                "Host": "www.clear.com.br",
                "Origin": "https://www.clear.com.br",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "none"
            }
        })

        if (response.status === 302) {
            const cookie = response.headers.get("set-cookie")
            const authCookie = cookie.match(/(AuthCookie=.*?;)/)[0].replace("AuthCookie=", "").replace(";", "")
            const sessionId = cookie.match(/(ASP.NET_SessionId=.*?;)/)[0].replace("ASP.NET_SessionId=", "").replace(";", "")
            return {
                authCookie,
                sessionId
            }
        }

        Logger.throw(ErrorCodes.CLEAR_CREDENTIALS_FAIL, "Invalid Clear account credentials")
    }
    catch(error) {
        Logger.throw(ErrorCodes.UNKNOWN, error.message)
    }
}