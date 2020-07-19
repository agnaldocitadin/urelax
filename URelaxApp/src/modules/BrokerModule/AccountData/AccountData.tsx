import { useNavigation } from '@react-navigation/native'
import { format } from 'date-fns'
import { BrokerAccount } from 'honeybee-api'
import React, { FC } from 'react'
import BrokerModule from '..'
import { Info } from '../../../components/Info'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { Typography } from '../../../theming'
import { BrokerAccountWizardViews } from '../const'

interface AccountDataProps {
    brokerAccount: BrokerAccount
    isReview?: boolean
}

export const AccountData: FC<AccountDataProps> = ({ brokerAccount, isReview }) => {

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
            <Info
                title={<Typography>{ts("account_name")}</Typography>}
                description={<Typography>{brokerAccount.accountName}</Typography>}
                onPress={handleDescription}/>

            { cpf && <Info
                title={<Typography>{ts("cpf")}</Typography>}
                description={<Typography>{cpf}</Typography>}
                onPress={handleCpf}/>}

            { signature && <Info
                title={<Typography>{ts("signature")}</Typography>}
                description={<Typography>{signature}</Typography>}
                onPress={handleSignature}/>}

            { password && <Info
                title={<Typography>{ts("password")}</Typography>}
                description={<Typography>{password}</Typography>}
                onPress={handlePassword}/>}

            { birthdate && <Info
                title={<Typography>{ts("birthdate")}</Typography>}
                description={<Typography>{format(new Date(birthdate), "dd/MM/yyyy")}</Typography>}
                onPress={handleBirthdate}/>}
            
            <Info
                title={<Typography>{ts("created_at")}</Typography>}
                description={<Typography>{format(new Date(brokerAccount.createdAt), "dd/MM/yyyy 'at' HH:mm")}</Typography>}/>
            
        </React.Fragment>
    )
}