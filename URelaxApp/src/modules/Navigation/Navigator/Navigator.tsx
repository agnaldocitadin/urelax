import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Navigation from '..'
import { Security } from '../..'

const Stack = createStackNavigator()

export const Navigator: FC = () => {
    const stack = Navigation.select("stack")

    let stackRoutes
    switch(stack) {

        case "auth":
            stackRoutes = (
                <>
                <Stack.Screen name="splash" component={Security.FastAuthUI} />
                <Stack.Screen name="login" component={Security.LogInUI} />
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