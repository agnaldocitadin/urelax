import React, { FC, useCallback, useState } from 'react'
import { StyleProp, TextInputProps, TextStyle, ViewProps } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, Icons, InputTextBase, Typography } from '../../theming'

export interface InputTextProps extends TextInputProps {
    label?: string
    labelStyle?: TextStyle,
    style?: ViewProps
    inputStyle?: StyleProp<TextStyle>
    leftIcon?: string
    leftIconSize?: number
    leftIconColor?: string
    rightIcon?: string
    rightIconSize?: number
    rightIconColor?: string
    securityIconSize?: number
    disabled?: boolean
    rightIconAction?(): void
}

const DEFAULT_ICON_SIZE = 20

export const InputText: FC<InputTextProps> = ({
    label,
    labelStyle,
    style,
    inputStyle,
    leftIcon,
    leftIconSize = DEFAULT_ICON_SIZE,
    leftIconColor,
    rightIcon,
    rightIconSize = DEFAULT_ICON_SIZE,
    rightIconColor,
    secureTextEntry,
    securityIconSize = DEFAULT_ICON_SIZE,
    rightIconAction,
    onTouchStart,
    ...others
}) => {

    const [ secure, setSecure ] = useState(secureTextEntry)
    const handletoggleSecure = useCallback(() => setSecure(oldValue => !oldValue), [secure])

    return (
        <Container onTouchStart={onTouchStart} style={style}>
            { label && <Typography style={labelStyle}>{label}</Typography> }
            <Content>
                { leftIcon && <SIcon name={leftIcon} size={leftIconSize} color={leftIconColor}/> }
                <InputTextBase {...others} secureTextEntry={secure} style={inputStyle}/>
                { secureTextEntry && 
                    <SIcon 
                        name={secure ? Icons.EYE_OFF_OUTLINE : Icons.EYE_OUTLINE} 
                        color={rightIconColor} 
                        size={securityIconSize} 
                        onPress={handletoggleSecure}/>
                }
                { rightIcon && 
                    <SIcon 
                        name={rightIcon} 
                        size={rightIconSize} 
                        color={rightIconColor} 
                        paddingLeft={10}
                        onPress={rightIconAction}/>
                }
            </Content>
        </Container>
    )
}

const Container = styled.View`
    background-color: ${Colors.WHITE};
    border-color: ${Colors.GRAY_1};
    border-width: 1px;
    border-radius: 5px;
    padding: 5px 15px;
`

const Content = styled.View`
    flex-direction: row;
    align-items: center;
`

const SIcon = styled(Icon)<{ paddingLeft?: number }>`
    padding-left: ${({ paddingLeft }) => `${paddingLeft || 0}px`};
`