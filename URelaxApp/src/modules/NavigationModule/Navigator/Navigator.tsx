import { useNetInfo } from '@react-native-community/netinfo'
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerNavigationOptions } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Account, Profile } from 'honeybee-api'
import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import NavigationModule from '..'
import { Option } from '../../../components/Inputs/InputOptions'
import { HeaderDivider } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { BaseIcon, Colors, DEFAULT_HORIZONTAL_SPACING, Icons, TypographyMedium } from '../../../theming'
import { ActivityDetailUI } from '../../ActivityHistoryModule/ActivityDetailUI'
import { ActivityListUI } from '../../ActivityHistoryModule/ActivityListUI'
import { AddBrokerAccountUI } from '../../BrokerModule/AddBrokerAccountUI'
import { BrokerAccountDetailUI } from '../../BrokerModule/BrokerAccountDetailUI'
import { BrokerAccountsUI } from '../../BrokerModule/BrokerAccountsUI'
import { BrokerAccountWizardUI } from '../../BrokerModule/BrokerAccountWizardUI'
import { DashboardUI } from '../../DashboardModule/DashboardUI'
import IdentityModule from '../../IdentityModule'
import { ProfileUI } from '../../IdentityModule/ProfileUI'
import { SignUpUI } from '../../IdentityModule/SignUpUI'
import { AddInvestimentUI } from '../../InvestimentModule/AddInvestimentUI'
import { FilterUI } from '../../InvestimentModule/FilterUI'
import { InvestimentAnalysisDetailUI } from '../../InvestimentModule/InvestimentAnalysisDetailUI'
import { InvestimentAnalysisUI } from '../../InvestimentModule/InvestimentAnalysisUI'
import { InvestimentUI } from '../../InvestimentModule/InvestimentUI'
import MessagingModule from '../../MessagingModule'
import { TourUI } from '../../PresentationModule/TourUI'
import SecurityModule from '../../SecurityModule'
import { FastAuthFailureUI } from '../../SecurityModule/FastAuthFailureUI'
import { FastAuthUI } from '../../SecurityModule/FastAuthUI'
import { LogInUI } from '../../SecurityModule/LogInUI'
import { SettingUI } from '../../SettingModule/SettingUI'
import { StatementDetailUI } from '../../StatementModule/StatementDetailUI'
import { StatementUI } from '../../StatementModule/StatementUI'
import { StockTrackerPreviewUI } from '../../StockTrackerModule/StockTrackerPreviewUI'
import { StockTrackerSettingUI } from '../../StockTrackerModule/StockTrackerSettingUI'
import { StockTrackerWizardUI } from '../../StockTrackerModule/StockTrackerWizardUI'
import StorageModule from '../../StorageModule'
import { Drawers, Routes, Stacks } from '../const'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const defaultOptions = {
    headerShown: false
}

