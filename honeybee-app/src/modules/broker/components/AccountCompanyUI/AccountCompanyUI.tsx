import { Broker } from 'urelax-api'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputOptions } from '../../../../ui/components/InputOptions'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { useAccountCompanyUIHook } from './AccountCompanyUIHook'
interface AccountCompanyUIProps {
    navigation: NavigationStackProp
}

export const AccountCompanyUI: FC<AccountCompanyUIProps> = ({ navigation }) => {
    
    const { brokers, brokerCode, fail, validForm, handleClose, handleButtonPress, handleOptionSelection } = useAccountCompanyUIHook(navigation)

    return (
        <FormLayout fail={fail}
            title={ts("add_broker_account")}
            normalText={ts("next")}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
    
            { !fail && <InputOptions
                loading={brokers.length === 0}
                selectedOption={brokerCode}
                horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("broker_company")}</SFormTitle>
                        <SFormDescription>{ts("broker_company_tip")}</SFormDescription>
                    </FormView>
                }
                onSelect={handleOptionSelection}
                renderOption={(broker: Broker) => ({ value: broker.code, body: broker.name })}
                shimmers={5}
                options={brokers}/>}
        </FormLayout>
    )
}