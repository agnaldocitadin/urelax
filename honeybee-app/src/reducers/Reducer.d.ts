import { AccountState, ACCOUNT_MODULE_NAME } from '../modules/account'
import { ActivityState, ACTIVITY_MODULE_NAME } from '../modules/activity'
import { BalanceState, BALANCE_MODULE_NAME } from '../modules/balance'
import { BrokerState, BROKER_MODULE_NAME } from '../modules/broker'
import { DashboardState, DASHBOARD_MODULE_NAME } from '../modules/dashboard'
import { MessageState, MESSAGE_MODULE_NAME } from '../modules/message'
import { SignInState, SIGNIN_MODULE_NAME } from '../modules/signIn'
import { StockTrackerState, STOCK_TRACKER_MODULE_NAME } from '../modules/stockTracker'

export interface ReduxAction {
    type: string
    data: any
}

export interface States {
    [SIGNIN_MODULE_NAME]: SignInState
    [BROKER_MODULE_NAME]: BrokerState
    [STOCK_TRACKER_MODULE_NAME]: StockTrackerState
    [ACCOUNT_MODULE_NAME]: AccountState
    [MESSAGE_MODULE_NAME]: MessageState
    [DASHBOARD_MODULE_NAME]: DashboardState
    [BALANCE_MODULE_NAME]: BalanceState
    [ACTIVITY_MODULE_NAME]: ActivityState
}