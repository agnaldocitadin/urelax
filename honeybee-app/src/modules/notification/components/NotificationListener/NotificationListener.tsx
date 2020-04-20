import { FC } from 'react'
import { useNotificationListenerHook } from './NotificationListenerHook'

export interface NotificationListenerProps {}

export const NotificationListener: FC<NotificationListenerProps> = (props) => {
    useNotificationListenerHook()
    return null
}