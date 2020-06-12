import { API } from 'honeybee-api'
import { useCallback, useEffect } from "react"
import actions from '../actions'
import { AuthenticateProps } from './Authenticate'

/**
 *
 *
 * @returns
 */
export const useAuthenticateHook = ({ email, password, authType, onSuccess, onFail, onComplete }: AuthenticateProps) => {

    const { setToken } = actions()

    const authenticateByEmailPassword = useCallback(async () => {
        try {
            let { profile, token } = await API.Security.authenticate(email, password)
            setToken(token)
            onSuccess && onSuccess(profile)
        }
        catch(e) {
            onFail && onFail(e)
        }
        finally {
            onComplete && onComplete()
        }
    }, [email, password])    

    useEffect(() => {
        switch (authType) {
            case "password":
                authenticateByEmailPassword()
                break

            case "fingerPrint":
                // TODO
                break
        }
    }, [])
    
}