import React, { FC } from 'react'
import { InputSwitch } from '../../../components/InputSwitch'
import { InputText } from '../../../components/InputText'
import { FormLayout } from '../../../components/Layout/FormLayout'
import { SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { TypographyMedium } from '../../../theming'
import { useStockTrackerTransactionUIHook } from './StockTrackerTransactionUIHook'

interface StockTrackerTransactionUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerTransactionUI: FC<StockTrackerTransactionUIProps> = ({}) => {
    
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
    } = useStockTrackerTransactionUIHook()

    return (
        <FormLayout
            data={{
                text: btnLabel,
                disabled: false
            }}
            title={formTitle}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}>
            
            <ScrollViewForm>
                <SFormTitle>{ts("stock_tracker_transaction_amount")}</SFormTitle>
                <SFormDescription>{ts("stock_tracker_transaction_amount_tip")}</SFormDescription>
                <InputText
                    label="opao"
                    value={selectedValue}
                    autoCapitalize="words"
                    textContentType="name"
                    // textSize={20}
                    // tip={ts("stock_tracker_transaction_amount_eg")}
                    onChangeText={handleValueChanges}
                    // includeRawValueInChangeText
                    // type="money"
                    // options={{
                    //     delimiter: ".",
                    //     precision: 2,
                    //     unit: `${AppConfig.CURRENCY_PREFIX} `,
                    // }}
                    />
                
                <TypographyMedium>{ts("or_you_can")}</TypographyMedium>
                <InputSwitch label={ts("stock_tracker_auto_transaction_amount")} value={autoLimit} onChange={handleAutoLimit}/>
            </ScrollViewForm>
            
        </FormLayout>
    )
}