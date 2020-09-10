
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { animatedCallback } from '../../../core/Commons.hook'
import { Colors, Icons, Typography } from '../../../theming'
import { ButtonHeader } from '../ButtonHeader'
import { FlatHeader, FlatHeaderProps } from '../FlatHeader'

export interface BackHeaderProps extends FlatHeaderProps {
    title?: string
    titleColor?: string
    backColor?: string
    onBack?(): void
}

export const BackHeader: FC<BackHeaderProps> = ({ 
    title, 
    titleColor,
    backColor = Colors.GRAY_2,
    center,
    onBack,
    ...others
}) => {
    const navigation = useNavigation()
    const handleBack = animatedCallback(() => navigation.goBack())
    
    return (
        <FlatHeader 
            {...others}
            center={ center ? center : <Typography fontSize={14} color={titleColor}>{ title }</Typography>}
            left={
                <ButtonHeader 
                    color={backColor} 
                    icon={Icons.BACK} 
                    onPress={onBack || handleBack}/>
            }
        />
    )
}