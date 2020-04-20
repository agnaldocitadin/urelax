import { StockTrackerStatus } from 'honeybee-api'
import React, { FC } from 'react'
import { Colors, Icons } from '../../../../core/Theme'
import { InteractiveButton, InteractiveButtonStates } from '../../../../ui/components/InteractiveButton'

export interface BeeControlButtonProps {
    buttonSize: number
    iconSize: number
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

export const BeeControlButton: FC<BeeControlButtonProps> = ({ buttonSize, iconSize, status, onPress }) => {
    const btActionIcon = getBtIcon(status)
    const disabled = isDisabled(status)
    if (isDestroyed(status)) return null
    return (
        <InteractiveButton
            icon={btActionIcon} 
            width={buttonSize} 
            height={buttonSize} 
            radius={100} 
            iconSize={iconSize}
            iconColor={Colors.WHITE}
            indicatorColor={Colors.WHITE}
            normalBgColor={Colors.BLUES_1}
            processingBgColor={Colors.BG_2}
            successStatus={InteractiveButtonStates.NORMAL}
            onPress={onPress}
            disabled={disabled}/>
    )
}