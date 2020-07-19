import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { TypographyMedium } from '../../../theming'
import { useBrokerAccountsUIHook } from './BrokerAccountsUIHook'

export const BrokerAccountsUI: FC = ({}) => {
    
    const { 
        accounts, 
        handleSelectBrokerAccount 
    } = useBrokerAccountsUIHook()

    return (
        <FlatLayout
            header={<BackHeader title={ts("broker_accounts")}/>}>
            { accounts.map(account => <TypographyMedium key={account._id} onPress={() => handleSelectBrokerAccount(account)}>{account.accountName}</TypographyMedium>) }
        </FlatLayout>
    )
}