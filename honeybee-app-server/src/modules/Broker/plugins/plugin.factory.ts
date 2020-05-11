import { ObjectID } from 'mongodb'
import { ErrorCodes } from '../../../core/error.codes'
import { ts } from '../../../core/i18n'
import Logger from '../../../core/Logger'
import { BrokerAccount } from '../models/broker.account.model'
import { BrokerPlugin } from './broker.plugin'
import { BrokerPluginNames } from './broker.plugin.names'
import { MockBrokerPlugin } from './mock.broker.plugin'

const adapters = new Map<string, any>()

export const PluginFactory = {

    /**
     *
     *
     */
    init: async () => {
        if (process.env.USE_REAL_BROKER_ADAPTER) {
            Object.values(BrokerPluginNames).map(adapter => {
                adapters.set(adapter.id, adapter.impl)
                Logger.info("BrokerAdapter loaded -> %s", JSON.stringify(adapter))
            })
        }
    },

    /**
     *
     *
     * @param {BrokerAccount} brokerAccount
     * @param {boolean} simulation
     * @returns {BrokerPlugin}
     */
    create: (brokerAccount: BrokerAccount, simulation: boolean): BrokerPlugin => {
        if (simulation || !process.env.USE_REAL_BROKER_ADAPTER) {
            let id = ObjectID.createFromTime(Date.now())
            return new MockBrokerPlugin(id)
        }

        const AdapterImpl = adapters.get(brokerAccount.brokerCode)
        if (AdapterImpl) return new AdapterImpl(brokerAccount._id)
        Logger.throw(ErrorCodes.BROKER_ADAPTER_NOT_FOUND, ts("broker_adapter_not_found", { code: brokerAccount.brokerCode }))
    }

}