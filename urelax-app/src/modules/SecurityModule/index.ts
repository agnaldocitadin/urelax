import { AxiosRequestConfig } from 'axios'
import { API } from 'urelax-api'
import { LANGUAGE } from '../SettingModule/actions'
import actions, { TOKEN } from './actions'
import { MODULE_NAME } from './const'
import reducer, { select } from './reducer'

const init = async () => {

    const requestInterceptor = (config: AxiosRequestConfig) => {
        config.headers["Authorization"] = `Bearer ${TOKEN}`
        config.headers["language"] = LANGUAGE //FIXME Add another interceptor for that.
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
    select,
    actions,
    reducer
}