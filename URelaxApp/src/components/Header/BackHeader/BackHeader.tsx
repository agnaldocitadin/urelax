
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Colors, Icons, Typography } from '../../../theming'
import { ButtonHeader } from '../ButtonHeader'
import { FlatHeader, FlatHeaderProps } from '../FlatHeader'

export interface BackHeaderProps extends FlatHeaderProps {
    title?: string
    titleColor?: string
    backColor?: string
}

export const BackHeader: FC<BackHeaderProps> = ({ 
    title, 
    titleColor,
    backColor = Colors.GRAY_2,
    center,
    ...others
}) => {
    const navigation = useNavigation()
    const handleBack = () => navigation.goBack()
    
    return (
        <FlatHeader 
            {...others}
            center={ center ? center : <Typography fontSize={14} color={titleColor}>{ title }</Typography>}
            left={
                <ButtonHeader 
                    color={backColor} 
                    icon={Icons.BACK} 
                    onPress={handleBack}/>
            }
        />
    )
}