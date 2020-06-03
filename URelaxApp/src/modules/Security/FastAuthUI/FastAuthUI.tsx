import React, { FC } from 'react'
import { StatusBar, Text } from 'react-native'
import { Colors } from '../../../theming'
import { SplashAuth } from '../SplashAuth'
import { useFastAuthUIHook } from './FastAuthUIHook'

interface FastAuthUIProps {}

export const FastAuthUI: FC<FastAuthUIProps> = () => {
    
    const { storage, authenticate, handleAuthFailure } = useFastAuthUIHook()
    
    return (
        <React.Fragment>
            <StatusBar backgroundColor={Colors.BLUES_1}/>
            <Text>splash</Text>
            <SplashAuth
                authenticating={authenticate}
                email={storage?.email}
                password={storage?.password}
                keepSession={storage?.keepSession === "yes"}
                onFail={handleAuthFailure}/>
        </React.Fragment>
    )
}