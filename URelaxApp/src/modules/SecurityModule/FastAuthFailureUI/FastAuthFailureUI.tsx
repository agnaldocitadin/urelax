import React, { FC } from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { Authenticate } from '../Authenticate'
import { useFastAuthFailureUIHook } from './FastAuthFailureUIHook'

interface FastAuthFailureUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const FastAuthFailureUI: FC<FastAuthFailureUIProps> = () => {
    
    const { 
        authenticate, 
        storage, 
        tryAgainData, 
        handleSuccess, 
        handleFail, 
        handleTryAgain 
    } = useFastAuthFailureUIHook()

    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.BG_1}/>
            { authenticate && <Authenticate
                authType="password"
                email={storage?.email}
                password={storage?.password}
                onSuccess={handleSuccess}
                onFail={handleFail}/> }
            <ViewFail>
                <Message
                    title={ts("oops")}
                    message={ts("authentication_failed")}
                    icon={Icons.HEART_BROKEN}
                    iconColor={Colors.RED_ERROR}/>
            </ViewFail>
            <InteractiveButton
                data={tryAgainData}
                onPress={handleTryAgain}/>
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