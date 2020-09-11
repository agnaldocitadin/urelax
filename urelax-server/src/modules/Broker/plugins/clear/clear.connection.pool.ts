import { Brokers } from 'urelax-api'
import { ErrorCodes } from "../../../../core/error.codes"
import Logger from "../../../../core/Logger"
import { BrokerAccount } from "../../models/broker.account.model"
import { ClearConnection } from "./clear.connection"

const connectionPool = new Map<string, ClearConnection>()

export const ClearConnectionPool = {

    getConnection: (account: BrokerAccount): ClearConnection => {
        if (account.brokerCode !== Brokers.CLEAR) {
            Logger.throw({
                code: ErrorCodes.IS_NOT_VALID_CLEAR_ACCOUNT,
                message: `Account ID ${account._id} is not a valid Clear account.`,
                args: {
                    id: account._id
                }
            })
        }

        const ID = account._id.toString()
        let connection = connectionPool.get(ID)
        if (!connection) {
            connection = ClearConnection.build(account, process.env.CLEAR_WSS_KEEPALIVE === "true")
            connectionPool.set(ID, connection)
            return connection
        }
        return connection
    },

    closeConnection: (accountId: string): ClearConnection => {
        const conn = connectionPool.get(accountId.toString())
        if (conn) conn.disconnect()
        return conn
    },

    removeConnection: (accountId: string) => {
        const conn = connectionPool.get(accountId.toString())
        if (conn) conn.destroy()
        connectionPool.delete(accountId.toString())        
    }

}