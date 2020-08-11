import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { AccountData } from '../AccountData'
import { useBrokerAccountDetailUIHook } from './BrokerAccountDetailUIHook'

export const BrokerAccountDetailUI: FC = ({}) => {
    
    const { 
        account, 
    } = useBrokerAccountDetailUIHook()

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={ts("broker_account_detail")}/>}>
            <AccountData brokerAccount={account}/>
        </FlatLayout>
    )
}