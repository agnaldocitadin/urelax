// import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import { ActivityListUI } from '../../ActivityHistory/ActivityListUI'
import { DashboardUI } from '../../Dashboard/DashboardUI'
import { SignUpUI } from '../../Identity/SignUpUI'
import { AddInvestimentUI } from '../../Investiment/AddInvestimentUI/AddInvestimentUI'
import { InvestimentAnalysisUI } from '../../Investiment/InvestimentAnalysisUI/InvestimentAnalysisUI'
import { InvestimentUI } from '../../Investiment/InvestimentUI'
import { StatementDetailUI } from '../../Investiment/StatementDetailUI'
import { StatementUI } from '../../Investiment/StatementUI'
import { TourUI } from '../../Presentation/TourUI'
import { FastAuthFailureUI } from '../../Security/FastAuthFailureUI'
import { FastAuthUI } from '../../Security/FastAuthUI'
import { LogInUI } from '../../Security/LogInUI'
import { Routes, Stacks } from '../const'
import { select } from '../reducer'

const Stack = createStackNavigator()
// const Stack = createDrawerNavigator()

const defaultOptions = {
    headerShown: false
}

export const Navigator: FC = () => {
    const selectedStack: Stacks = select("stack")

    let stackRoutes
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
                <Stack.Navigator initialRouteName={Routes.DASHBOARD}>
                    <Stack.Screen name={Routes.DASHBOARD} component={DashboardUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.ACTIVITY_LIST} component={ActivityListUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.SIGN_UP} component={SignUpUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.INVESTIMENT_ANALYSIS} component={InvestimentAnalysisUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.ADD_INVESTIMENT} component={AddInvestimentUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.STATEMENT} component={StatementUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.STATEMENT_DETAIL} component={StatementDetailUI} options={defaultOptions}/>
                </Stack.Navigator>
            )
            break
    }

    return (
        <NavigationContainer>
            { stackRoutes }
        </NavigationContainer>
    )
}