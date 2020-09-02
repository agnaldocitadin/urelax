import { FinancialAnalysisPeriod } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { Info } from '../../../components/Info'
import { MarginBoxFlex } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
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
        profit,
        patrimonyVariation,
        period,
        selectedGraph,
        loading,
        finding,
        fail,
        noData,
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
                        title={<Typography color={Colors.GRAY_1}>Lucro</Typography>}
                        description={
                            <TypographyMedium
                                fontSize={20}
                                color={Colors.BLACK_2}>
                                {utils.formatCurrency(profit, { prefix: AppConfig.CURRENCY_PREFIX })}
                            </TypographyMedium>
                        }/>
                    <Patrimony
                        title={<Typography textAlign="right" color={Colors.GRAY_1}>Patrimônio total</Typography>}
                        description={
                            <Typography
                                fontSize={20}
                                color={Colors.BLACK_2}>
                                {utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                            </Typography>
                        }/>
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
                    { noData && <TextIconDisplay
                        style={{ flex: 1, justifyContent: "center" }}
                        iconColor={Colors.GRAY_2}
                        icon={"flask-empty-outline"}
                        title={ts("oops")}
                        message={ts("nothing_here")} />}
                        
                    { !noData && (
                        <React.Fragment>
                            <VariationMonitor
                                fontSize={15}
                                value={patrimonyVariation}/>
                                
                            <AnalysisGraphic
                                data={dataGraph}
                                loading={finding}
                                minLengthToLoadMore={20}
                                selectedIndex={selectedGraph}
                                onSelect={handleSelectGraph}
                                onEndPageReached={handleLoadMore}/>
                        </React.Fragment>
                    )}
                </Graph>

            </MarginBoxFlex>
            { !noData && <ShowInvestimentDetail onPress={handleAnalysisDetail}>
                <TypographyMedium
                    color={Colors.GRAY_1}
                    textAlign="center">
                    {ts("period_investiment")}
                </TypographyMedium>
            </ShowInvestimentDetail>}
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
    flex-direction: row;
`

const Patrimony = styled(Info)`
    padding: 0;
`

const Graph = styled.View`
    flex: 1;
    align-items: center;
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