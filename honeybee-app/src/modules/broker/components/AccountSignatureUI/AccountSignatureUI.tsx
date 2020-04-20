import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputText } from '../../../../ui/components/InputText'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountSignatureUIHook } from './AccountSignatureUIHook'

interface AccountSignatureUIProps {
    navigation: NavigationStackProp
}

export const AccountSignatureUI: FC<AccountSignatureUIProps> = ({ navigation }) => {
    
    const { formTitle, btnLabel, selectedValue, validForm, handleClose, handleValueChanges, handleButtonPress } = useAccountSignatureUIHook(navigation)
    return (
        <FormLayout
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
                
            <ScrollViewForm>
                <SFormTitle>{ts("broker_account_signature")}</SFormTitle>
                <SFormDescription>{ts("broker_account_signature_tip")}</SFormDescription>
                <InputText
                    value={selectedValue}
                    autoCapitalize="words"
                    textContentType="name"
                    onChangeText={handleValueChanges}/>
            </ScrollViewForm>
        </FormLayout>
    )
}