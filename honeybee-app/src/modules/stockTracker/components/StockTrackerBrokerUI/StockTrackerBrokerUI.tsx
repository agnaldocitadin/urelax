import { BrokerAccount } from 'honeybee-api'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputOptions } from '../../../../ui/components/InputOptions'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { useStockTrackerBrokerUIHook } from './StockTrackerBrokerUIHook'

interface StockTrackerBrokerUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerBrokerUI: FC<StockTrackerBrokerUIProps> = ({ navigation }) => {
    
    const { 
        brokerAccounts, 
        selectedValue, 
        formTitle, 
        btnLabel, 
        validForm,
        fail,
        handleClose, 
        handleValueChanges, 
        handleButtonPress 
    } = useStockTrackerBrokerUIHook(navigation)
    
    return (
        <FormLayout 
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>
            
            { !fail && <InputOptions
                loading={brokerAccounts.length === 0}
                shimmers={7}
                selectedOption={selectedValue}
                horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_broker")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_broker_tip")}</SFormDescription>
                    </FormView>
                }
                onSelect={handleValueChanges}
                renderOption={(account: BrokerAccount) => ({ value: account, body: `(${account.brokerCode}) ${account.accountName}` })}
                options={brokerAccounts}/>}
        </FormLayout>
    )
}