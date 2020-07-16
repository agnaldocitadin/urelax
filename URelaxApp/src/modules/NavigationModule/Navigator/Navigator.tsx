import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerNavigationOptions } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import { View } from 'react-native'
import NavigationModule from '..'
import { BaseIcon, TypographyMedium } from '../../../theming'
import { ActivityDetailUI } from '../../ActivityHistoryModule/ActivityDetailUI'
import { ActivityListUI } from '../../ActivityHistoryModule/ActivityListUI'
import { BrokerAccountWizardUI } from '../../BrokerModule/BrokerAccountWizardUI'
import { DashboardUI } from '../../DashboardModule/DashboardUI'
import { AddInvestimentUI } from '../../InvestimentModule/AddInvestimentUI'
import { FilterUI } from '../../InvestimentModule/FilterUI'
import { InvestimentAnalysisDetailUI } from '../../InvestimentModule/InvestimentAnalysisDetailUI'
import { InvestimentAnalysisUI } from '../../InvestimentModule/InvestimentAnalysisUI'
import { InvestimentUI } from '../../InvestimentModule/InvestimentUI'
import { TourUI } from '../../PresentationModule/TourUI'
import { FastAuthFailureUI } from '../../SecurityModule/FastAuthFailureUI'
import { FastAuthUI } from '../../SecurityModule/FastAuthUI'
import { LogInUI } from '../../SecurityModule/LogInUI'
import { StatementDetailUI } from '../../StatementModule/StatementDetailUI'
import { StatementUI } from '../../StatementModule/StatementUI'
import { StockTrackerWizardUI } from '../../StockTrackerModule/StockTrackerWizardUI'
import { Drawers, Routes, Stacks } from '../const'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const defaultOptions = {
    headerShown: false
}

export const Navigator: FC = () => {
    
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
                </Stack.Navigator>
            )
            break
            
        case "app":
            stackRoutes = (
                <Drawer.Navigator 
                    drawerContent={CustomDrawerContent}
                    drawerType="slide"
                    drawerPosition="right"
                    backBehavior="initialRoute">
                        
                    <Drawer.Screen 
                        name={Drawers.DASHBOARD}
                        options={menuOptions("dashboard", "settings", true)}
                        component={dashboard}/>

                    <Drawer.Screen
                        name={Drawers.INVESTIMENTS}
                        options={menuOptions("investiments", "settings")}
                        component={investiments}/>

                    <Drawer.Screen
                        name={Drawers.ANALYSIS}
                        options={menuOptions("analysis", "settings")}
                        component={investimentAnalysis}/>

                    <Drawer.Screen
                        name={Drawers.STATEMENTS}
                        options={menuOptions("statement", "settings")}
                        component={statements}/>

                    <Drawer.Screen
                        name={Drawers.ACTIVITIES}
                        options={menuOptions("activities", "settings")}
                        component={activities}/>

                    <Drawer.Screen
                        name={Drawers.BROKERS}
                        options={menuOptions("brokers", "settings")}
                        component={brokers}/>
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

const menuOptions = (label: string, icon: string, swipeable: boolean = false): DrawerNavigationOptions => {
    return {
        drawerLabel: props => <TypographyMedium {...props}>{label}</TypographyMedium>,
        drawerIcon: props => <BaseIcon {...props} name={icon} />,
        swipeEnabled: swipeable
    }
}

const CustomDrawerContent: FC<DrawerContentComponentProps> = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>
    )
}

const dashboard = () => (
    <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
        <Stack.Screen name={Routes.DASHBOARD} component={DashboardUI} options={defaultOptions}/>
        {/* <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.ADD_INVESTIMENT} component={AddInvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_FILTER} component={FilterUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_ANALYSIS} component={InvestimentAnalysisUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_ANALYSIS_DETAIL} component={InvestimentAnalysisDetailUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_PREVIEW} component={StockTrackerPreviewUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_REVIEW} component={StockTrackerReviewUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_SETTING} component={StockTrackerSettingUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_WIZARD} component={StockTrackerWizardUI} options={defaultOptions}/> */}
    </Stack.Navigator>
)

const investiments = () => (
    <Stack.Navigator initialRouteName={Routes.INVESTIMENT}>
        <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.ADD_INVESTIMENT} component={AddInvestimentUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.INVESTIMENT_FILTER} component={FilterUI} options={defaultOptions}/>
        <Stack.Screen name={Routes.STOCKTRACKER_WIZARD} component={StockTrackerWizardUI} options={defaultOptions}/>
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
    <Stack.Navigator>
        <Stack.Screen name={Routes.BROKER_ACCOUNT_WIZARD} component={BrokerAccountWizardUI} options={defaultOptions}/>
    </Stack.Navigator>
)

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