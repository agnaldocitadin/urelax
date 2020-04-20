import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputDatetime } from '../../../../ui/components/InputDatetime'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountBirthdateUIHook } from './AccountBirthdateUIHook'

interface AccountBirthdateUIProps {
    navigation: NavigationStackProp
}

export const AccountBirthdateUI: FC<AccountBirthdateUIProps> = ({ navigation }) => {
    
    const { formTitle, btnLabel, selectedValue, validForm, handleClose, handleValueChanges, handleButtonPress } = useAccountBirthdateUIHook(navigation)

    return (
        <FormLayout
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
                
            <ScrollViewForm>
                <SFormTitle>{ts("broker_account_birthdate")}</SFormTitle>
                <SFormDescription>{ts("broker_account_birthdate_tip")}</SFormDescription>
                <InputDatetime initValue={selectedValue} onChange={handleValueChanges}/>
            </ScrollViewForm>
        </FormLayout>
    )
}