import React, { FC, useCallback, useState } from 'react'
import { StyleProp, TextInputProps, TextProps, TextStyle, ViewProps } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, Icons, InputTextBase, Typography } from '../../theming'

export interface InputTextProps extends TextInputProps {
    label: string
    labelStyle?: TextProps,
    containerStyle?: ViewProps
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

const DEFAULT_ICON_SIZE = 25

export const InputText: FC<InputTextProps> = ({
    label,
    labelStyle,
    containerStyle,
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
        <Container onTouchStart={onTouchStart} style={containerStyle}>
            { label && <Typography style={labelStyle}>{label}</Typography> }
            <Content>
                { leftIcon && <SIcon name={leftIcon} size={leftIconSize} color={leftIconColor}/> }
                <InputTextBase {...others} style={inputStyle}/>
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
    /* justify-content: space-around; */
    align-items: center;
`

const SIcon = styled(Icon)<{ paddingLeft?: number }>`
    padding-left: ${({ paddingLeft }) => `${paddingLeft || 0}px`};
`



// import { GestureResponderEvent, KeyboardTypeOptions, NativeSyntheticEvent, TextInputFocusEventData, View, ViewStyle } from 'react-native'
// import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
// import styled from 'styled-components/native'
// import { Colors, Fontsa, Icons } from '../../theming'
// import { FORM_PADDING, SHIMMER_COLORS } from '../Layout/Layout.style'

// export interface InputTextProps {
//     label?: string
//     labelFontSize?: number
//     maxLength?: number
//     secureTextEntry?: boolean
//     autoCorrect?: boolean
//     placeholder?: string
//     placeholderTextColor?: string
//     bgColor?: string
//     autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
//     autoFocus?: boolean
//     value?: string
//     keyboardType?: KeyboardTypeOptions
//     labelColor?: string
//     textColor?: string
//     textSize?: number
//     tip?: string
//     tipColor?: string
//     editable?: boolean
//     textContentType?:
//         | 'none'
//         | 'URL'
//         | 'addressCity'
//         | 'addressCityAndState'
//         | 'addressState'
//         | 'countryName'
//         | 'creditCardNumber'
//         | 'emailAddress'
//         | 'familyName'
//         | 'fullStreetAddress'
//         | 'givenName'
//         | 'jobTitle'
//         | 'location'
//         | 'middleName'
//         | 'name'
//         | 'namePrefix'
//         | 'nameSuffix'
//         | 'nickname'
//         | 'organizationName'
//         | 'postalCode'
//         | 'streetAddressLine1'
//         | 'streetAddressLine2'
//         | 'sublocality'
//         | 'telephoneNumber'
//         | 'username'
//         | 'password'
//         | 'newPassword'
//         | 'oneTimeCode'
//     leftIcon?: string
//     leftIconSize?: number
//     leftIconColor?: string
//     rightIcon?: string
//     rightIconSize?: number
//     rightIconColor?: string
//     securityIconSize?: number
//     borderColor?: string
//     invalid?: boolean
//     invalidText?: string
//     loading?: boolean
//     // type?: TextInputMaskTypeProp
//     // options?: TextInputMaskOptionProp
//     includeRawValueInChangeText?: boolean
//     disabled?: boolean
//     style?: ViewStyle
//     rightIconAction?(): void
//     onChangeText?(text: string, raw?: any): void
//     onFocus?(e: NativeSyntheticEvent<TextInputFocusEventData>): void
//     onBlur?(e: NativeSyntheticEvent<TextInputFocusEventData>): void
//     onTouchStart?(event: GestureResponderEvent): void
// }

// const BIG_ICON_SIZE = "25px"
// const SMALL_ICON_SIZE = "19px"

// export const InputText: FC<InputTextProps> = ({ 
//     label,
//     labelFontSize,
//     labelColor = Colors.GRAY_2,
//     placeholder,
//     placeholderTextColor = Colors.BG_2,
//     textColor = Colors.BLACK_2,
//     textSize = 16,
//     bgColor = Colors.WHITE,
//     onChangeText,
//     leftIcon,
//     leftIconSize = SMALL_ICON_SIZE,
//     leftIconColor = Colors.BG_2,
//     rightIcon,
//     rightIconSize = BIG_ICON_SIZE,
//     rightIconColor = Colors.BLUES_2,
//     rightIconAction,
//     secureTextEntry,
//     securityIconSize = BIG_ICON_SIZE,
//     tipColor = Colors.BG_2,
//     tip,
//     value,
//     borderColor = Colors.BG_2,
//     invalid = false,
//     invalidText,
//     loading,
//     // type = "custom",
//     // options,
//     includeRawValueInChangeText,
//     onTouchStart,
//     disabled,
//     style,
//     ...others
// }) => {

//     const [ secure, setSecure ] = useState(secureTextEntry)
//     const _borderColor = invalid ? Colors.RED_ERROR : borderColor
//     const _labelColor = invalid ? Colors.RED_ERROR : labelColor
//     const _textColor = disabled ? Colors.BG_2 : textColor
//     const filled = value && value.length > 0
//     const handletoggleSecure = animatedCallback(() => setSecure(oldValue => !oldValue), [secure])

//     return (
//         <Shimmer autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
//             <View style={style}>
//                 <SInputItem bgColor={bgColor} color={_borderColor} onTouchStart={onTouchStart}>
//                     { (filled || value) && label ? <InputLabel label={label} labelColor={_labelColor} fontSize={labelFontSize}/> : null }
//                     <SInputContent>
//                         { leftIcon && <SIcon type={Fontsa.ICON_PACK} name={leftIcon} fontSize={leftIconSize} color={leftIconColor}/>}
//                         { !options ? 
//                             <SInputDefault
//                                 {...others}
//                                 value={value}
//                                 color={_textColor}
//                                 textSize={textSize}
//                                 placeholder={placeholder ? placeholder : label}
//                                 placeholderTextColor={placeholderTextColor}
//                                 onChangeText={onChangeText}
//                                 secureTextEntry={secure}
//                                 disabled={disabled}/>
//                             :
//                             <SInputMask
//                                 {...others}
//                                 value={value}
//                                 color={_textColor}
//                                 textSize={textSize}
//                                 placeholder={placeholder ? placeholder : label}
//                                 placeholderTextColor={placeholderTextColor}
//                                 onChangeText={onChangeText}
//                                 secureTextEntry={secure}
//                                 type={type}
//                                 options={options}
//                                 includeRawValueInChangeText={includeRawValueInChangeText}
//                                 disabled={disabled}/>
//                         }

                        
//                     </SInputContent>
//                 { invalid && <AlertBox>{invalidText}</AlertBox> }
//                 </SInputItem>
//                 { tip && <STip color={tipColor}>{tip}</STip>}
//             </View>
//         </Shimmer>
//     )
// }

// const Shimmer = styled(ShimmerPlaceHolder)`
//     width: 100%;
//     height: 50px;
//     border-radius: 5px;
//     margin-bottom: ${FORM_PADDING};
// `
// const SInputItem: any = styled(View)`
//     flex-direction: column;
//     align-items: flex-start;
//     border-color: ${(props: any) => props.color};
//     background-color: ${(props: any) => props.bgColor};
//     border-width: 1px;
//     border-radius: 4px;
//     padding-left: 15px;
//     padding-right: 15px;
//     min-height: 65px;
// `

// const SInputContent = styled(View)`
//     flex-direction: row;
//     align-items: center;
//     flex: 1;
// `

// const SInputDefault: any = styled(Input)`
//     width: 100%;
//     font-family: ${Theme.FONT_REGULAR};
//     font-size: ${(props: any) => `${props.textSize}px`};
//     color: ${(props: any) => props.color};
// `

// const SInputMask: any = styled(TextInputMask)`
//     width: 100%;
//     font-family: ${Theme.FONT_REGULAR};
//     font-size: ${(props: any) => `${props.textSize}px`};
//     color: ${(props: any) => props.color};
// `



// const STip: any = styled(Text)`
//     color: ${(props: any) => props.color};
//     font-family: ${Theme.FONT_REGULAR};
//     font-size: 14px;
//     margin-top: 10px;
// `

// const AlertBox: any = styled(Text)`
//     font-family: ${Theme.FONT_MEDIUM};
//     color: ${Colors.RED_ERROR};
//     font-size: 14px;
//     margin-bottom: 5px;
// `