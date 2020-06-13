import { Profile } from 'honeybee-api'
import { useEffect } from 'react'
import Identity from '..'
import Security from '../../Security'

export const useStartupHook = () => {
    const profile: Profile = Security.select("profile")
    const { setActiveAccount } = Identity.actions()
    useEffect(() => {
        if (profile) {
            const account = profile.accounts.find(account => account._id === profile.activeAccount)
            account && setActiveAccount(account)
        }
    }, [profile])
}