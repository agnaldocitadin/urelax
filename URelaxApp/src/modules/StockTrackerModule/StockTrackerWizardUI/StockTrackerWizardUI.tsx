import React, { FC, useState } from 'react'
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
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, TypographyMedium, Icons } from '../../../theming'
import { useStockTrackerWizardUIHook } from './StockTrackerWizardUIHook'

interface StockTrackerWizardProps {}

export const StockTrackerWizardUI: FC<StockTrackerWizardProps> = ({}) => {

    const {} = useStockTrackerWizardUIHook()
    const [ idx, setIdx ] = useState(0)

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("stock_tracker_settings")}/>
            <WizardForm
                index={idx}
                onButtonPress={() => setIdx(old => (old + 1))}>
                
                <WizardView icon="settings">
                    <Options
                        options={["pri", "sec", "ter"]}
                        renderOption={item => InputTextOption({ value: item, text: String(item) })}
                        selectedOption={"null"}
                        onSelect={item => console.log(">", item)}
                        header={
                            <MarginBox noMarginBottom>
                                <SFormTitle>{ts("stock_tracker_frequency")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_frequency_tip")}</SFormDescription>
                            </MarginBox>        
                        }/>
                </WizardView>

                <WizardView icon="settings">
                    <Options
                        options={["Estrategia 1", "Estrategia 2"]}
                        renderOption={item => InputTextOption({ value: item, text: String(item)}) }
                        selectedOption={"null"}
                        onSelect={item => console.log(">", item)}
                        header={
                            <MarginBox noMarginBottom>
                                <SFormTitle>{ts("stock_tracker_strategy")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_strategy_tip")}</SFormDescription>
                            </MarginBox>
                        }/>
                </WizardView>

                <WizardView icon="settings">
                    <MarginBox>
                        <SFormTitle>{ts("stock_tracker_transaction_amount")}</SFormTitle>
                        <SFormDescription>{ts("stock_tracker_transaction_amount_tip")}</SFormDescription>
                        <InputText
                            label="opao"
                            value={null}
                            autoCapitalize="words"
                            textContentType="name"
                            // textSize={20}
                            // tip={ts("stock_tracker_transaction_amount_eg")}
                            onChangeText={null}
                            // includeRawValueInChangeText
                            // type="money"
                            // options={{
                            //     delimiter: ".",
                            //     precision: 2,
                            //     unit: `${AppConfig.CURRENCY_PREFIX} `,
                            // }}
                            />
                        
                        <OrElse>{ts("or_you_can")}</OrElse>
                        <InputSwitch label={ts("stock_tracker_auto_transaction_amount")} value={0} onChange={null}/>
                    </MarginBox>
                </WizardView>

                <WizardView icon="settings">
                    <ScrollViewForm>
                        <MarginBox>
                            <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                            {/* <StockTrackerData stockTracker={{}} isReview={true} noPadding/> */}
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