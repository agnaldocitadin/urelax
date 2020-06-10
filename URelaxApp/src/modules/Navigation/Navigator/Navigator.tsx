// import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import { DashboardUI } from '../../Dashboard/DashboardUI'
import { InvestimentUI } from '../../Investiment/InvestimentUI'
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
                <>
                    <Stack.Screen name={Routes.AUTH_FAILURE} component={FastAuthFailureUI} options={defaultOptions}/>
                </>
            )
            break

        case "auth":
            stackRoutes = (
                <>
                    <Stack.Screen name={Routes.SPLASH} component={FastAuthUI} options={{
                        ...defaultOptions,
                        cardOverlayEnabled: false,
                        cardStyle: { backgroundColor: "transparent" }
                    }}/>
                </>
            )
            break
        
        case "welcome":
            stackRoutes = (
                <>
                    <Stack.Screen name={Routes.TOUR} component={TourUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.SIGNIN} component={LogInUI} options={defaultOptions}/>
                </>
            )
            break
            
        case "app":
            stackRoutes = (
                <>
                    <Stack.Screen name={Routes.DASHBOARD} component={DashboardUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.INVESTIMENT} component={InvestimentUI} options={defaultOptions}/>
                </>
            )
            break
    }

    return (
        <NavigationContainer>
            <Stack.Navigator >
                { stackRoutes }
            </Stack.Navigator>
        </NavigationContainer>
    )
}