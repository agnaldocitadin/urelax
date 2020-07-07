
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { Colors, Icons, TypographyMedium } from '../../../theming'
import { ButtonHeader } from '../ButtonHeader'
import { FlatHeader, FlatHeaderProps } from '../FlatHeader'

export interface BackHeaderProps extends FlatHeaderProps {
    title?: string
    titleColor?: string
}

export const BackHeader: FC<BackHeaderProps> = ({ 
    title, 
    titleColor,
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
                    color={Colors.BLUES_1} 
                    icon={Icons.BACK} 
                    onPress={handleBack}/>
            }
        />
    )
}