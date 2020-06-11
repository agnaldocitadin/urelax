export enum Locales {
    PT_BR = "pt_BR",
    EN_US = "en_US"
}

export enum StockTrackerStatus {
    PAUSED = "PAUSED",
    RUNNING = "RUNNING",
    WAITING_PAUSE = "WAITING_PAUSE",
    WAITING_DESTROY = "WAITING_DESTROY",
    DESTROYED = "DESTROYED"
}

export enum ActivityType {
    STOCK_TRACKER = "STOCK_TRACKER",
    USER_ACCOUNT = "USER_ACCOUNT"
}

export enum MessageTypes {
    STOCK_TRACKER_STATUS = "STOCK_TRACKER_STATUS",
    STOCK_TRACKER_ORDER = "STOCK_TRACKER_ORDER",
}

export enum Brokers {
    CLEAR = "CLEAR"
    // Add new brokers here ...
}

// --- New model ---
export enum TransactionType {

}

export enum InvestimentType {
    STOCK = "STOCK"
}