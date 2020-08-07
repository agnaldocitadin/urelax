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
        <Modal
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
                    right={
                        <ButtonHeader
                            icon={Icons.CLOSE}
                            onPress={handleCloseDialog}/>
                    }/>
                <Content>
                    <Display
                        icon={payload.icon || Icons.ALERT_CIRCLE}
                        iconColor={payload.iconColor}
                        title={payload.title}
                        message={payload.message}/>
                        
                    <Button
                        data={{ text: payload.buttonLabel }}
                        onPress={handleButtonAction}/>
                </Content>
            </Container>
        </Modal>
    ), [visible, payload])

    return modal
}

const Button = styled(InteractiveButton)`
    border-radius: 50px;
    border-width: 1px;
    width: 250px;
`

const Container = styled.View`
    background-color: ${Colors.WHITE};
    border-radius: 10px;
`

const Content = styled.View`
    align-items: center;
    justify-content: space-evenly;
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 50px;
`

const Display = styled(TextIconDisplay)`
    margin-bottom: 30px;
`