import React, { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { animatedCallback } from '../../../../hooks/Commons.hook'
import { Routes } from '../../../../navigations/Navigator'
import { InteractiveButton } from '../../../../ui/components/InteractiveButton'
import { GenericTextIcon } from '../../../../ui/components/Layout/Layout.style'

interface FastAuthFailureUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const FastAuthFailureUI: FC<FastAuthFailureUIProps> = ({ navigation }) => {
    
    const handleTryAgain = animatedCallback(() => navigation.navigate(Routes.FastAuthUI))

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.BG_1}/>
            <ViewFail>
                <Message
                    title={ts("oops")}
                    message={ts("authentication_failed")}
                    icon={Icons.HEART_BROKEN}
                    iconColor={Colors.RED_ERROR}/>
            </ViewFail>
            <InteractiveButton 
                block 
                normalText={ts("try_again")}
                onPress={handleTryAgain}
                normalBgColor={Colors.WHITE}
                animate={false}/>
        </React.Fragment>
    )
}

const ViewFail = styled(View)`
    background-color: ${Colors.BG_1};
    justify-content: center;
    flex: 1;
`

const Message = styled(GenericTextIcon)`
    margin: 0 50px;
`