export const Navigator: FC = ({}) => {
    
    let stackRoutes
    const selectedStack: Stacks = NavigationModule.select("stack")
    
    switch(selectedStack) {

        case "authFailure":
            stackRoutes = (
                <Stack.Navigator initialRouteName={Routes.AUTH_FAILURE}>
                    <Stack.Screen name={Routes.AUTH_FAILURE} component={FastAuthFailureUI} options={defaultOptions}/>
                </Stack.Navigator>
            )
            break

        case "auth":
            stackRoutes = (
                <Stack.Navigator initialRouteName={Routes.SPLASH}>
                    <Stack.Screen name={Routes.SPLASH} component={FastAuthUI} options={{
                        ...defaultOptions,
                        cardOverlayEnabled: false,
                        cardStyle: { backgroundColor: "transparent" }
                    }}/>
                </Stack.Navigator>
            )
            break
        
        case "welcome":
            stackRoutes = (
                <Stack.Navigator initialRouteName={Routes.TOUR}>
                    <Stack.Screen name={Routes.TOUR} component={TourUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.SIGN_IN} component={LogInUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.SIGN_UP} component={SignUpUI} options={defaultOptions}/>
                </Stack.Navigator>
            )
            break
            
        case "app":
            stackRoutes = (
                <Drawer.Navigator 
                    drawerContent={props => <CustomDrawerContent {...props}/>}
                    drawerType="slide"
                    drawerPosition="right"
                    backBehavior="initialRoute">
                        
                    <Drawer.Screen 
                        name={Drawers.DASHBOARD}
                        options={menuOptions("dashboard", Icons.HOME_VARIANT, true)}
                        component={dashboard}/>

                    <Drawer.Screen 
                        name={Drawers.PROFILE}
                        options={menuOptions("profile", Icons.ACCOUNT_CIRCLE, true)}
                        component={profile}/>

                    <Drawer.Screen
                        name={Drawers.INVESTIMENTS}
                        options={menuOptions("investiments", Icons.CASH, true, { unmountOnBlur: true })}
                        component={investiments}/>

                    <Drawer.Screen
                        name={Drawers.ANALYSIS}
                        options={menuOptions("analysis", Icons.CHART_LINE, true, { unmountOnBlur: true })}
                        component={investimentAnalysis}/>

                    {/* <Drawer.Screen
                        name={Drawers.STATEMENTS}
                        options={menuOptions("statement", Icons.STATEMENTS, true)}
                        component={statements}/> */}

                    <Drawer.Screen
                        name={Drawers.ACTIVITIES}
                        options={menuOptions("activities", Icons.ACTIVITY, true, { unmountOnBlur: true })}
                        component={activities}/>

                    <Drawer.Screen
                        name={Drawers.BROKERS}
                        options={menuOptions("brokers", Icons.BROKER, true)}
                        component={brokers}/>

                    <Drawer.Screen
                        name={Drawers.SETTINGS}
                        options={menuOptions("settings", Icons.SETTINGS, true, { unmountOnBlur: true })}
                        component={settings}/>
                </Drawer.Navigator>
            )
            break
    }

    return (
        <NavigationContainer>
            { stackRoutes }
        </NavigationContainer>
    )
}

const menuOptions = (label: string, icon: string, swipeable: boolean = false, extra?: DrawerNavigationOptions): DrawerNavigationOptions => {
    return {
        ...extra,
        drawerLabel: props => <TypographyMedium {...props}>{ts(label)}</TypographyMedium>,
        drawerIcon: props => <BaseIcon {...props} name={icon}/>,
        swipeEnabled: swipeable
    }
}

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => (
    <View style={{ flex: 1 }}>
        <DrawerContent {...props}>
            <DrawerItemList {...props}/>
            <AccountSwitcher {...props}/>
        </DrawerContent>
        <Logout {...props}/>
    </View>
)

