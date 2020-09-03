import React, { FC, useMemo } from 'react'
import Modal from 'react-native-modal'
import styled from 'styled-components/native'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { FlatHeader } from '../../../components/Header/FlatHeader'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
import { Colors, Icons } from '../../../theming'
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
        <ModalContainer
            isVisible={visible}
            animationIn="zoomIn"
            animationOut="zoomOut"
            onBackdropPress={handleCloseDialog}
            hideModalContentWhileAnimating={true}
            useNativeDriver={true}>
            <Container>
                <FlatHeader
                    borderBottomWidth={0}
                    bgHeaderColor={Colors.TRANSPARENT}
                    withFloatingStatusbar={false}
                    right={
                        <ButtonHeader
                            icon={Icons.CLOSE}
                            onPress={handleCloseDialog}/>
                    }/>
                    
                    <Display
                        icon={payload.icon || Icons.ALERT_CIRCLE}
                        iconColor={payload.iconColor}
                        title={payload.title}
                        message={payload.message}/>
                        
                    <Button
                        data={{ text: payload.buttonLabel }}
                        onPress={handleButtonAction}/>
            </Container>
        </ModalContainer>
    ), [visible, payload])

    return modal
}

const ModalContainer = styled(Modal)`
    margin: 0 auto;
    width: 80%;
`

const Button = styled(InteractiveButton)`
    border-color: ${Colors.GRAY_4};
    border-top-width: 1px;
`

const Container = styled.View`
    background-color: ${Colors.WHITE};
    border-radius: 5px;
`

const Display = styled(TextIconDisplay)`
    margin: 0 25px 30px 25px;
`