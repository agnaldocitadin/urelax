import { Activity, API, BalanceSheet, Frequency, Stock, StockTracker, Strategy } from "honeybee-api"

export const fetchActiveStockTrackersQuery = async (userAccountId: string): Promise<StockTracker[]> => {
    return API.fetchActiveStockTrackersQuery(userAccountId, `
        _id
        brokerAccount {
            brokerCode
            accountName
        }
        strategy {
            _id
            description
        }
        stock {
            symbol
            description
            stockLot
        }
        status
        frequency {
            _id
            description
        }
        stockAmountLimit
        autoAmountLimit
    `)
}

export const fetchStockTrackerActivitiesQuery = async (stockTrackerId: string, page: number, qty: number, date: Date = new Date()): Promise<Activity[]> => {
    return API.fetchStockTrackerActivitiesQuery(stockTrackerId, date, page, qty, `
        icon
        dateTime
        title
        details {
            title
            description
            hidden
        }
    `)
}

export const fetchStockTrackerBalance = async (userAccountId: string, brokerAccountId: string | undefined = undefined): Promise<BalanceSheet[]> => {
    return API.fetchBalanceSheet(userAccountId, `
        stocks {
            symbol
            qty
            averagePrice
        }
    `, brokerAccountId)
}

export const fetchAvailableSymbols = async (): Promise<Stock[]> => {
    return API.fetchAvailableSymbols(`
        _id
        symbol
        description
    `)
}

export const fetchAvailableFrequencies = async (): Promise<Frequency[]> => {
    return API.fetchAvailableFrequencies(`
        _id
        description
    `)
}

export const fetchAvailableStrategies = async (): Promise<Strategy[]> => {
    return API.fetchAvailableStrategies(`
        _id
        description
    `)
}

export const createStockTracker = async (stockTracker: StockTracker): Promise<StockTracker> => {
    return API.createStockTracker(stockTracker, `
        _id
        brokerAccount {
            brokerCode
            accountName
        }
        strategy {
            _id
            description
        }
        stock {
            symbol
            description
            stockLot
        }
        status
        frequency {
            _id
            description
        }
        stockAmountLimit
        autoAmountLimit
    `)
}

export const updateStockTracker = (id: string, stockTracker: StockTracker): Promise<boolean> => {
    let clone = Object.assign({}, stockTracker)
    clone.frequency = <any>clone.frequency?._id
    clone.strategy = <any>clone.strategy?._id
    return API.updateStockTracker(id, clone)
}