import { Frequency, Strategy } from 'honeybee-api'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InputOptions, InputTextOption } from '../../../components/InputOptions'
import { InputSwitch } from '../../../components/InputSwitch'
import { InputText } from '../../../components/InputText'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { WizardView } from '../../../components/Wizard/WizardView'
import { WizardForm } from '../../../components/WizardForm'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Icons, TypographyMedium } from '../../../theming'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerWizardUIHook } from './StockTrackerWizardUIHook'

interface StockTrackerWizardProps {}

export const StockTrackerWizardUI: FC<StockTrackerWizardProps> = ({}) => {

    const { 
        idx,
        transient,
        frequencies,
        strategies,
        selectFrequency,
        selectStrategy,
        handleChangeAutoAmountLimit,
        handleChangeStockAmountLimit,
        handleProcessWizard
    } = useStockTrackerWizardUIHook()
    
    

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("stock_tracker_settings")}/>
            <WizardForm
                index={idx}
                onButtonPress={handleProcessWizard}>
                
                <WizardView icon="settings">
                    <Options
                        options={frequencies}
                        renderOption={(item: Frequency) => InputTextOption({ value: item._id, text: item.description })}
                        selectedOption={transient.frequency}
                        onSelect={selectFrequency}
                        header={
                            <MarginBox noMarginBottom noMarginTop>
                                <SFormTitle>{ts("stock_tracker_frequency")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_frequency_tip")}</SFormDescription>
                            </MarginBox>        
                        }/>
                </WizardView>

                <WizardView icon="settings">
                    <Options
                        options={strategies}
                        renderOption={(item: Strategy) => InputTextOption({ value: item._id, text: item.description }) }
                        selectedOption={transient.strategy}
                        onSelect={selectStrategy}
                        header={
                            <MarginBox noMarginBottom noMarginTop>
                                <SFormTitle>{ts("stock_tracker_strategy")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_strategy_tip")}</SFormDescription>
                            </MarginBox>
                        }/>
                </WizardView>

                <WizardView icon="settings">
                    <MarginBox noMarginTop>
                        <SFormTitle>{ts("stock_tracker_transaction_amount")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_transaction_amount_tip")}</SFormDescription>
                        <InputText
                            label="opao"
                            value={String(transient.strategySetting?.stockAmountLimit) || "0"}
                            autoCapitalize="words"
                            textContentType="name"
                            onChangeText={handleChangeStockAmountLimit}/>
                        
                        <OrElse>{ts("or_you_can")}</OrElse>
                        <InputSwitch 
                            label={ts("stock_tracker_auto_transaction_amount")}
                            value={transient.strategySetting?.autoAmountLimit}
                            onChange={handleChangeAutoAmountLimit}/>
                    </MarginBox>
                </WizardView>

                <WizardView icon="settings">
                    <ScrollViewForm>
                        <MarginBox noMarginTop>
                            <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                            <StockTrackerData stockTracker={transient} isReview={true}/>
                        </MarginBox>
                    </ScrollViewForm>
                </WizardView>

                <WizardView icon={Icons.CHECK_CIRCLE}>

                </WizardView>
            </WizardForm>
        </FlatLayout>
    )
}

const OrElse = styled(TypographyMedium)`
    margin: ${DEFAULT_VERTICAL_SPACING}px 0;
`

const Options = styled(InputOptions)`
    padding: 10px ${DEFAULT_HORIZONTAL_SPACING}px;
`