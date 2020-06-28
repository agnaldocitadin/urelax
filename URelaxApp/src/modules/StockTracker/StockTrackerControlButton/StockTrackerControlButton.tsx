import { StockTrackerStatus } from 'honeybee-api'
import React, { FC } from 'react'
import { InteractiveButton, InteractiveButtonStates } from '../../../components/InteractiveButton'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'

export interface StockTrackerControlButtonProps {
    // text?: string
    activityState?: InteractiveButtonStates
    textColor?: string
    disabledTextColor?: string
    disabled?: boolean
    icon?: string
    iconColor?: string
    iconSize?: number

    status?: StockTrackerStatus
    onPress?(): Promise<unknown>
}

export const getBtIcon = (status?: string) => {
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

export const StockTrackerControlButton: FC<StockTrackerControlButtonProps> = ({ activityState, status, onPress }) => {
    const btActionIcon = getBtIcon(status)
    const disabled = isDisabled(status)
    if (isDestroyed(status)) return null
    return (
        <InteractiveButton
            onPress={onPress}
            data={{
                activityState,
                text: ts(status || ""),
                icon: btActionIcon,
                textColor: Colors.BLUES_1,
                iconColor: disabled ? Colors.BG_2 : Colors.BLUES_1,
                disabledTextColor: Colors.BG_2,
                disabled
            }}/>
    )
}