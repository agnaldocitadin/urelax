import { UserAccount } from 'honeybee-api'
import React, { FC, ReactElement } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
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