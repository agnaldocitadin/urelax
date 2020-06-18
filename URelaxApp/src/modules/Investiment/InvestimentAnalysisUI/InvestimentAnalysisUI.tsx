import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { useInvestimentAnalysisUIHook } from './InvestimentAnalysisUIHook'

export const InvestimentAnalysisUI: FC = () => {
    const { } = useInvestimentAnalysisUIHook()
    return (
        <FlatLayout>
            <BackHeader title={ts("analysis")}/>

        </FlatLayout>
    )
}