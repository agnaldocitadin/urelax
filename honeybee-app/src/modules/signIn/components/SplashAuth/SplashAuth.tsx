import { UserAccount } from 'honeybee-api'
import { View } from 'native-base'
import React, { FC, ReactElement } from 'react'
import { ActivityIndicator } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { Colors } from '../../../../core/Theme'
import { Authenticate } from '../../../security'
import { useSplashAuthHook } from './SplashAuthHook'

export interface SplashAuthProps {
    navigation: NavigationStackProp
    email?: string
    password?: string
    simulation?: boolean
    keepSession?: boolean
    authenticating: boolean
    noAuthElement?: ReactElement
    onSuccess?(account: UserAccount): void
    onFail?(error: any): void
}

export const SplashAuth: FC<SplashAuthProps> = (props) => {
    const { email, password, simulation = false, authenticating, noAuthElement } = props
    const { onAuthenticationSuccess, onAuthenticationFail } = useSplashAuthHook(props)
    return (
        <React.Fragment>
            { authenticating ? <React.Fragment>
                <SplashView>
                    <ActivityIndicator size="large" color={Colors.WHITE}/>
                </SplashView>
                <Authenticate
                    authType="password"
                    email={email}
                    password={password}
                    simulation={simulation}
                    onSuccess={onAuthenticationSuccess}
                    onFail={onAuthenticationFail}/>
            </React.Fragment> : noAuthElement }
        </React.Fragment>
    )
}

const SplashView = styled(View)`
    background-color: ${Colors.BLUES_1};
    align-items: center;
    justify-content: center;
    flex: 1;
`