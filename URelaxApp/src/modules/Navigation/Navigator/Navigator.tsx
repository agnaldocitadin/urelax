import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Security from '../../Security'

const Stack = createStackNavigator()

export const Navigator: FC = () => {
    const stack = "auth" //Navigation.select("stack")

    let stackRoutes
    switch(stack) {

        case "auth":
            stackRoutes = (
                <>
                <Stack.Screen name="splash" component={Security.FastAuthUI} options={{
                    cardOverlayEnabled: false,
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent" }
                }}/>
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