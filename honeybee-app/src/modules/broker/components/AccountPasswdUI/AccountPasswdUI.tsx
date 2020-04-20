import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { Colors } from '../../../../core/Theme'
import { InputText } from '../../../../ui/components/InputText'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountPasswdUIHook } from './AccountPasswdUIHook'

interface AccountPasswdUIProps {
    navigation: NavigationStackProp
}

export const AccountPasswdUI: FC<AccountPasswdUIProps> = ({ navigation }) => {

    const { formTitle, btnLabel, selectedValue, validForm, handleClose, handleValueChanges, handleButtonPress } = useAccountPasswdUIHook(navigation)
    return (
        <FormLayout
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
                
            <ScrollViewForm>
                <SFormTitle>{ts("broker_account_password")}</SFormTitle>
                <SFormDescription>{ts("broker_account_password_tip")}</SFormDescription>
                <InputText
                    value={selectedValue}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={handleValueChanges}/>
            </ScrollViewForm>
        </FormLayout>
    )
}