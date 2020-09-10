import React, { FC, useCallback, useState } from 'react'
import { TextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { BaseIcon, Colors, Icons, InputTextBase } from '../../../theming'
import { BaseButton } from '../../BaseButton'
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
                <BaseButton contentStyle={{ backgroundColor: Colors.TRANSPARENT }} onPress={handletoggleSecure}>
                    <SIcon 
                        name={secure ? Icons.EYE_OFF_OUTLINE : Icons.EYE_OUTLINE} 
                        color={others.rightIconColor} 
                        size={securityIconSize}/>
                </BaseButton>
            </React.Fragment>
        }/>
    )
}

const SIcon = styled(BaseIcon)<{ paddingLeft?: number }>`
    padding-left: ${({ paddingLeft }) => `${paddingLeft || 0}px`};
`