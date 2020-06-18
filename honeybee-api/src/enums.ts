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

export enum TransactionType {
    STATEMENT_OPENING = "STATEMENT_OPENING", //Incluído sempre que o histórico do dia for iniciao (posição de cada do investimento no dia anterior)
    DESPOSIT = "DESPOSIT", // Depósito em dinheiro na conta da corretora
    TRANSFER = "TRANSFER", // Transferencia de entrada de valor (compra/venda ação, cdb, tesouro, etc)
    YIELD = "YIELD"
}

export enum InvestimentType {
    STOCK = "STOCK",
    CURRENCY = "CURRENCY"
}

export enum FinancialAnalysisPeriod {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}