import { combineReducers } from 'redux'
import { AccountReducer, ACCOUNT_MODULE_NAME } from '../modules/account'
import { ActivityReducer, ACTIVITY_MODULE_NAME } from '../modules/activity'
import { BalanceReducer, BALANCE_MODULE_NAME } from '../modules/balance'
import { BrokerReducer, BROKER_MODULE_NAME } from '../modules/broker'
import { DashboardReducer, DASHBOARD_MODULE_NAME } from '../modules/dashboard'
import { MessageReducer, MESSAGE_MODULE_NAME } from '../modules/message'
import { SignInReducer, SIGNIN_MODULE_NAME } from '../modules/signIn'
import { StockTrackerReducer, STOCK_TRACKER_MODULE_NAME } from '../modules/stockTracker'

export const Reducers = combineReducers({
    [SIGNIN_MODULE_NAME]: SignInReducer,
    [BROKER_MODULE_NAME]: BrokerReducer,
    [STOCK_TRACKER_MODULE_NAME]: StockTrackerReducer,
    [ACCOUNT_MODULE_NAME]: AccountReducer,
    [MESSAGE_MODULE_NAME]: MessageReducer,
    [DASHBOARD_MODULE_NAME]: DashboardReducer,
    [BALANCE_MODULE_NAME]: BalanceReducer,
    [ACTIVITY_MODULE_NAME]: ActivityReducer,
})

export default Reducers