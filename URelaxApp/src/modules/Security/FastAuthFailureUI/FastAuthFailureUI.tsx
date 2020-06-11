import React, { FC, useState } from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { InteractiveButton, InteractiveButtonStates } from '../../../components/InteractiveButton'
import { useInteractiveButton } from '../../../components/InteractiveButton/InteractiveButtonHook'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import Navigation from '../../Navigation'
import Storage from '../../Storage'
import { StorageApp } from '../../Storage/actions'
import { Authenticate } from '../Authenticate'

interface FastAuthFailureUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const FastAuthFailureUI: FC<FastAuthFailureUIProps> = ({ }) => {
    
    const { switchStack } = Navigation.actions()
    const { initStorage } = Storage.actions()
    const [ tryAgainData, setTryAgainBtn ] = useInteractiveButton({ text: ts("try_again") })

    const [ authenticate, setAuthenticate ] = useState(false)
    const [ storage, setStorage ] = useState<StorageApp>()
    
    const handleTryAgain = animatedCallback(async () => {
        setTryAgainBtn({ activityState: InteractiveButtonStates.PROCESSING })
        const storageApp: StorageApp = await initStorage()
        setStorage(storageApp)
        setAuthenticate(true)
    })

    const handleSuccess = () => switchStack("app")

    const handleFail = () => {
        setAuthenticate(false)
        setTryAgainBtn({ activityState: InteractiveButtonStates.NORMAL })
    }

    console.log(storage?.email)
    console.log(storage?.password)

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