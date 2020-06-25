import { utils } from 'js-commons'
import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { TouchItem } from '../../../components/TouchItem'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Button, Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Typography, TypographyMedium } from '../../../theming'
import { AnalysisGraphic } from './AnalysisGraphic'
import { useInvestimentAnalysisUIHook } from './InvestimentAnalysisUIHook'

export const InvestimentAnalysisUI: FC = () => {
    
    const {
        dataGraph,
        patrimony,
        patrimonyVariation,
        period,
        setPeriod,
        handleAnalysisDetail,
        handleSelectGraph
    } = useInvestimentAnalysisUIHook()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("analysis")}/>
            <Soet>
                <Typography>{utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                <VariationMonitor value={patrimonyVariation}/>
            </Soet>

            <Graph>
                <AnalysisGraphic
                    data={dataGraph}
                    minLengthToLoadMore={20}
                    onSelect={handleSelectGraph}/>
            </Graph>
            
            <Row>
                <MyButton 
                    label={ts("daily")}
                    selected={period === "daily"}
                    onPress={() => setPeriod("daily")}/>

                <MyButton
                    label={ts("weekly")}
                    selected={period === "weekly"}
                    onPress={() => setPeriod("weekly")}/>

                <MyButton
                    label={ts("monthly")}
                    selected={period === "monthly"}
                    onPress={() => setPeriod("monthly")}/>

                <MyButton
                    label={ts("yearly")}
                    selected={period === "yearly"}
                    onPress={() => setPeriod("yearly")}/>
            </Row>

            <Inves onPress={handleAnalysisDetail}>
                <View style={{ flex: 1 }}>
                    <TypographyMedium textAlign="center">{ts("period_investiment")}</TypographyMedium>
                </View>
            </Inves>
        </FlatLayout>
    )
}

export const MyButton: FC<{ label: string, selected?: boolean, onPress?(): void }> = ({ label, selected = false, onPress }) => {
    return (
        <But selected={selected} onPress={onPress}>
            <Typography color={selected ? Colors.BLUES_4 : Colors.BLACK_1}>{label}</Typography>
        </But>
    ) 
}

const Soet = styled.View`
    margin: ${DEFAULT_VERTICAL_SPACING}px ${DEFAULT_HORIZONTAL_SPACING}px;
    justify-content: space-between;
    flex-direction: row;
`

const Graph = styled.View`
    /* background-color: ${Colors.BG_1}; */
    flex: 1;
`

export const Row = styled.View`
    flex-direction: row;
    margin: ${DEFAULT_VERTICAL_SPACING}px 15px;
`

const But = styled(Button)<{ selected: boolean }>`
    border-width: 1px;
    border-color: ${({ selected }) => selected ? Colors.BLUES_4 : Colors.WHITE};
    border-radius: 25px;
    margin: 0 2px;
    height: 40px;
    flex: 1;
`

const Inves = styled(TouchItem)`
    padding: ${DEFAULT_VERTICAL_SPACING + 5}px ${DEFAULT_HORIZONTAL_SPACING}px;
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
`

const Tex = styled(TypographyMedium)`
    background-color: blue;
    /* width: 100%; */
    /* margin: 0 auto; */
    /* flex: 2; */
    /* flex-direction: row; */
    /* flex: 1; */
`