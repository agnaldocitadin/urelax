import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { useAddBrokerAccountUIHook } from './AddBrokerAccountUIHooks'
import { BaseButton } from '../../../components/BaseButton'
import { Typography, Icons, Colors } from '../../../theming'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'

const COLOR = Colors.BLUES_1

export const AddBrokerAccountUI: FC = ({}) => {
    
    const {
        handleAddClearAccount,
        handleBrokerAccounts
    } = useAddBrokerAccountUIHook()

    return (
        <FlatLayout
            bgStatusBar={COLOR}
            header={
                <BackHeader backColor={Colors.WHITE} titleColor={Colors.WHITE} bgHeaderColor={COLOR} title={ts("brokers")} right={
                    <ButtonHeader color={Colors.WHITE} icon={Icons.CAMERA} onPress={handleBrokerAccounts}/>
                }/>
            }>
            
            <BaseButton onPress={handleAddClearAccount}>
                <Typography>Clear</Typography>
            </BaseButton>

        </FlatLayout>
    )
}