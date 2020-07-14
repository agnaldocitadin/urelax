import { Profile } from 'honeybee-api'
import { FC, useEffect } from 'react'
import Identity from '..'
import Security from '../../SecurityModule'

export const IdentityStartup: FC = () => {
    const profile: Profile = Security.select("profile")
    const { setActiveAccount } = Identity.actions()
    useEffect(() => {
        if (profile) {
            const account = profile.accounts.find(account => account._id === profile.activeAccount)
            account && setActiveAccount(account)
        }
    }, [profile])
    return null
}