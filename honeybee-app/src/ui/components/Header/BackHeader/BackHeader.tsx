
import React from 'react'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import { Colors, Icons } from '../../../../core/Theme'
import { ButtonHeader } from '../ButtonHeader'
import { FlatHeader, FlatHeaderProps } from '../FlatHeader'

export interface BackHeaderProps extends FlatHeaderProps {
    navigation?: NavigationStackProp
}

export const BackHeader = withNavigation(({ navigation, ...others }: BackHeaderProps) => {
    const handleBack = () => navigation?.goBack(null)
    return (
        <FlatHeader {...others} left={
            <ButtonHeader 
                color={Colors.BLUES_1} 
                icon={Icons.BACK} 
                onPress={handleBack}/>
        }/>
    )
})