const dashboard = () => (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
        <Stack.Screen name={Routes.DASHBOARD} component={DashboardUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const profile = () => (
    <Stack.Navigator initialRouteName={Routes.PROFILE}>
        <Stack.Screen name={Routes.PROFILE} component={ProfileUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const investiments = () => (
    <Stack.Navigator initialRouteName={Routes.INVESTIMENT}>
        <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.ADD_INVESTIMENT} component={AddInvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_FILTER} component={FilterUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_WIZARD} component={StockTrackerWizardUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_PREVIEW} component={StockTrackerPreviewUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_SETTING} component={StockTrackerSettingUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.ACTIVITY_DETAIL} component={ActivityDetailUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const investimentAnalysis = () => (
    <Stack.Navigator initialRouteName={Routes.INVESTIMENT_ANALYSIS}>
        <Stack.Screen name={Routes.INVESTIMENT_ANALYSIS} component={InvestimentAnalysisUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_ANALYSIS_DETAIL} component={InvestimentAnalysisDetailUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const statements = () => (
    <Stack.Navigator initialRouteName={Routes.STATEMENT}>
        <Stack.Screen name={Routes.STATEMENT} component={StatementUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STATEMENT_DETAIL} component={StatementDetailUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const activities = () => (
    <Stack.Navigator initialRouteName={Routes.ACTIVITY_LIST}>
        <Stack.Screen name={Routes.ACTIVITY_LIST} component={ActivityListUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.ACTIVITY_DETAIL} component={ActivityDetailUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const brokers = () => (
    <Stack.Navigator initialRouteName={Routes.BROKER_ACCOUNTS}>
        <Stack.Screen name={Routes.ADD_BROKER_ACCOUNT} component={AddBrokerAccountUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.BROKER_ACCOUNT_WIZARD} component={BrokerAccountWizardUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.BROKER_ACCOUNTS} component={BrokerAccountsUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.BROKER_ACCOUNT_DETAIL} component={BrokerAccountDetailUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const settings = () => (
    <Stack.Navigator initialRouteName={Routes.SETTING}>
        <Stack.Screen name={Routes.SETTING} component={SettingUI} options={defaultOptions}/>
    </Stack.Navigator>
)

const AccountSwitcher: FC<any> = ({ navigation }) => {
    const { setActiveAccount } = IdentityModule.actions()
    const active: Account = IdentityModule.select("activeAccount")
    const profile: Profile = SecurityModule.select("profile")
    const real = profile.accounts?.find(account => !account.simulation)
    const simulation = profile.accounts?.find(account => account.simulation)
    const netInfo = useNetInfo()
    const online = !!netInfo.isInternetReachable

    const handleSwitchAccount = useCallback((account?: Account) => {
        account && setActiveAccount(account)
        navigation.closeDrawer()
    }, [profile])

    return (
        <React.Fragment>
            <HeaderDivider style={{ marginLeft: 20 }}>Conta</HeaderDivider>
            <AccountOption
                disabled={!online}
                checked={real?._id === active._id}
                onPress={() => handleSwitchAccount(real)}
                option={{
                    body: (
                        <TypographyMedium
                            color={online ? Colors.GRAY_2 : Colors.GRAY_4}>
                            {ts("real")}
                        </TypographyMedium>
                    ),
                    value: 0
                }} />

            <AccountOption
                disabled={!online}
                checked={simulation?._id === active._id}
                onPress={() => handleSwitchAccount(simulation)}
                option={{
                    body: (
                        <TypographyMedium
                        color={online ? Colors.GRAY_2 : Colors.GRAY_4}>
                            {ts("simulation")}
                        </TypographyMedium>
                    ),
                    value: 0
                }} />
        </React.Fragment>
    )
}

const Logout: FC = (props) => {
    const { resetStorage } = StorageModule.actions()
    const { switchStack } = NavigationModule.actions()
    const { showConfirm } = MessagingModule.actions()
    return (
        <DrawerItem 
            label={props => <TypographyMedium {...props}>{ts("exit_app")}</TypographyMedium>}
            icon={props => <BaseIcon {...props} name={Icons.LOGOUT}/>}
            onPress={() => {
                showConfirm(ts("exit_app"), ts("exit_app_msg"), () => {
                    resetStorage()
                    switchStack("welcome")
                })
            }}/>
    )
}

const DrawerContent = styled(DrawerContentScrollView)`
    border-color: ${Colors.GRAY_4};
    border-bottom-width: 1px;
`

const AccountOption = styled(Option)`
    padding: 10px ${DEFAULT_HORIZONTAL_SPACING}px;
`

{/* <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
<Stack.Screen name={Routes.ADD_INVESTIMENT} component={AddInvestimentUI} options={defaultOptions}/>
<Stack.Screen name={Routes.INVESTIMENT_FILTER} component={FilterUI} options={defaultOptions}/>
<Stack.Screen name={Routes.INVESTIMENT_ANALYSIS} component={InvestimentAnalysisUI} options={defaultOptions}/>
<Stack.Screen name={Routes.INVESTIMENT_ANALYSIS_DETAIL} component={InvestimentAnalysisDetailUI} options={defaultOptions}/>
<Stack.Screen name={Routes.STOCKTRACKER_PREVIEW} component={StockTrackerPreviewUI} options={defaultOptions}/>
<Stack.Screen name={Routes.STOCKTRACKER_REVIEW} component={StockTrackerReviewUI} options={defaultOptions}/>

<Stack.Screen name={Routes.STOCKTRACKER_WIZARD} component={StockTrackerWizardUI} options={defaultOptions}/> */}

// const Conta: FC<DrawerContentComponentProps> = (props) => {
//     return (
//         <View style={{ flex: 1 }}>
//             <DrawerContentScrollView {...props}>
//                 <DrawerItemList {...props} activeBackgroundColor="white" activeTintColor="black" itemStyle={{
//                     borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0
//                 }}/>
//             </DrawerContentScrollView>
//             <DrawerItem
//                 activeBackgroundColor="white"
//                 // activeTintColor="red"
//                 icon={({color, size}) => (
//                     <BaseIcon 
//                     name="account-check-outline" 
//                     color={color}
//                     size={size}
//                     />
//                 )}
//                 label={"sdf"}
//                 style={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0 }}
//                 onPress={() => {props.navigation.navigate('Opa 2')}}
//             />
//         </View>
//     )
// }