import { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'

export const AddInvestimentUI: FC = () => {
    return (
        <FlatLayout>
            <BackHeader title={ts("add_investiments")}/>
            
        </FlatLayout>
    )
}