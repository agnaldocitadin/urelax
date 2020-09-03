import { API } from 'urelax-api'
import { useCallback, useEffect } from "react"
import { AuthenticateProps } from './Authenticate'

/**
 *
 *
 * @returns
 */
export const useAuthenticateHook = ({ email, password, simulation, authType, onSuccess, onFail, onComplete }: AuthenticateProps) => {

    const authenticateByEmailPassword = useCallback(async () => {
        try {
            let { user, token } = await API.authenticate(email, password, simulation)
            onSuccess && onSuccess(user)
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