import { AxiosRequestConfig } from 'axios'
import { API } from 'honeybee-api'
import actions from './actions'
import { Authenticate } from './Authenticate'
import { MODULE_NAME } from './const'
import { FastAuthFailureUI } from './FastAuthFailureUI'
import { FastAuthUI } from './FastAuthUI'
import { LogInUI } from './LogInUI'
import reducer, { select } from './reducer'
import { SplashAuth } from './SplashAuth'

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
        FastAuthUI,
        FastAuthFailureUI
    },
    select,
    actions,
    reducer
}