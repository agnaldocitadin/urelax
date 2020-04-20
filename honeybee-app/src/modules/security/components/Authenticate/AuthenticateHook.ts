import { API, UserAccount } from 'honeybee-api'
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
            let userAccount: UserAccount = await API.authenticate(email, password, simulation)
            onSuccess && onSuccess(userAccount)
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