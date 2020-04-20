import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { Colors } from '../../../../core/Theme'
import { SplashAuth } from '../SplashAuth'
import { useFastAuthUIHook } from './FastAuthUIHook'

interface FastAuthUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const FastAuthUI: FC<FastAuthUIProps> = ({ navigation }) => {
    
    const { storage, authenticate, handleAuthFailure } = useFastAuthUIHook(navigation)
    
    return (
        <React.Fragment>
            <StatusBar backgroundColor={Colors.BLUES_1}/>
            <SplashAuth
                authenticating={authenticate}
                navigation={navigation}
                email={storage.email}
                password={storage.passwd}
                simulation={storage.simulation}
                keepSession={storage.keepSession === "yes"}
                onFail={handleAuthFailure}/>
        </React.Fragment>
    )
}