import { useNavigation } from '@react-navigation/native'
import { BrokerAccount, BrokerAccountExtraData } from 'honeybee-api'
import React, { FC } from 'react'
import { animatedCallback } from '../../../core/Commons.hook'

interface AccountDataProps {
    brokerAccount: BrokerAccount
    isReview: boolean
}

export const AccountData: FC<AccountDataProps> = ({ brokerAccount, isReview }) => {

    const { cpf, signature, birthdate } = brokerAccount.extraData || {} as BrokerAccountExtraData
    const initialAmount = 0

    const navigation = useNavigation()
    const handleDescription = animatedCallback(() => {})
    const handleCpf = animatedCallback(() => {})
    const handlePasswd = animatedCallback(() => {})
    const handleBirthdate = animatedCallback(() => {})
    const handleSignature = animatedCallback(() => {})

    return (
        <React.Fragment>
            {/* Commons */}
            {/* <Info name="Corretora" value={brokerAccount.brokerCode} noPadding={noPadding}/>
            <Info name="Aporte inicial" value={utils.formatCurrency(initialAmount, { prefix: AppConfig.CURRENCY_PREFIX })} noPadding={noPadding}/>
            <Info name="Nome da conta" value={brokerAccount.accountName} onPress={handleDescription} disabled={isReview} noPadding={noPadding}/> */}

            {/* Extra data */}
            {/* <Info name="CPF" value={utils.formatCPF(cpf)} onPress={handleCpf} disabled={isReview} noPadding={noPadding}/>
            <Info name="Senha" value={"****"} onPress={handlePasswd} disabled={isReview} noPadding={noPadding}/>
            <Info name="Data de nascimento" value={format(new Date(birthdate || 0), "dd/MM/yyyy")} onPress={handleBirthdate} disabled={isReview} noPadding={noPadding}/>
            <Info name="Assinatura eletrônica" value={signature} onPress={handleSignature} disabled={isReview} noPadding={noPadding}/> */}
        </React.Fragment>
    )
}