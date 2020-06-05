import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Presentation from '../../Presentation'
import Security from '../../Security'
import { Routes, Stacks } from '../const'
import { select } from '../reducer'

const Stack = createStackNavigator()

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
                </>
            )
            break

        case "auth":
            stackRoutes = (
                <>
                    <Stack.Screen name={Routes.SPLASH} component={Security.FastAuthUI} options={{
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
                    <Stack.Screen name={Routes.TOUR} component={Presentation.TourUI} options={defaultOptions}/>
                    <Stack.Screen name={Routes.SIGNIN} component={Security.LogInUI} options={defaultOptions}/>
                </>
            )
            break
            
        case "app":
            stackRoutes = (
                <>
                </>
            )
            break
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { stackRoutes }
            </Stack.Navigator>
        </NavigationContainer>
    )
}