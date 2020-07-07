import { StockTrackerStatus } from 'honeybee-api'
import React, { FC } from 'react'
import styled from 'styled-components/native'
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
        <Button
            disabled={disabled}
            onPress={onPress}
            indicatorColor={Colors.WHITE}
            data={{
                activityState,
                text: ts(status || ""),
                icon: btActionIcon,
                textColor: Colors.WHITE,
                iconColor: disabled ? Colors.BG_2 : Colors.WHITE,
                disabledTextColor: Colors.BG_2,
                disabled
            }}/>
    )
}

const Button = styled(InteractiveButton)`
    background-color: ${({ disabled }) => disabled ? Colors.GRAY_3 : Colors.BLUES_2};
`