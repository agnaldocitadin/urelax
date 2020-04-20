import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { Colors } from '../../../../core/Theme'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { AccountData } from '../AccountData'
import { useAccountReviewUIHook } from './AccountReviewUIHook'

interface AccountReviewUIProps {
    navigation: NavigationStackProp
}

export const AccountReviewUI: FC<AccountReviewUIProps> = ({ navigation }) => {
    const { account, handleSaveBrokerAccount, handleClose } = useAccountReviewUIHook(navigation)
    return (
        <FormLayout
            title={ts("add_broker_account")}
            normalText={ts("create_broker_account")}
            onProcess={handleSaveBrokerAccount}
            onClose={handleClose}>
            <ScrollViewForm>
                <SFormDescription>Confira os dados da sua conta na corretora Clear. Caso tenha alguma informação que deseja alterar, você poderá voltar nas telas.</SFormDescription>
                <AccountData isReview={true} brokerAccount={account} noPadding/>
            </ScrollViewForm>
        </FormLayout>
    )
}