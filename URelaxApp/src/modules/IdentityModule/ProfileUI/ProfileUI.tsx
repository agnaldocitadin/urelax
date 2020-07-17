import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'

export const ProfileUI: FC = ({ children }) => {
    
    return (
        <FlatLayout
            header={<BackHeader title={ts("profile")} />}>

        </FlatLayout>
    )
}