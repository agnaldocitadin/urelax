import { Stock } from 'honeybee-api'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputOptions } from '../../../../ui/components/InputOptions'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { useStockTrackerSymbolUIHook } from './StockTrackerSymbolUIHook'

interface StockTrackerSymbolUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerSymbolUI: FC<StockTrackerSymbolUIProps> = ({ navigation }) => {

    const { 
        stocks, 
        selectedValue, 
        formTitle, 
        btnLabel, 
        validForm, 
        fail,
        handleClose, 
        handleValueChanges, 
        handleButtonPress 
    } = useStockTrackerSymbolUIHook(navigation)

    return (
        <FormLayout 
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>
            
            { !fail && <InputOptions
                loading={stocks.length === 0}
                selectedOption={selectedValue}
                horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_symbol")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_symbol_tip")}</SFormDescription>
                    </FormView>
                }
                options={stocks}
                renderOption={(stock: Stock) => ({
                    value: stock, 
                    body: `${stock.description} (${stock.symbol})` 
                })}
                onSelect={handleValueChanges}/>}
        </FormLayout>
    )
}