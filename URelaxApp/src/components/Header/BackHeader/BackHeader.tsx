
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Colors, Icons } from '../../../theming'
import { ButtonHeader } from '../ButtonHeader'
import { FlatHeader, FlatHeaderProps } from '../FlatHeader'

export interface BackHeaderProps extends FlatHeaderProps {}

export const BackHeader = ({ ...others }: BackHeaderProps) => {
    const navigation = useNavigation()
    const handleBack = () => navigation.goBack()
    
    return (
        <FlatHeader {...others} left={
            <ButtonHeader 
                color={Colors.BLUES_1} 
                icon={Icons.BACK} 
                onPress={handleBack}/>
        }/>
    )
}