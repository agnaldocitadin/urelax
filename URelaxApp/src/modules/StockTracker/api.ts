import { API } from "honeybee-api"

// id?: string
// account?: string
// status?: StockTrackerStatus
// frequency?: string
// page?: number
// qty?: number

export const fetchStockTrackerByID = async (id: string) => {
    console.log("--->", id)
    const stockTrackers = await API.StockTracker.fetchStockTrackers({
        id,
        page: 0,
        qty: 1
    }, `
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
            description
            logo
            stock {
                symbol
            }
        }
    `)

    if (stockTrackers.length >= 0) return stockTrackers[0]
    return null
}