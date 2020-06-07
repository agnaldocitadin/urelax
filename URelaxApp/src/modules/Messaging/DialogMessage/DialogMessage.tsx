import React, { FC, useMemo } from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components/native'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { FlatHeader } from '../../../components/Header/FlatHeader'
import { InteractiveButton, InteractiveButtonStates } from '../../../components/InteractiveButton'
import { SRoundedBox } from '../../../components/Layout/Layout.style'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
import { Colors, Icons } from '../../../theming'
import { MessageType } from '../const'
import { useDialogMessageHook } from './DialogMessageHook'

interface DialogMessageProps {}

export const DialogMessage: FC<DialogMessageProps> = () => {

    const { 
        payload,
        visible,
        handleCloseDialog,
        handleButtonAction
    } = useDialogMessageHook()
    
    const modal = useMemo(() => (
        <Modal
            presentationStyle="overFullScreen"
            animationType="slide" 
            transparent={true}
            hardwareAccelerated
            visible={visible}
            onRequestClose={handleCloseDialog}>
            <Overlay/>
            <Rounded>
                <FlatHeader 
                    title=""
                    borderBottomWidth={0}
                    bgHeaderColor={Colors.TRANSPARENT}
                    right={<ButtonHeader color={Colors.BLUES_2} icon={Icons.CLOSE} onPress={handleCloseDialog}/>}/>
                    
                <Body>
                    <Display
                        icon={payload.icon || Icons.ALERT_CIRCLE}
                        iconColor={payload.iconColor}
                        title={payload.title}
                        message={payload.message}/>
                        
                    <InteractiveButton
                        block
                        radius={50}
                        successStatus={InteractiveButtonStates.NORMAL}
                        normalText={payload.buttonLabel}
                        textColor={Colors.BLUES_2}
                        borderColor={Colors.BLUES_2}
                        indicatorColor={Colors.BLUES_2}
                        borderWidth={2}
                        processingBgColor={Colors.WHITE}
                        animate={payload.type === MessageType.CONFIRMATION}
                        onPress={handleButtonAction}/>
                </Body>
            </Rounded>
        </Modal>
    ), [visible, payload])

    return modal
}

const Rounded = styled(SRoundedBox)`
    position: absolute;
    bottom: 0;
`

const Body = styled.View`
    align-items: center;
    justify-content: space-evenly;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 50px;
`

const Overlay = styled.View`
    background-color: ${Colors.BLACK_2};
    opacity: .8;
    flex: 1;
`

const Display = styled(TextIconDisplay)`
    margin-bottom: 30px;
`