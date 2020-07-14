import { FinancialHistory } from 'honeybee-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import Investiment from '../../InvestimentModule'

export const StatementDetailUI: FC = () => {
    const event: FinancialHistory = Investiment.select("selectedEvent")
    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={ts("statement_detail")}/>}>
            
            <ScrollView>
                {/* TODO */}
            </ScrollView>
        </FlatLayout>
    )
}