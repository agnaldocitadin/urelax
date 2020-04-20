import { createAppContainer, createSwitchNavigator } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import { AccountUI } from '../modules/account'
import { ActivityDetailUI, ActivityListUI } from '../modules/activity'
import { BalanceHistoryDetailUI, BalanceHistoryUI } from '../modules/balance'
import { AccountBirthdateUI, AccountCompanyUI, AccountCpfUI, AccountDescriptionUI, AccountListUI, AccountPasswdUI, AccountPreviewUI, AccountReviewUI, AccountSignatureUI } from '../modules/broker'
import { DashboardUI } from '../modules/dashboard'
import { SettingUI } from '../modules/setting'
import { FastAuthFailureUI, FastAuthUI, LogInUI } from '../modules/signIn'
import { SignUpUI } from '../modules/signUp'
import { StockTrackerBrokerUI, StockTrackerFrequencyUI, StockTrackerListUI, StockTrackerPreviewUI, StockTrackerReviewUI, StockTrackerSettingUI, StockTrackerStrategyUI, StockTrackerSymbolUI, StockTrackerTransactionUI } from '../modules/stockTracker'
import { TourUI } from '../modules/tour'

export const Routes = {

    // UIs
    FastAuthUI : "FastAuthUI",
    FastAuthFailureUI : "FastAuthFailureUI",
    TourUI : "TourUI",
    LogInUI : "LogInUI",
    SignUpUI : "SignUpUI",
    DashboardUI : "DashboardUI",
    SettingUI : "SettingUI",
    StockTrackerListUI : "StockTrackerListUI",
    BalanceHistoryUI : "BalanceHistoryUI",
    BalanceHistoryDetailUI : "BalanceHistoryDetailUI",
    ActivityListUI : "ActivityListUI",
    ActivityDetailUI : "ActivityDetailUI",
    AccountUI : "AccountUI",
    AccountListUI : "AccountListUI",
    AccountPreviewUI : "AccountPreviewUI",
    AccountDescriptionUI : "AccountDescriptionUI",
    AccountCpfUI : "AccountCpfUI",
    AccountBirthdateUI : "AccountBirthdateUI",
    AccountSignatureUI : "AccountSignatureUI",
    AccountPasswdUI : "AccountPasswdUI",
    AccountCompanyUI : "AccountCompanyUI",
    AccountReviewUI : "AccountReviewUI",
    StockTrackerPreviewUI : "StockTrackerPreviewUI",
    StockTrackerSettingUI : "StockTrackerSettingUI",
    StockTrackerStrategyUI : "StockTrackerStrategyUI",
    StockTrackerFrequencyUI : "StockTrackerFrequencyUI",
    StockTrackerSymbolUI : "StockTrackerSymbolUI",
    StockTrackerBrokerUI : "StockTrackerBrokerUI",
    StockTrackerReviewUI : "StockTrackerReviewUI",
    StockTrackerTransactionUI : "StockTrackerTransactionUI",

    // Stacks
    StartupStack : "StartupStack",
    AppStack : "AppStack"
}

const defaultNavigationOptions = {
    headerShown: false
}

const StartupStack = () => createStackNavigator(
    { TourUI, LogInUI, SignUpUI },
    { defaultNavigationOptions, initialRouteName: Routes.TourUI }
)

const AppStack = () => createStackNavigator(
    { 
        DashboardUI, SettingUI, StockTrackerListUI, BalanceHistoryUI, BalanceHistoryDetailUI, ActivityListUI, 
        ActivityDetailUI, AccountUI, AccountListUI, AccountPreviewUI, AccountDescriptionUI, AccountCpfUI, AccountBirthdateUI,
        AccountSignatureUI, AccountPasswdUI, AccountCompanyUI, AccountReviewUI, StockTrackerPreviewUI, StockTrackerSettingUI,
        StockTrackerStrategyUI, StockTrackerFrequencyUI, StockTrackerSymbolUI, StockTrackerBrokerUI, StockTrackerReviewUI,
        StockTrackerTransactionUI
    },
    { defaultNavigationOptions, initialRouteName: Routes.DashboardUI }
)

// const AnimatedRootSwitch: any = createAnimatedSwitchNavigator({ Auth, AppStack, TourStack },{ transition: <Animations/> })
const AnimatedRootSwitch: any = createSwitchNavigator({ 
    FastAuthUI, FastAuthFailureUI,
    [Routes.StartupStack]: StartupStack(),
    [Routes.AppStack]: AppStack(),
})

export default createAppContainer(AnimatedRootSwitch)