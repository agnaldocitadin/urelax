import { useDispatch } from "react-redux"

// That's a hook
const Actions = () => {

    const dispatch = useDispatch()

    return {
        addTodo: () => {
            dispatch({ type: "ADD_A" })
            console.debug("000")
        }
    }

}

export default Actions