import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors, Typography } from '../../../theming'
import { MyButton, Row } from '../InvestimentAnalysisUI'
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
            header={<BackHeader title={ts("details")}/>}>
            <Row>
                <MyButton label="Lucro" selected={positiveProfit} onPress={handlePositiveProfit}/>
                <MyButton label="Perda" selected={negativeProfit} onPress={handleNegativeProfit}/>
            </Row>
            <Typography>{analysis.label}</Typography>
            { selectedItems.map((item, key) => <Typography key={key}>{item.investiment?.description} - {item.amount} - {item.variation}</Typography>) }
        </FlatLayout>
    )
}