import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { MyButton, Row } from '../InvestimentAnalysisUI'

export const InvestimentAnalysisDetailUI: FC = () => {
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("details")}/>
            <Row>
                <MyButton label="Lucro" selected/>
                <MyButton label="Perda" selected/>
            </Row>
        </FlatLayout>
    )
}