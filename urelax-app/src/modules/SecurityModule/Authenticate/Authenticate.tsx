import { Profile } from 'urelax-api'
import { FC } from 'react'
import { useAuthenticateHook } from './AuthenticateHook'

export interface AuthenticateProps {
    authType: "password" | "fingerPrint"
    email?: string
    password?: string
    onSuccess?(profile: Profile): void
    onFail?(error: any): void
    onComplete?(): void
}

export const Authenticate: FC<AuthenticateProps> = (props) => {
    useAuthenticateHook(props)
    return null
}


