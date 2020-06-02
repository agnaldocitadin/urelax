import { AxiosRequestConfig } from 'axios'
import { API } from 'honeybee-api'
import { useSelector } from 'react-redux'
import actions from './actions'
import { Authenticate } from './Authenticate'
import { FastAuthUI } from './FastAuthUI'
import { LogInUI } from './LogInUI'
import reducer, { ReducerState } from './reducer'
import { SplashAuth } from './SplashAuth'

const MODULE_NAME = "Security"

type StateProperties = keyof ReducerState

const select = (property: StateProperties) => useSelector((state: any) => state[MODULE_NAME][property])

const init = async () => {
    
    const requestInterceptor = (config: AxiosRequestConfig) => {
        config.headers["Authorization"] = `Bearer ${actions().TOKEN}`
        return config
    }

    API.init({
        baseURL: "http://192.168.0.219:3004",
        requestTimeout: 7500,
        requestInterceptor
    })
}

export default {
    MODULE_NAME,
    init,
    ...{
        Authenticate,
        LogInUI,
        SplashAuth,
        FastAuthUI
    },
    select,
    actions,
    reducer
}