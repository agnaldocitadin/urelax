import { useState } from "react"
import { InteractiveButtonData } from "./InteractiveButton"

export const useInteractiveButton = (initialData: InteractiveButtonData): [InteractiveButtonData, (data: InteractiveButtonData) => void] => {

    const [ data, setData ] = useState(initialData)
    const updateFn = (data: InteractiveButtonData) => setData(old => ({...old, ...data}))

    return [
        data,
        updateFn
    ]
}