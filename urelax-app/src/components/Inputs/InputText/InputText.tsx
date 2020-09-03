import React, { FC } from 'react'
import { TextInputProps } from 'react-native'
import { InputTextBase } from '../../../theming'
import { InputWrapper, InputWrapperProps } from "../InputWrapper"

interface InputTextProps extends InputWrapperProps, TextInputProps {}

export const InputText: FC<InputTextProps> = (props) => {
    return (
        <InputWrapper {...props} wrapped={<InputTextBase {...props}/>}/>
    )
}