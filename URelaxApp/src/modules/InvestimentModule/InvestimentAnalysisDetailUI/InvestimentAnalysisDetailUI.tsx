import { utils } from 'js-commons'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography, TypographyMedium } from '../../../theming'
import { PeriodBtn, Row } from '../InvestimentAnalysisUI'
import { useInvestimentAnalysisDetailUIHook } from './InvestimentAnalysisDetailUIHook'

const getLabel = (profit: number = 0) => {
    return profit === 0 ? ts("no_variation") : (profit > 0 ? ts("gain") : ts("loss"))
}

export const InvestimentAnalysisDetailUI: FC = () => {
    
    const {
        label,
        profit,
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
            header={<BackHeader title={`${ts("profits")} (${analysis.label})`}/>}>
            <MarginBox noMarginTop>
                <ProfitView>
                    <Info 
                        title={
                            <Typography
                                fontSize={15}
                                textAlign="center">
                                {label}
                            </Typography>
                        }
                        description={
                            <TypographyMedium
                                fontSize={23}>
                                {utils.formatCurrency(profit, { prefix: AppConfig.CURRENCY_PREFIX })}
                            </TypographyMedium>
                        }/>
                </ProfitView>
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
                { selectedItems.map((item, key) => {
                    return <Info
                        key={key}
                        title={<TypographyMedium fontSize={15}>{item.investiment?.description}</TypographyMedium>}
                        description={
                            <React.Fragment>
                                <Typography
                                    color={Colors.GRAY_1}
                                    fontSize={14}>
                                    {utils.formatCurrency(item.profit || 0, { prefix: AppConfig.CURRENCY_PREFIX })} ({getLabel(item.profit)})
                                </Typography>
                                <VariationMonitor value={item.variation} />
                            </React.Fragment>
                        }
                        />
                })}
            </MarginBox>
        </FlatLayout>
    )
}

const ProfitView = styled.View`
    align-items: center;
`