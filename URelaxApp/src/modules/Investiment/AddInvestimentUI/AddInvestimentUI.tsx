import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { useAddInvestimentUIHook } from './AddInvestimentUIHook'

export const AddInvestimentUI: FC = () => {
    const { } = useAddInvestimentUIHook()
    return (
        <FlatLayout>
            <BackHeader title={ts("add_investiments")}/>
            
        </FlatLayout>
    )
}