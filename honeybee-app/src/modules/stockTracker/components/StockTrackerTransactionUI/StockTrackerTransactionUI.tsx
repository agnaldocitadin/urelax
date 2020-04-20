import React, { FC } from 'react'
import { Text } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, Theme } from '../../../../core/Theme'
import { InputSwitch } from '../../../../ui/components/InputSwitch'
import { InputText } from '../../../../ui/components/InputText'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useStockTrackerTransactionUIHook } from './StockTrackerTransactionUIHook'

interface StockTrackerTransactionUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerTransactionUI: FC<StockTrackerTransactionUIProps> = ({ navigation }) => {
    
    const {
        selectedValue,
        autoLimit,
        formTitle, 
        btnLabel, 
        validForm, 
        handleClose, 
        handleValueChanges, 
        handleButtonPress,
        handleAutoLimit
    } = useStockTrackerTransactionUIHook(navigation)

    return (
        <FormLayout 
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
            
            <ScrollViewForm>
                <SFormTitle>{ts("stock_tracker_transaction_amount")}</SFormTitle>
                <SFormDescription>{ts("stock_tracker_transaction_amount_tip")}</SFormDescription>
                <InputText
                    value={selectedValue}
                    autoCapitalize="words"
                    textContentType="name"
                    textSize={20}
                    tip={ts("stock_tracker_transaction_amount_eg")}
                    onChangeText={handleValueChanges}
                    includeRawValueInChangeText
                    type="money"
                    options={{
                        delimiter: ".",
                        precision: 2,
                        unit: `${AppConfig.CURRENCY_PREFIX} `,
                    }}/>
                
                <Or>{ts("or_you_can")}</Or>
                <InputSwitch text={ts("stock_tracker_auto_transaction_amount")} value={autoLimit} onChange={handleAutoLimit}/>
            </ScrollViewForm>
            
        </FormLayout>
    )
}

const Or = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.BLUES_4};
    font-size: 16px;
    margin: 15px 0;
`