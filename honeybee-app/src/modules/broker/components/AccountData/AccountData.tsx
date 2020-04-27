import { format } from 'date-fns'
import { BrokerAccount, BrokerAccountExtraData } from 'honeybee-api'
import { utils } from 'js-commons'
import React from 'react'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { animatedCallback } from '../../../../hooks/Commons.hook'
import { Routes } from '../../../../navigations/Navigator'
import { Info } from '../../../../ui/components/Info'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { BROKER_FLOW_VIEW } from '../../constants'
import { getRoutes } from '../../reducer'

interface AccountDataProps {
    navigation: NavigationStackProp
    brokerAccount: BrokerAccount
    isReview: boolean
    noPadding?: boolean
}

export const AccountData = withNavigation(({ navigation, brokerAccount, isReview, noPadding }: AccountDataProps) => {

    const flow = { [BROKER_FLOW_VIEW]: getRoutes(brokerAccount.brokerCode) }
    const { cpf, signature, birthdate } = brokerAccount.extraData || {} as BrokerAccountExtraData
    const initialAmount = 0

    const handleDescription = animatedCallback(() => navigation.navigate(Routes.AccountDescriptionUI, flow))
    const handleCpf = animatedCallback(() => navigation.navigate(Routes.AccountCpfUI, flow))
    const handlePasswd = animatedCallback(() => navigation.navigate(Routes.AccountPasswdUI, flow))
    const handleBirthdate = animatedCallback(() => navigation.navigate(Routes.AccountBirthdateUI, flow))
    const handleSignature = animatedCallback(() => navigation.navigate(Routes.AccountSignatureUI, flow))

    return (
        <React.Fragment>
            {/* Commons */}
            <SInfo name="Corretora" value={brokerAccount.brokerCode} noPadding={noPadding}/>
            <SInfo name="Aporte inicial" value={utils.formatCurrency(initialAmount, { prefix: AppConfig.CURRENCY_PREFIX })} noPadding={noPadding}/>
            <SInfo name="Nome da conta" value={brokerAccount.accountName} onPress={handleDescription} disabled={isReview} noPadding={noPadding}/>

            {/* Extra data */}
            <SInfo name="CPF" value={utils.formatCPF(cpf)} onPress={handleCpf} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Senha" value={"****"} onPress={handlePasswd} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Data de nascimento" value={format(new Date(birthdate || 0), "dd/MM/yyyy")} onPress={handleBirthdate} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Assinatura eletrônica" value={signature} onPress={handleSignature} disabled={isReview} noPadding={noPadding}/>
        </React.Fragment>
    )
})

const SInfo: any = styled(Info)`
    padding-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    padding-right: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
`