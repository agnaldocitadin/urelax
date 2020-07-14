import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import { Colors, Typography } from '../../../theming'
import { SplashAuth } from '../SplashAuth'
import { useFastAuthUIHook } from './FastAuthUIHook'

interface FastAuthUIProps {}

export const FastAuthUI: FC<FastAuthUIProps> = () => {
    const { storage, authenticate, handleAuthSuccess, handleAuthFailure } = useFastAuthUIHook()
    return (
        <React.Fragment>
            <StatusBar backgroundColor={Colors.BLUES_1}/>
            <Typography>splash</Typography>
            <SplashAuth
                authenticating={authenticate}
                email={storage?.email}
                password={storage?.password}
                keepSession={storage?.keepSession === "yes"}
                onSuccess={handleAuthSuccess}
                onFail={handleAuthFailure}/>
        </React.Fragment>
    )
}