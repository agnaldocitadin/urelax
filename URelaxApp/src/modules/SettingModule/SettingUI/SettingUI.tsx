import React, { FC } from 'react'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ts } from '../../../core/I18n'

export const SettingUI: FC = ({ children }) => {
    
    return (
        <PrimaryLayout title={ts("settings")}>
            
        </PrimaryLayout>
    )
}