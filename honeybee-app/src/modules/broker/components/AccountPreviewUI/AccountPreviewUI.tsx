import React, { FC } from 'react'
import { Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { BrokerImg } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { AccountData } from '../AccountData'
import { useAccountPreviewUIHook } from './AccountPreviewUIHook'

interface AccountPreviewUIProps {}

export const AccountPreviewUI: FC<AccountPreviewUIProps> = () => {
    const { brokerAccount } = useAccountPreviewUIHook()
    return (
        <FlatLayout>
            <BackHeader title={ts("broker_accounts")}/>
            <ScrollView>
                <BrokerLogo source={BrokerImg[brokerAccount.brokerCode]}/>
                <AccountData isReview={false} brokerAccount={brokerAccount}/>
            </ScrollView>
        </FlatLayout>
    )
}

const BrokerLogo = styled(Image)`
    width: 100px;
    height: 100px;
    margin: 20px auto;
`