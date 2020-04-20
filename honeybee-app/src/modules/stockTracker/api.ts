import { Activity, API, BalanceSheet, Frequency, Stock, StockTracker, Strategy } from "honeybee-api"

export const fetchActiveBeesQuery = async (userAccountId: string): Promise<StockTracker[]> => {
    return API.fetchActiveBeesQuery(userAccountId, `
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

export const fetchBeeActivitiesQuery = async (beeId: string, page: number, qty: number, date: Date = new Date()): Promise<Activity[]> => {
    return API.fetchBeeActivitiesQuery(beeId, date, page, qty, `
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

export const createBee = async (bee: StockTracker): Promise<StockTracker> => {
    return API.createBee(bee, `
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

export const updateBee = (id: string, bee: StockTracker): Promise<boolean> => {
    let stockTrackerClone = Object.assign({}, bee)
    stockTrackerClone.frequency = <any>stockTrackerClone.frequency?._id
    return API.updateBee(id, stockTrackerClone)
}