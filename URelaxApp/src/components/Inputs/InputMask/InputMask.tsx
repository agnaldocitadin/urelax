import React, { FC } from 'react'
import { TextInputMaskProps } from 'react-native-text-input-mask'
import { InputMaskBase } from '../../../theming'
import { InputWrapper, InputWrapperProps } from "../InputWrapper"

interface InputMaskProps extends InputWrapperProps, TextInputMaskProps {}

export const InputMask: FC<InputMaskProps> = (props) => {
    return (
        <InputWrapper {...props} wrapped={<InputMaskBase {...props}/>}/>
    )
}