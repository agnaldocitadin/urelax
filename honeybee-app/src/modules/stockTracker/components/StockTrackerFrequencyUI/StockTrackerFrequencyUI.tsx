import { Frequency } from 'urelax-api'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputOptions } from '../../../../ui/components/InputOptions'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { useStockTrackerFrequencyUIHook } from './StockTrackerFrequencyUIHook'

interface StockTrackerFrequencyUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerFrequencyUI: FC<StockTrackerFrequencyUIProps> = ({ navigation }) => {
    
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
    } = useStockTrackerFrequencyUIHook(navigation)

    return (
        <FormLayout 
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>

            { !fail && <InputOptions
                loading={frequencies.length === 0}
                horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_frequency")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_frequency_tip")}</SFormDescription>
                    </FormView>
                }
                options={frequencies}
                renderOption={(frequency: Frequency) => ({ value: frequency, body: frequency.description })}
                selectedOption={selectedValue}
                onSelect={handleValueChanges}/>}
        </FormLayout>
    )
}
