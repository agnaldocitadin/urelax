
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Colors, Icons, TypographyMedium } from '../../../theming'
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
    backColor = Colors.BLACK_1,
    center,
    ...others
}) => {
    const navigation = useNavigation()
    const handleBack = () => navigation.goBack()
    
    return (
        <FlatHeader 
            {...others}
            center={ center ? center : <TypographyMedium fontSize={14} color={titleColor}>{ title }</TypographyMedium>}
            left={
                <ButtonHeader 
                    color={backColor} 
                    icon={Icons.BACK} 
                    onPress={handleBack}/>
            }
        />
    )
}