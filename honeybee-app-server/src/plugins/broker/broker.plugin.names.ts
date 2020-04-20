import { ClearPlugin } from "./clear/clear.plugin"

/**
 *
 *
 * @export
 * @class BrokerPluginNames
 */
export class BrokerPluginNames {
    static CLEAR: BrokerPluginNamesDef = { id: "CLEAR", impl: ClearPlugin }
    // ...
}

export type BrokerPluginNamesDef = { id: string, impl: Object }

