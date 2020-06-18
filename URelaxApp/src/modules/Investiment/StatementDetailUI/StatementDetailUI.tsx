import { FinancialHistory } from 'honeybee-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import Investiment from '..'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'

export const StatementDetailUI: FC = () => {
    const event: FinancialHistory = Investiment.select("selectedEvent")
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("statement_detail")}/>
            <ScrollView>
                {/* TODO */}
                <Info name="Name" value="Value" />
            </ScrollView>
        </FlatLayout>
    )
}