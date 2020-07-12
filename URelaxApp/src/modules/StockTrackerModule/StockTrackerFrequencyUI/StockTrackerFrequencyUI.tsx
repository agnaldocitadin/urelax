import React, { FC } from 'react'
import { InputOptions } from '../../../components/Inputs/InputOptions'
import { FormLayout } from '../../../components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { useStockTrackerFrequencyUIHook } from './StockTrackerFrequencyUIHook'

interface StockTrackerFrequencyUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerFrequencyUI: FC<StockTrackerFrequencyUIProps> = ({}) => {
    
    const { 
        selectedValue, 
        frequencies, 
        formTitle, 
        btnLabel, 
        validForm,
        fail,
        handleClose, 
        handleValueChanges, 
        handleButtonPress 
    } = useStockTrackerFrequencyUIHook()

    return (
        <FormLayout
            data={{}}
            title={formTitle}
            // normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>

            { !fail && <InputOptions
                loading={frequencies.length === 0}
                // horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_frequency")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_frequency_tip")}</SFormDescription>
                    </FormView>
                }
                options={frequencies}
                renderOption={(frequency) => ({ value: frequency, body: ts(frequency) })}
                selectedOption={selectedValue}
                onSelect={handleValueChanges}/>}
        </FormLayout>
    )
}
