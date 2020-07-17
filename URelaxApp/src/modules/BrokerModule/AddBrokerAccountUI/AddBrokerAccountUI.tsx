import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { useAddBrokerAccountUIHook } from './AddBrokerAccountUIHooks'
import { BaseButton } from '../../../components/BaseButton'
import { Typography } from '../../../theming'

export const AddBrokerAccountUI: FC = ({}) => {
    
    const {
        handleAddClearAccount
    } = useAddBrokerAccountUIHook()

    return (
        <FlatLayout
            header={<BackHeader title={ts("brokers")} />}>
            
            <BaseButton onPress={handleAddClearAccount}>
                <Typography>Clear</Typography>
            </BaseButton>

        </FlatLayout>
    )
}