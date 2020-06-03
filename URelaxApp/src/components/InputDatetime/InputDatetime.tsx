import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { Icons } from '../../theming'
import { InputText, InputTextProps } from '../InputText'
import { useInputDatetimeHook } from './InputDatetimeHook'

export interface InputDatetimeProps extends InputTextProps {
    dateTimeDispplay?: "spinner" | "default" | "clock" | "calendar"
    dateTimeMode?: "date" | "time"
    initValue?: Date
    onChange?(date: Date): void
}

export const InputDatetime: FC<InputDatetimeProps> = ({
    dateTimeMode,
    dateTimeDispplay,
    initValue,
    onChange,
    ...others
}) => {
    
    const _value = initValue ? new Date(initValue) : undefined
    const { show, handleShowDatetime, handleSelectDate } = useInputDatetimeHook(onChange, initValue)
    const inputValue = _value ? format(_value, "dd/MM/yyyy") : undefined
    
    return (
        <React.Fragment>
            <InputText 
                {...others}
                value={inputValue} 
                editable={false} 
                rightIcon={Icons.CALENDAR}
                onTouchStart={handleShowDatetime}/>
            
            { show && <DateTimePicker
                value={_value ? _value : new Date()}
                mode={dateTimeMode}
                display={dateTimeDispplay}
                onChange={handleSelectDate}/>
            }
        </React.Fragment>
    )
}