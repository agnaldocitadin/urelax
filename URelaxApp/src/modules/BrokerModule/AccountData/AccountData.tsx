import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { BrokerAccount } from 'urelax-api'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import BrokerModule from '..'
import { Info } from '../../../components/Info'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, Typography } from '../../../theming'
import { BrokerAccountWizardViews } from '../const'

interface AccountDataProps {
    brokerAccount: BrokerAccount
    isReview?: boolean
}

export const AccountData: FC<AccountDataProps> = ({ brokerAccount, isReview = false }) => {

    const {
        cpf,
        signature,
        birthdate,
        password
    } = brokerAccount.extraData || {}

    const navigation = useNavigation()
    const { editBrokerAccountData } = BrokerModule.actions()
    const handleDescription = animatedCallback(() => editBrokerAccountData(BrokerAccountWizardViews.DESCRIPTION, navigation))
    const handleCpf = animatedCallback(() => editBrokerAccountData(BrokerAccountWizardViews.CPF, navigation))
    const handlePassword = animatedCallback(() => editBrokerAccountData(BrokerAccountWizardViews.PASSWORD, navigation))
    const handleBirthdate = animatedCallback(() => editBrokerAccountData(BrokerAccountWizardViews.BIRTHDATE, navigation))
    const handleSignature = animatedCallback(() => editBrokerAccountData(BrokerAccountWizardViews.SIGNATURE, navigation))

    return (
        <React.Fragment>
            <AccountInfo
                isReview={isReview}
                title={<Title>{ts("broker_account_name")}</Title>}
                description={<Description>{brokerAccount.accountName}</Description>}
                onPress={!isReview ? handleDescription : undefined}/>

            { cpf && <AccountInfo
                isReview={isReview}
                title={<Title>{ts("broker_account_cpf")}</Title>}
                description={<Description>{cpf}</Description>}
                onPress={!isReview ? handleCpf : undefined}/>}

            { signature && <AccountInfo
                isReview={isReview}
                title={<Title>{ts("broker_account_signature")}</Title>}
                description={<Description>{signature}</Description>}
                onPress={!isReview ? handleSignature : undefined}/>}

            { password && <AccountInfo
                isReview={isReview}
                title={<Title>{ts("broker_account_password")}</Title>}
                description={<Description>{password}</Description>}
                onPress={!isReview ? handlePassword : undefined}/>}

            { birthdate && <AccountInfo
                isReview={isReview}
                title={<Title>{ts("broker_account_birthdate")}</Title>}
                description={<Description>{format(new Date(birthdate), "dd/MM/yyyy")}</Description>}
                onPress={!isReview ? handleBirthdate : undefined}/>}
            
            { brokerAccount.createdAt && <AccountInfo
                title={<Title>{ts("created_at")}</Title>}
                description={<Description>{format(new Date(brokerAccount.createdAt), "dd/MM/yyyy 'at' HH:mm")}</Description>}/>}
            
        </React.Fragment>
    )
}

const AccountInfo = styled(Info)<{ isReview?: boolean }>`
    padding-left: ${({ isReview }) => isReview ? 0 : DEFAULT_HORIZONTAL_SPACING}px;
    padding-right: ${({ isReview }) => isReview ? 0 : DEFAULT_HORIZONTAL_SPACING}px;
`

const Title = styled(Typography)`
    color: ${Colors.GRAY_1};
`

const Description = styled(Typography)`
    font-size: 14px;
`