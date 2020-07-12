import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { Icons } from '../../../theming'
import { InputText } from '../InputText'
import { InputWrapperProps } from '../InputWrapper'
import { useInputDatetimeHook } from './InputDatetimeHook'

export interface InputDatetimeProps extends InputWrapperProps {
    dateTimeDispplay?: "spinner" | "default" | "clock" | "calendar"
    dateTimeMode?: "date" | "time"
    dateValue?: Date
    dateFormat?: string
    onChangeDate?(date: Date): void
}

export const InputDatetime: FC<InputDatetimeProps> = ({
    dateTimeMode,
    dateTimeDispplay,
    dateValue,
    dateFormat = "MMMM, dd 'of' yyyy",
    onChangeDate,
    ...others
}) => {
    
    const _value = dateValue ? new Date(dateValue) : undefined
    const { show, handleShowDatetime, handleSelectDate } = useInputDatetimeHook(onChangeDate)
    const inputValue = _value ? format(_value, dateFormat) : undefined
    
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