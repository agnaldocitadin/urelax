
import { utils } from 'js-commons'
import React, { FC, useCallback, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import { Colors, InputTextBase, Typography } from '../../../theming'
import { InputWrapper, InputWrapperProps } from '../InputWrapper'

const VALID = /^[1-9]{1}[0-9]*$/

interface CurrencyInputProps extends InputWrapperProps {
    prefix?: string
    max?: number
    onChangeValue?(value: number): void
    value: number
}

export const CurrencyInput: FC<CurrencyInputProps> = ({
    prefix = "$",
    max = Number.MAX_SAFE_INTEGER,
    value = 0,
    onChangeValue,
    ...others
}) => {

    const inputRef = useRef(null)
    const [inputHeight, setInputHeight] = useState(0)

    if (!Number.isFinite(value) || Number.isNaN(value)) {
        throw new Error(`invalid value property`)
    }
    
    const formattedValue = utils.formatNumber(value)
    const valueInput = value === 0 ? "" : parseInt(formattedValue.replace(/\D/g, "")).toString()
    const valueDisplay = utils.formatCurrency(value, { prefix })

    const handleChangeText = useCallback((text: string) => {
        if (text === "") {
            onChangeValue && onChangeValue(0)
            return
        }

        if (!VALID.test(text)) {
            return
        }

        const nextValue = parseInt(text, 10)
        if (nextValue > max) {
            return
        }
        
        onChangeValue && onChangeValue(nextValue / 100)
    }, [])

    const handleFocus = useCallback(() => (inputRef?.current as any).focus(), [inputRef])

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout
        setInputHeight(height)
    }, [])
    
    return (
        <InputWrapper
            {...others}
            onTouchStart={handleFocus}
            wrapped={
                <Container>
                    <Content height={inputHeight}>
                        <Typo 
                            height={inputHeight}
                            fontSize={15}
                            onPress={handleFocus}>
                            {valueDisplay}
                        </Typo>
                        <Input
                            onLayout={handleLayout}
                            ref={inputRef}
                            autoFocus={false}
                            contextMenuHidden
                            keyboardType="numeric"
                            onChangeText={handleChangeText}
                            value={valueInput}/>
                    </Content>
                </Container>
            }/>
    )
}

const Container = styled.View`
    align-items: flex-start;
    flex: 1;
`

const Content = styled.View<{ height: number }>`
    height: ${({ height }) => height || 0}px;
    align-items: flex-end;
    margin: 0 5px;
`

const Typo = styled(Typography)<{ height: number }>`
    line-height: ${({ height }) => height || 0}px;    
`

const Input = styled(InputTextBase)`
    color: ${Colors.TRANSPARENT};
    position: absolute;
    text-align: right;
    width: 10px;
    right: -6px;
`