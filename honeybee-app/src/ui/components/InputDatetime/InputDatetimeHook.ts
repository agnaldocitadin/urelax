import { useCallback, useState } from "react"

export const useInputDatetimeHook = (onChange?:(date: Date) => void, initValue?: Date) => {

    const [ show, setShow ] = useState(false)
    
    const handleShowDatetime = useCallback(() => setShow(oldValue => !oldValue), [show])
    
    const handleSelectDate = (e: any) => {
        setShow(false)
        const timestamp = e.nativeEvent.timestamp
        if (timestamp && onChange) {
            onChange(new Date(timestamp))
        }
    }

    return {
        show,
        handleShowDatetime,
        handleSelectDate
    }
}