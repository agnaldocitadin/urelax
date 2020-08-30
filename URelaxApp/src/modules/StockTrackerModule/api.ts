import { API, StockTrackerInput } from "honeybee-api"

const stockTrackerFragment = `
    _id
    strategy
    strategySetting {
        stockAmountLimit
        autoAmountLimit
    }
    status
    frequency
    qty
    buyPrice
    brokerAccount {
        accountName
        brokerCode
    }
    stockInfo {
        brokerCode
        description
        logo
        stock {
            symbol
        }
    }
`

export const fetchStockTrackerByID = async (id: string) => {
    const stockTrackers = await API.StockTracker.fetchStockTrackers({
        id,
        page: 0,
        qty: 1
    }, stockTrackerFragment)

    if (stockTrackers.length >= 0) return stockTrackers[0]
    return null
}

export const createStockTracker = (input: StockTrackerInput) => {
    return API.StockTracker.createStockTracker(input, stockTrackerFragment)
}

export const updateStockTracker = (id: string, input: StockTrackerInput) => {
    return API.StockTracker.updateStockTracker(id, input)
}