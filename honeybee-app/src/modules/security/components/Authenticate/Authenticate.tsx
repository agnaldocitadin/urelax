import { UserAccount } from 'urelax-api'
import { FC } from 'react'
import { useAuthenticateHook } from './AuthenticateHook'

export interface AuthenticateProps {
    authType: "password" | "fingerPrint"
    email?: string
    password?: string
    simulation: boolean
    onSuccess?(account: UserAccount): void
    onFail?(error: any): void
    onComplete?(): void
}

export const Authenticate: FC<AuthenticateProps> = (props) => {
    useAuthenticateHook(props)
    return null
}


