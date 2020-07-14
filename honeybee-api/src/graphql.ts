import { baseRoute, CONFIG, OFFLINE } from "./core"

const SEPARATOR = ","

/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
export const mutation = (name: string, params?: object, fields?: string, howToSerialize?: object): string => {
    const _params = serialize(params, howToSerialize)
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
export const query = (name: string, params?: object, fields?: string, howToSerialize?: object): string => {
    const _params = serialize(params, howToSerialize)
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
        if (!e.response) {
            throw OFFLINE
        }

        let { data } = e.response
        if (data && data.errors) {
            throw data.errors[0]
        }

        if (data) {
            throw data
        }
    }
}

/**
 *
 *
 * @param {Object} [obj]
 * @returns {string}
 */
const serialize = (obj?: Object, howToSerialize?: object): string => {
    if (!obj) return ""

    let serialization = ""
    Object.keys(obj).forEach(field => {
        let value = (<any>obj)[field]
        if (value == undefined || null) return
        let toSerialize = typeof value === "object" && !(value instanceof Date)
        if (toSerialize) serialization = serialization.concat(`${serialization.length > 0 ? SEPARATOR : ""}${field}:{${serialize(value, howToSerialize)}}`)
        else serialization = serialization.concat(`${serialization.length > 0 ? SEPARATOR : ""}${field}:${serializeValue((<any>obj)[field], field, howToSerialize)}`)
    })

    return serialization
}

/**
 *
 *
 * @param {*} value
 * @returns
 */
const serializeValue = (value: any, field: string, howToSerialize?: object) => {
    if (howToSerialize) {
        let serialize = (<any>howToSerialize)[field]
        if (serialize) {
            return serialize(value)
        }
    }
    if (value instanceof Date) {
        return `"${(<Date>value).toISOString()}"`
    }
    if (typeof value === "string") {
        return `"${value}"`
    }
    return value
}