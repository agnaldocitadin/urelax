import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { Routes } from '../../Navigation/const'

interface FastAuthFailureUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const FastAuthFailureUI: FC<FastAuthFailureUIProps> = ({ }) => {
    
    const navigation = useNavigation()
    const handleTryAgain = animatedCallback(() => navigation.navigate(Routes.SPLASH))

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

const ViewFail = styled.View`
    background-color: ${Colors.BG_1};
    justify-content: center;
    flex: 1;
`

const Message = styled(GenericTextIcon)`
    margin: 0 50px;
`