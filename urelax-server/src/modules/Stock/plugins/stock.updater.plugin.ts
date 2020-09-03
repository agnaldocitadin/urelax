
export interface StockUpdaterPlugin {

    /**
     * Starts StockUpdater
     *
     * @param {string[]} symbols
     * @returns {Promise<void>}
     * @memberof StockUpdater2
     */
    start(symbols: string[]): Promise<void>

    /**
     * Stops StockUpdater
     *
     * @returns {Promise<void>}
     * @memberof StockUpdater2
     */
    stop(): Promise<void>

}