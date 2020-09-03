
import React from 'react'
import { Typography } from '../../../theming'
import { FormOptionType } from './InputOptions'

interface InputTextOptionProps<T> {
    value: T
    text: string
}

export const InputTextOption = <T extends {}>({ value, text }: InputTextOptionProps<T>): FormOptionType<T> => {
    return {
        value,
        body: <Typography fontSize={15}>{text}</Typography>
    }
}