import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'

export const InvestimentAnalysisUI: FC = () => {
    return (
        <FlatLayout>
            <BackHeader title={ts("Analysis")}/>

        </FlatLayout>
    )
}