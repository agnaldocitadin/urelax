import { API } from 'honeybee-api'
import { useCallback, useEffect } from "react"
import Security from '..'
import { AuthenticateProps } from './Authenticate'

/**
 *
 *
 * @returns
 */
export const useAuthenticateHook = ({ email, password, authType, onSuccess, onFail, onComplete }: AuthenticateProps) => {

    const { setToken, setProfile } = Security.actions()

    const authenticateByEmailPassword = useCallback(async () => {
        try {
            let { profile, token } = await API.Security.authenticate(email, password)
            setToken(token)
            setProfile(profile)
            onSuccess && onSuccess(profile)
        }
        catch(e) {
            console.warn(e)
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
                // Not implemented yet
                break
        }
    }, [])
    
}