import { baseRoute, CONFIG, OFFLINE } from "./api"

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
    console.debug("Query:", query)
    try {
        let response = await CONFIG.axiosInstante.post(baseRoute("/graphql", true), JSON.stringify({ query }))
        let json = response.data
        let result = json.data[queryName]
        console.debug("Result:", result)
        return result
    }
    catch(e) {
        let { data } = e.response
        if (data && data.errors) {
            throw data.errors[0]
        }
        if (data) {
            throw data
        }
        if (!e.response) {
            throw OFFLINE
        }
    }
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