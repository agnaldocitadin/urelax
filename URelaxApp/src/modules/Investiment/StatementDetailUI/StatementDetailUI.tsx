import { FinancialHistory } from 'honeybee-api'
import React, { FC } from 'react'
import Investiment from '..'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'

export const StatementDetailUI: FC = () => {
    const event: FinancialHistory = Investiment.select("selectedEvent")
    return (
        <FlatLayout>
            <BackHeader title={ts("statement_detail")}/>
            
        </FlatLayout>
    )
}