import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MessageType, MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    visible: false,
    payload: {
        type: MessageType.SUCCESS,
        title: "",
        message: "",
        closeAfterAction: true
    }
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SHOW_SUCCESS_MESSAGE: (state: ReducerState, payload: any): ReducerState => {
        console.log("--", )
        return {
            ...state,
            payload,
            visible: true
        }
    },

    SHOW_CONFIRMATION_MESSAGE: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            payload,
            visible: true
        }
    },

    SHOW_ERROR_MESSAGE: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            payload,
            visible: true
        }
    },

    CLOSE_MESSAGE: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            visible: false
        }
    }

})
