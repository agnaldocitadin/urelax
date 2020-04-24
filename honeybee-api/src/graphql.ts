import { utils } from 'js-commons'
import { CONFIG, OFFLINE } from "./api"

const SEPARATOR = ","

/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
export const mutation = (name: string, params?: object, fields?: string): string => {
    const _params = serialize(params)
    return `mutation{${name}${_params ? `(${_params})` : ""}${fields ? `{${fields}}` : ""}}`
}

/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
export const query = (name: string, params?: object, fields?: string): string => {
    const _params = serialize(params)
    return `query{${name}${_params ? `(${_params})` : ""}${fields ? `{${fields}}` : ""}}`
}

/**
 *
 *
 * @param {string} queryName
 * @param {string} query
 * @returns
 */
export const gql = async (queryName: string, query: string) => {
    console.log("query:", query)
    const response: Response = await utils.timedPromise(fetch(CONFIG.graphqlURI, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json;charset=UTF-8", 
            "Accept-Encoding": "gzip, deflate"
        },
        body: JSON.stringify({ query })
    }), OFFLINE)

    const json = await response.json()
    console.log("gql response:", json)
    if (json.errors) {
        throw json.errors[0]
    }
    return json.data[queryName]
}

/**
 *
 *
 * @param {Object} [obj]
 * @returns {string}
 */
const serialize = (obj?: Object): string => {
    if (!obj) return ""

    let serialization = ""
    Object.keys(obj).forEach(field => {
        let value = (<any>obj)[field]
        if (value == undefined || null) return
        let toSerialize = typeof value === "object" && !(value instanceof Date)
        if (toSerialize) serialization = serialization.concat(`${serialization.length > 0 ? SEPARATOR : ""}${field}:{${serialize(value)}}`)
        else serialization = serialization.concat(`${serialization.length > 0 ? SEPARATOR : ""}${field}:${serializeValue((<any>obj)[field])}`)
    })

    return serialization
}

/**
 *
 *
 * @param {*} value
 * @returns
 */
const serializeValue = (value: any) => {
    if (value instanceof Date) {
        return `"${(<Date>value).toISOString()}"`
    }
    if (typeof value === "string") {
        return `"${value}"`
    }
    return value
}