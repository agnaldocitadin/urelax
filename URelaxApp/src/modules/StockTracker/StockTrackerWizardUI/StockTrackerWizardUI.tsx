import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InputOptions } from '../../../components/InputOptions'
import { InputSwitch } from '../../../components/InputSwitch'
import { InputText } from '../../../components/InputText'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { FormView, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { Wizard } from '../../../components/Wizard'
import { WizardView } from '../../../components/Wizard/WizardView'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_VERTICAL_SPACING, TypographyMedium } from '../../../theming'
import { StockTrackerData } from '../StockTrackerData'
import { InteractiveButton } from '../../../components/InteractiveButton'

interface StockTrackerWizardProps {}

export const StockTrackerWizardUI: FC<StockTrackerWizardProps> = ({}) => {

    const [ idx, setIdx ] = useState(0)

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("stock_tracker_settings")}/>

            <Flow index={idx}>
                <WizardView icon="settings">
                    <InputOptions
                        loading={false}
                        header={
                            <FormView>
                                <SFormTitle>{ts("stock_tracker_frequency")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_frequency_tip")}</SFormDescription>
                            </FormView>
                        }
                        options={[]}
                        renderOption={(frequency) => ({ value: frequency, body: ts(frequency) })}
                        selectedOption={null}
                        onSelect={null}/>
                </WizardView>

                <WizardView icon="settings">
                    <InputOptions
                        loading={false}
                        shimmers={1}
                        // horizontalOptionPadding={20}
                        header={
                            <FormView>
                                <SFormTitle>{ts("stock_tracker_strategy")}</SFormTitle>
                                <SFormDescription>{ts("stock_tracker_strategy_tip")}</SFormDescription>
                            </FormView>
                        }
                        options={[]}
                        renderOption={(strategy) => ({ value: strategy, body: ts(strategy) })}
                        selectedOption={null}
                        onSelect={null}
                        />
                </WizardView>

                <WizardView icon="settings">
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
                    
                    <TypographyMedium>{ts("or_you_can")}</TypographyMedium>
                    <InputSwitch label={ts("stock_tracker_auto_transaction_amount")} value={0} onChange={null}/>
                </WizardView>

                <WizardView icon="settings">
                    <ScrollViewForm>
                        <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                        {/* <StockTrackerData stockTracker={{}} isReview={true} noPadding/> */}
                    </ScrollViewForm>
                </WizardView>

                <WizardView icon="settings">

                </WizardView>
            </Flow>
            <Button data={{
                text: "Next",
                textColor: Colors.BLUES_2
            }} onPress={() => setIdx(old => (old + 1)) } />
        </FlatLayout>
    )
}

const Flow = styled(Wizard)`
    margin-top: ${DEFAULT_VERTICAL_SPACING}px;
`

const Button = styled(InteractiveButton)`
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
`