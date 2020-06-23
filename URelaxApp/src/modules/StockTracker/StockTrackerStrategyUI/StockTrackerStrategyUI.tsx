import React, { FC } from 'react'
import { InputOptions } from '../../../components/InputOptions'
import { FormLayout } from '../../../components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { useStockTrackerStrategyUIHook } from './StockTrackerStrategyUIHook'

interface StockTrackerStrategyUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerStrategyUI: FC<StockTrackerStrategyUIProps> = ({}) => {
    
    const { 
        selectedValue, 
        strategies, 
        formTitle, 
        btnLabel, 
        validForm,
        fail,
        handleClose, 
        // handleValueChanges, 
        // handleButtonPress 
    } = useStockTrackerStrategyUIHook()

    return (
        <FormLayout
            data={{}}
            title={formTitle}
            // onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>

            { !fail && <InputOptions
                loading={strategies.length === 0}
                shimmers={1}
                // horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_strategy")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_strategy_tip")}</SFormDescription>
                    </FormView>
                }
                options={strategies}
                renderOption={(strategy) => ({ value: strategy, body: ts(strategy) })}
                selectedOption={selectedValue}
                // onSelect={handleValueChanges}
                />}
        </FormLayout>
    )
}