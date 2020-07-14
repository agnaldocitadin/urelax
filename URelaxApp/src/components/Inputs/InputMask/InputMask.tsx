import React, { FC } from 'react'
import TextInputMask, { TextInputMaskProps } from 'react-native-text-input-mask'
import { InputWrapper, InputWrapperProps } from "../InputWrapper"

interface InputMaskProps extends InputWrapperProps, TextInputMaskProps {}

export const InputMask: FC<InputMaskProps> = (props) => {
    return (
        <InputWrapper {...props} wrapped={<TextInputMask {...props}/>}/>
    )
}