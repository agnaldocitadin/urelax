import React, { FC, useCallback, useState } from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Icons, InputTextBase } from '../../../theming'
import { InputWrapper, InputWrapperProps } from "../InputWrapper"

const DEFAULT_ICON_SIZE = 20

interface InputSecureProps extends InputWrapperProps, TextInputProps {
    securityIconSize?: number
}

export const InputSecure: FC<InputSecureProps> = ({
    securityIconSize = DEFAULT_ICON_SIZE,
    ...others
}) => {
    const [ secure, setSecure ] = useState(true)
    const handletoggleSecure = useCallback(() => setSecure(oldValue => !oldValue), [secure])
    return (
        <InputWrapper {...others} wrapped={
            <React.Fragment>
                <InputTextBase {...others} secureTextEntry={secure}/>
                <SIcon 
                    name={secure ? Icons.EYE_OFF_OUTLINE : Icons.EYE_OUTLINE} 
                    color={others.rightIconColor} 
                    size={securityIconSize} 
                    onPress={handletoggleSecure}/>
            </React.Fragment>
        }/>
    )
}

const SIcon = styled(Icon)<{ paddingLeft?: number }>`
    padding-left: ${({ paddingLeft }) => `${paddingLeft || 0}px`};
`