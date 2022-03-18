
export enum ErrorCodes {

    // Commons
    UNKNOWN = "UNKNOWN",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    BROKERCODE_UNKNOWN = "BROKERCODE_UNKNOWN",
    BROKER_ADAPTER_NOT_FOUND = "BROKER_ADAPTER_NOT_FOUND",
    MODULE_INVALID = "MODULE_INVALID",
    USER_NOT_AUTHORIZED = "USER_NOT_AUTHORIZED",
    INVALID_AUTHORIZATION_TOKEN = "INVALID_AUTHORIZATION_TOKEN",
    AUTHORIZATION_TOKEN_NOT_PROVIDED = "AUTHORIZATION_TOKEN_NOT_PROVIDED",
    
    // Cache
    ENTITY_NOT_PROVIDED = "ENTITY_NOT_PROVIDED",
    
    // Frequency
    FREQUENCY_NOT_FOUND = "FREQUENCY_NOT_FOUND",

    // Strategy
    STRATEGY_NOT_FOUND = "STRATEGY_NOT_FOUND",

    // Broker
    BROKER_ACCOUNT_USERACCOUNT_REQUIRED = "BROKER_ACCOUNT_USERACCOUNT_REQUIRED",
    BROKER_ACCOUNT_NAME_REQUIRED = "BROKER_ACCOUNT_NAME_REQUIRED",
    BROKER_ACCOUNT_BROKERCODE_REQUIRED = "BROKER_ACCOUNT_BROKERCODE_REQUIRED",

    // Profile
    PROFILE_EMAIL_DUPLICATED = "PROFILE_EMAIL_DUPLICATED",

    // Stock
    LAST_PRICE_NOT_FOUND = "LAST_PRICE_NOT_FOUND",

    // Stock Tracker
    STOCK_TRACKER_SYMBOL_NOT_FOUND = "STOCK_TRACKER_SYMBOL_NOT_FOUND",
    STOCK_TRACKER_ACCOUNT_NOT_FOUND = "STOCK_TRACKER_ACCOUNT_NOT_FOUND",
    STOCK_TRACKER_STRATEGY_NOT_FOUND = "STOCK_TRACKER_STRATEGY_NOT_FOUND",
    STOCK_TRACKER_STATUS_NOT_FOUND = "STOCK_TRACKER_STATUS_NOT_FOUND",

    // Clear
    IS_NOT_VALID_CLEAR_ACCOUNT = "IS_NOT_VALID_CLEAR_ACCOUNT",
    EXCHANGEORDERTYPE_INVALID = "EXCHANGEORDERTYPE_INVALID",
    EXCHANGEORDERSIDE_INVALID = "EXCHANGEORDERSIDE_INVALID",
    ORDERSTATUS_INVALID = "ORDERSTATUS_INVALID",
    CLEAR_CREDENTIALS_FAIL = "CLEAR_CREDENTIALS_FAIL",
    
}