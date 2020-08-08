import React, { FC } from 'react'
import { BaseButton } from '../../../components/BaseButton'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ts } from '../../../core/I18n'
import { Colors, Icons, Typography } from '../../../theming'
import { useAddBrokerAccountUIHook } from './AddBrokerAccountUIHooks'

export const AddBrokerAccountUI: FC = ({}) => {
    
    const {
        handleAddClearAccount,
        handleBrokerAccounts
    } = useAddBrokerAccountUIHook()

    return (
        <PrimaryLayout
            title={ts("brokers")}
            right={
                <ButtonHeader
                    color={Colors.WHITE}
                    icon={Icons.PLUS_CIRCLE}
                    onPress={handleBrokerAccounts}/>
            }>
            <BaseButton onPress={handleAddClearAccount}>
                <Typography>Clear</Typography>
            </BaseButton>
        </PrimaryLayout>
    )
}