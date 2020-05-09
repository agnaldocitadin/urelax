// import { Stock, StockModel } from '../models/stock.model'

/**
 *
 *
 * @returns {Promise<Stock[]>}
 */
export const findAvailables = (): Promise<Stock[]> => {
    return StockModel.find({ active: true }).exec()
}
