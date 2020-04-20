import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputText } from '../../../../ui/components/InputText'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountCpfUIHook } from './AccountCpfUIHook'

interface AccountCpfUIProps {
    navigation: NavigationStackProp
}

export const AccountCpfUI: FC<AccountCpfUIProps> = ({ navigation }) => {

    const { formTitle, btnLabel, selectedValue, validForm, handleClose, handleValueChanges, handleButtonPress } = useAccountCpfUIHook(navigation)

    return (
        <FormLayout 
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
            
            <ScrollViewForm>
                <SFormTitle>{ts("broker_account_cpf")}</SFormTitle>
                <SFormDescription>{ts("broker_account_cpf_tip")}</SFormDescription>
                <InputText
                    keyboardType="numeric"
                    value={selectedValue}
                    autoCapitalize="words"
                    textContentType="name"
                    maxLength={14}
                    options={{ mask: "999.999.999-99" }}
                    onChangeText={handleValueChanges}/>
            </ScrollViewForm>
        </FormLayout>
    )
}