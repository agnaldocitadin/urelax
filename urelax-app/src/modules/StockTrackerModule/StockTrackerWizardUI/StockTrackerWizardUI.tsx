import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Frequency, Strategy } from 'urelax-api'
import { BackHeader } from '../../../components/Header/BackHeader'
import { CurrencyInput } from '../../../components/Inputs/CurrencyInput'
import { InputOptions, InputTextOption } from '../../../components/Inputs/InputOptions'
import { InputSwitch } from '../../../components/Inputs/InputSwitch'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { GenericTextIcon, MarginBox, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { WizardView } from '../../../components/Wizard/WizardView'
import { WizardForm } from '../../../components/WizardForm'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Icons, TypographyMedium } from '../../../theming'
import { StockTrackerWizardViews } from '../const'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerWizardUIHook } from './StockTrackerWizardUIHook'

interface StockTrackerWizardProps {}

export const StockTrackerWizardUI: FC<StockTrackerWizardProps> = ({}) => {

    const {
        sequence,
        titleDone,
        messageDone,
        transient,
        frequencies,
        strategies,
        loading,
        fail,
        btnFormData,
        selectFrequency,
        selectStrategy,
        handleChangeAutoAmountLimit,
        handleChangeStockAmountLimit,
        handleFinish,
        handleValidation,
        handleFlowEnded,
        handleDisableButton
    } = useStockTrackerWizardUIHook()

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            loading={loading}
            fail={fail}
            header={<BackHeader title={ts("stock_tracker_settings")}/>}>
            
            <WizardForm
                sequence={sequence}
                finishViewName={String(StockTrackerWizardViews.DONE)}
                onFinish={handleFinish}
                onValidate={handleValidation}
                onFlowEnded={handleFlowEnded}
                isButtonDisabled={handleDisableButton}
                nextButtonData={btnFormData}
                views={[
                    {
                        id: String(StockTrackerWizardViews.FREQUENCY),
                        view: (
                            <WizardView icon={Icons.FREQUENCY}>
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
                        )
                    },
                    {
                        id: String(StockTrackerWizardViews.STRATEGY),
                        view: (
                            <WizardView icon={Icons.STRATEGY}>
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
                        )
                    },
                    {
                        id: String(StockTrackerWizardViews.TRANSACTION),
                        view: (
                            <WizardView icon={Icons.CASH} scrollable>
                                <MarginBox noMarginTop>
                                    <SFormTitle>{ts("stock_tracker_transaction_amount")}</SFormTitle>
                                    <SFormDescription>{ts("stock_tracker_transaction_amount_tip")}</SFormDescription>
                                    <CurrencyInput
                                        prefix={AppConfig.CURRENCY_PREFIX}
                                        value={transient.strategySetting?.stockAmountLimit || 0}
                                        onChangeValue={handleChangeStockAmountLimit}/>
                                    
                                    <OrElse>{ts("or_you_can")}</OrElse>
                                    <InputSwitch 
                                        label={ts("stock_tracker_auto_transaction_amount")}
                                        value={transient.strategySetting?.autoAmountLimit}
                                        onChange={handleChangeAutoAmountLimit}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(StockTrackerWizardViews.REVIEW),
                        view: (
                            <WizardView icon={Icons.REVIEW}>
                                <ScrollViewForm>
                                    <MarginBox noMarginTop>
                                        <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                                        <StockTrackerData stockTracker={transient} isReview={true}/>
                                    </MarginBox>
                                </ScrollViewForm>
                            </WizardView>
                        )
                    },
                    {
                        id: String(StockTrackerWizardViews.DONE),
                        view: (
                            <WizardView icon={Icons.CHECK_CIRCLE}>
                                <GenericTextIcon
                                    title={ts(titleDone)}
                                    message={ts(messageDone)}
                                    icon={Icons.CHECK_CIRCLE}
                                    iconColor={Colors.BLUES_1}/>
                            </WizardView>
                        )
                    }
                ]}>
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