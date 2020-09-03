import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { APIError } from "./types"

export interface APIConfiguration {
    baseURL: string,
    requestTimeout: number,
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig,
    responseInterceptor?(response: AxiosResponse): AxiosResponse
}

export interface InternAPIConfiguration extends APIConfiguration {
    axiosInstante: AxiosInstance
}

export const API_VERSION = "v1"
export const OFFLINE: APIError = { code: "API_OFFLINE" }
export const CONFIG = {} as InternAPIConfiguration

/**
 *
 *
 * @param {string} route
 * @param {boolean} [secure]
 * @returns
 */
export const baseRoute = (route: string, secure?: boolean) => {
    return `/${API_VERSION}${secure ? "/secure" : ""}${route}`
}