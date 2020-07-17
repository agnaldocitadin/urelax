import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'

export const SettingUI: FC = ({ children }) => {
    
    return (
        <FlatLayout
            header={<BackHeader title={ts("settings")} />}>

        </FlatLayout>
    )
}