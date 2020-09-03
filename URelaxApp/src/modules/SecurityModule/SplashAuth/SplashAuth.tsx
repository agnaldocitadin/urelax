import { Profile } from 'honeybee-api'
import React, { FC, ReactElement } from 'react'
import { ActivityIndicator } from 'react-native'
import { Authenticate } from '../Authenticate'
import { useSplashAuthHook } from './SplashAuthHook'
import styled from 'styled-components'
import { Colors } from '../../../theming'

export interface SplashAuthProps {
    email?: string
    password?: string
    keepSession?: boolean
    authenticating: boolean
    noAuthElement?: ReactElement
    onSuccess?(profile: Profile): void
    onFail?(error: any): void
}

export const SplashAuth: FC<SplashAuthProps> = (props) => {
    const { email, password, authenticating, noAuthElement } = props
    const { onAuthenticationSuccess, onAuthenticationFail } = useSplashAuthHook(props)
    return (
        <React.Fragment>
            { authenticating ? <React.Fragment>
                <Indicator size="large" color={Colors.WHITE}/>
                <Authenticate
                    authType="password"
                    email={email}
                    password={password}
                    onSuccess={onAuthenticationSuccess}
                    onFail={onAuthenticationFail}/>
            </React.Fragment> : noAuthElement }
        </React.Fragment>
    )
}

const Indicator = styled(ActivityIndicator)`
    top: 60%;
`