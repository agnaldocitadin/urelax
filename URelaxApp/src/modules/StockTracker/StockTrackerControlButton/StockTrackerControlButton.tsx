import { StockTrackerStatus } from 'honeybee-api'
import React, { FC } from 'react'
import { InteractiveButton, InteractiveButtonStates } from '../../../components/InteractiveButton'
import { ts } from '../../../core/I18n'
import { Icons } from '../../../theming'

export interface StockTrackerControlButtonProps {
    // buttonSize: number
    // iconSize: number
    status?: string
    onPress?(): Promise<unknown>
}

export const getBtIcon = (status?: string): "play" | "pause" | "clock" => {
    if (status === StockTrackerStatus.RUNNING) return Icons.PAUSE
    if (status === StockTrackerStatus.PAUSED) return Icons.PLAY
    if (status === StockTrackerStatus.DESTROYED) return Icons.PLAY
    if (status === StockTrackerStatus.WAITING_DESTROY) return Icons.CLOCK
    if (status === StockTrackerStatus.WAITING_PAUSE) return Icons.CLOCK
    return Icons.CLOCK
}

const isDestroyed = (status?: string): boolean => {
    return status === StockTrackerStatus.DESTROYED
}

export const isDisabled = (status?: string): boolean => {
    return status === StockTrackerStatus.WAITING_DESTROY || status === StockTrackerStatus.WAITING_PAUSE
}

export const StockTrackerControlButton: FC<StockTrackerControlButtonProps> = ({ status, onPress }) => {
    const btActionIcon = getBtIcon(status)
    const disabled = isDisabled(status)
    if (isDestroyed(status)) return null
    return (
        <InteractiveButton
            onPress={onPress}
            data={{
                activityState: InteractiveButtonStates.NORMAL,
                text: ts(status||""),
                icon: btActionIcon,
                disabled
            }}/>
    )
}