import { useCallback, useState } from "react"

export const useInputDatetimeHook = (onChangeDate?:(date: Date) => void) => {

    const [ show, setShow ] = useState(false)
    
    const handleShowDatetime = useCallback(() => setShow(oldValue => !oldValue), [show])
    
    const handleSelectDate = (e: any) => {
        setShow(false)
        const timestamp = e.nativeEvent.timestamp
        if (timestamp && onChangeDate) {
            onChangeDate(new Date(timestamp))
        }
    }

    return {
        show,
        handleShowDatetime,
        handleSelectDate
    }
}