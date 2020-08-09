import { utils } from 'js-commons'
import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { HeaderDivider, MarginBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography, TypographyMedium } from '../../../theming'
import { PeriodBtn, Row } from '../InvestimentAnalysisUI'
import { useInvestimentAnalysisDetailUIHook } from './InvestimentAnalysisDetailUIHook'

export const InvestimentAnalysisDetailUI: FC = () => {
    
    const { 
        analysis,
        selectedItems,
        positiveProfit,
        negativeProfit,
        handlePositiveProfit,
        handleNegativeProfit
    } = useInvestimentAnalysisDetailUIHook()

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={ts("period_investiment")}/>}>
            <MarginBox noMarginTop>
                <Row>
                    <PeriodBtn
                        label={ts("gain")}
                        selected={positiveProfit}
                        onPress={handlePositiveProfit}/>

                    <PeriodBtn
                        label={ts("loss")}
                        selected={negativeProfit}
                        onPress={handleNegativeProfit}/>
                </Row>
                <HeaderDivider>{analysis.label}</HeaderDivider>
                { selectedItems.map((item, key) => {
                    const label = item.amount === 0 ? ts("no_variation") : (item.amount > 0 ? `${ts("gain")} of` : `${ts("loss")} of`)
                    return <Info
                        key={key}
                        title={<TypographyMedium fontSize={15}>{item.investiment?.description}</TypographyMedium>}
                        description={
                            <React.Fragment>
                                <Typography color={Colors.GRAY_1} fontSize={14}>{label} {utils.formatCurrency(item.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                                <VariationMonitor value={item.variation} />
                            </React.Fragment>
                        }
                        />
                })}
            </MarginBox>
        </FlatLayout>
    )
}