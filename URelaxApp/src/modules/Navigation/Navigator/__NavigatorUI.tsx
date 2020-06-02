import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

const Home = () => {
    const nav = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: "blue" }}>
            <Text onPress={() => nav.navigate("Vi2")}>Home</Text>
        </View>
    )
}
const Vi2 = () => {
    const nav = useNavigation()
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text onPress={() => nav.navigate("Vi3")} >Vi2</Text>
        </View>
    )
}
const Vi3 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "green" }}>
            <Text>Vi3</Text>
        </View>
    )
}

const Signin = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <Text>Sign In</Text>
        </View>
    )
}

const Splash = () => {
    return (
        <View>
            {/* <Text>Splash</Text> */}
        </View>
    )
}

// const Root = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen name="BB" component={BB} />
//         </Stack.Navigator>
//     )
// }

export const NavigatorUI: FC = () => {
    const [ loading, setLoading ] = useState(true)
    const [ token, setToken ] = useState(false)
    const [ signout, setSignout ] = useState(false)
    const StackA = createStackNavigator()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        setTimeout(() => {
            setToken(true)
        }, 7000)

        // setTimeout(() => {
        //     setToken(false)
        //     setSignout(true)
        // }, 10000)
    }, [])

    return (
        <NavigationContainer>
            <StackA.Navigator>
                { loading && <StackA.Screen name="Splash" component={Splash} options={{ 
                    // animationTypeForReplace: "pop",
                    headerShown: false,
                    // cardShadowEnabled: false,
                    // cardOverlay: undefined,
                    cardOverlayEnabled: false,
                    cardStyle: { backgroundColor: "transparent" }
                    
                }} /> }
                { !token ? (
                    <StackA.Screen name="AA" component={Signin} options={{
                        title: "Sign in",
                        // animationTypeForReplace: "pop",
                        headerShown: false
                    }}/>
                ) : (
                    <>
                    <StackA.Screen name="Home" component={Home} />
                    <StackA.Screen name="Vi2" component={Vi2} />
                    <StackA.Screen name="Vi3" component={Vi3} />
                    </>
                ) }
            </StackA.Navigator>
        </NavigationContainer>
    )
}