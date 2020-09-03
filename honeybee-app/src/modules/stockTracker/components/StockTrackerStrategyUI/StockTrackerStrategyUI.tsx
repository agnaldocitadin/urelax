import { Strategy } from 'urelax-api'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { InputOptions } from '../../../../ui/components/InputOptions'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../../ui/components/Layout/Layout.style'
import { useStockTrackerStrategyUIHook } from './StockTrackerStrategyUIHook'

interface StockTrackerStrategyUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerStrategyUI: FC<StockTrackerStrategyUIProps> = ({ navigation }) => {
    
    const { 
        selectedValue, 
        strategies, 
        formTitle, 
        btnLabel, 
        validForm,
        fail,
        handleClose, 
        handleValueChanges, 
        handleButtonPress 
    } = useStockTrackerStrategyUIHook(navigation)

    return (
        <FormLayout
            title={formTitle}
            normalText={btnLabel}
            onProcess={handleButtonPress}
            onClose={handleClose}
            disabled={!validForm}
            fail={fail}>

            { !fail && <InputOptions
                loading={strategies.length === 0}
                shimmers={1}
                horizontalOptionPadding={20}
                header={
                    <FormView>
                        <SFormTitle>{ts("stock_tracker_strategy")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_strategy_tip")}</SFormDescription>
                    </FormView>
                }
                options={strategies}
                renderOption={(strategy: Strategy) => ({ value: strategy, body: strategy.description })}
                selectedOption={selectedValue}
                onSelect={handleValueChanges}/>}
        </FormLayout>
    )
}