import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { APIError } from "./types";
export interface APIConfiguration {
    baseURL: string;
    requestTimeout: number;
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig;
    responseInterceptor?(response: AxiosResponse): AxiosResponse;
}
export interface InternAPIConfiguration extends APIConfiguration {
    axiosInstante: AxiosInstance;
}
export declare const API_VERSION = "v1";
export declare const OFFLINE: APIError;
export declare const CONFIG: InternAPIConfiguration;
/**
 *
 *
 * @param {string} route
 * @param {boolean} [secure]
 * @returns
 */
export declare const baseRoute: (route: string, secure?: boolean | undefined) => string;
