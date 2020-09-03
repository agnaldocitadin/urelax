"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Locales;
(function (Locales) {
    Locales["PT_BR"] = "pt_BR";
    Locales["EN_US"] = "en_US";
})(Locales = exports.Locales || (exports.Locales = {}));
var StockTrackerStatus;
(function (StockTrackerStatus) {
    StockTrackerStatus["PAUSED"] = "PAUSED";
    StockTrackerStatus["RUNNING"] = "RUNNING";
    StockTrackerStatus["WAITING_PAUSE"] = "WAITING_PAUSE";
    StockTrackerStatus["WAITING_DESTROY"] = "WAITING_DESTROY";
    StockTrackerStatus["DESTROYED"] = "DESTROYED";
})(StockTrackerStatus = exports.StockTrackerStatus || (exports.StockTrackerStatus = {}));
var ActivityType;
(function (ActivityType) {
    ActivityType["STOCK_TRACKER"] = "STOCK_TRACKER";
    ActivityType["USER_ACCOUNT"] = "USER_ACCOUNT";
})(ActivityType = exports.ActivityType || (exports.ActivityType = {}));
var MessageTypes;
(function (MessageTypes) {
    MessageTypes["STOCK_TRACKER_STATUS"] = "STOCK_TRACKER_STATUS";
    MessageTypes["STOCK_TRACKER_ORDER"] = "STOCK_TRACKER_ORDER";
})(MessageTypes = exports.MessageTypes || (exports.MessageTypes = {}));
var Brokers;
(function (Brokers) {
    Brokers["CLEAR"] = "CLEAR";
    // Add new brokers here ...
})(Brokers = exports.Brokers || (exports.Brokers = {}));
var TransactionType;
(function (TransactionType) {
    // START_OF_DAY = "START_OF_DAY", // Utilizado apenas para representar o inicio do dia na listagem de transações
    TransactionType["STATEMENT_OPENING"] = "STATEMENT_OPENING";
    TransactionType["DESPOSIT"] = "DESPOSIT";
    TransactionType["TRANSFER"] = "TRANSFER";
    TransactionType["YIELD"] = "YIELD";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var ProfitType;
(function (ProfitType) {
    ProfitType["YIELD"] = "YIELD";
    ProfitType["EXCHANGE"] = "EXCHANGE";
})(ProfitType = exports.ProfitType || (exports.ProfitType = {}));
var InvestimentType;
(function (InvestimentType) {
    InvestimentType["STOCK"] = "STOCK";
    InvestimentType["CURRENCY"] = "CURRENCY";
})(InvestimentType = exports.InvestimentType || (exports.InvestimentType = {}));
var FinancialAnalysisPeriod;
(function (FinancialAnalysisPeriod) {
    FinancialAnalysisPeriod["DAILY"] = "DAILY";
    FinancialAnalysisPeriod["WEEKLY"] = "WEEKLY";
    FinancialAnalysisPeriod["MONTHLY"] = "MONTHLY";
    FinancialAnalysisPeriod["YEARLY"] = "YEARLY";
})(FinancialAnalysisPeriod = exports.FinancialAnalysisPeriod || (exports.FinancialAnalysisPeriod = {}));
