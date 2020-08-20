import { FinancialAnalysisPeriod } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { Info } from '../../../components/Info'
import { MarginBoxFlex } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { TouchItem } from '../../../components/TouchItem'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Typography, TypographyMedium } from '../../../theming'
import { AnalysisGraphic } from './AnalysisGraphic'
import { useInvestimentAnalysisUIHook } from './InvestimentAnalysisUIHook'

export const InvestimentAnalysisUI: FC = () => {
    
    const {
        dataGraph,
        patrimony,
        patrimonyVariation,
        period,
        selectedGraph,
        loading,
        fail,
        handlePeriodSelection,
        handleAnalysisDetail,
        handleSelectGraph,
        handleLoadMore
    } = useInvestimentAnalysisUIHook()

    return (
        <PrimaryLayout
            bgColor={Colors.WHITE}
            title={ts("analysis")}
            loading={loading}
            fail={fail}>
            <MarginBoxFlex>
                <Head>
                    <Patrimony
                        title={<Typography color={Colors.GRAY_1}>Patrimonio total</Typography>}
                        description={
                            <Typography fontSize={20} color={Colors.BLACK_2}>
                                {utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                            </Typography>
                        }/>
                    <VariationMonitor
                        fontSize={16}
                        value={patrimonyVariation}/>
                </Head>

                <Row>
                    <PeriodBtn 
                        label={ts("daily")}
                        selected={period === FinancialAnalysisPeriod.DAILY}
                        onPress={() => handlePeriodSelection(FinancialAnalysisPeriod.DAILY)}/>

                    <PeriodBtn
                        label={ts("weekly")}
                        selected={period === FinancialAnalysisPeriod.WEEKLY}
                        onPress={() => handlePeriodSelection(FinancialAnalysisPeriod.WEEKLY)}/>

                    <PeriodBtn
                        label={ts("monthly")}
                        selected={period === FinancialAnalysisPeriod.MONTHLY}
                        onPress={() => handlePeriodSelection(FinancialAnalysisPeriod.MONTHLY)}/>

                    <PeriodBtn
                        label={ts("yearly")}
                        selected={period === FinancialAnalysisPeriod.YEARLY}
                        onPress={() => handlePeriodSelection(FinancialAnalysisPeriod.YEARLY)}/>
                </Row>

                <Graph>
                    <AnalysisGraphic
                        data={dataGraph}
                        minLengthToLoadMore={20}
                        selectedIndex={selectedGraph}
                        onSelect={handleSelectGraph}
                        onEndPageReached={handleLoadMore}/>
                </Graph>

            </MarginBoxFlex>
            <ShowInvestimentDetail onPress={handleAnalysisDetail}>
                <TypographyMedium
                    color={Colors.GRAY_1}
                    textAlign="center">
                    {ts("period_investiment")}
                </TypographyMedium>
            </ShowInvestimentDetail>
        </PrimaryLayout>
    )
}

export const PeriodBtn: FC<{ label: string, selected?: boolean, onPress?(): void }> = ({ label, selected = false, onPress }) => {
    return (
        <Button selected={selected} onPress={onPress}>
            <Typography color={selected ? Colors.BLUES_4 : Colors.GRAY_2}>{label}</Typography>
        </Button>
    ) 
}

const Head = styled.View`
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

const Patrimony = styled(Info)`
    padding: 0;
`

const Graph = styled.View`
    flex: 1;
`

export const Row = styled.View`
    flex-direction: row;
    margin: ${DEFAULT_VERTICAL_SPACING}px 0;
`

const Button = styled(BaseButton)<{ selected: boolean }>`
    border-width: 1px;
    border-color: ${({ selected }) => selected ? Colors.BLUES_4 : Colors.GRAY_4};
    border-radius: 25px;
    margin: 0 2px;
    height: 40px;
    flex: 1;
`

const ShowInvestimentDetail = styled(TouchItem)`
    padding: ${DEFAULT_VERTICAL_SPACING + 5}px ${DEFAULT_HORIZONTAL_SPACING}px;
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
`