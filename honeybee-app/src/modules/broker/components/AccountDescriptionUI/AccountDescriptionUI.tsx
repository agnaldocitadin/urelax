import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputText } from '../../../../ui/components/InputText'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountDescriptionUIHook } from './AccountDescriptionUIHook'

interface AccountDescriptionUIProps {
    navigation: NavigationStackProp
}

export const AccountDescriptionUI: FC<AccountDescriptionUIProps> = ({ navigation }) => {

    const { formTitle, btnLabel, selectedValue, validForm, handleClose, handleValueChanges, handleButtonPress } = useAccountDescriptionUIHook(navigation)
    
    return (
        <FormLayout
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
            
            <ScrollViewForm>
                <SFormTitle>{ts("broker_account_name")}</SFormTitle>
                <SFormDescription>{ts("broker_account_name_tip")}</SFormDescription>
                <InputText
                    value={selectedValue}
                    tip={ts("broker_account_name_msg")}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={handleValueChanges}/>
            </ScrollViewForm>
        </FormLayout>
    )
}