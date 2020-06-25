import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors, Typography } from '../../../theming'
import { MyButton, Row } from '../InvestimentAnalysisUI'
import { useInvestimentAnalysisDetailUIHook } from './InvestimentAnalysisDetailUIHook'

export const InvestimentAnalysisDetailUI: FC = () => {
    const { analysis } = useInvestimentAnalysisDetailUIHook()
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("details")}/>
            <Row>
                <MyButton label="Lucro" selected/>
                <MyButton label="Perda" selected/>
            </Row>
            { analysis.items?.map(item => <Typography>{item.amount}</Typography>) }
        </FlatLayout>
    )
}