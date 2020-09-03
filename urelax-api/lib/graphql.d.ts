/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
export declare const mutation: (name: string, params?: object | undefined, fields?: string | undefined, howToSerialize?: object | undefined) => string;
/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
export declare const query: (name: string, params?: object | undefined, fields?: string | undefined, howToSerialize?: object | undefined) => string;
/**
 *
 *
 * @param {string} queryName
 * @param {string} query
 * @returns
 */
export declare const gql: (queryName: string, query: string) => Promise<any>;
/**
 *
 *
 * @param {Object} [obj]
 * @param {object} [howToSerialize]
 * @returns {string}
 */
export declare const serialize: (obj?: Object | undefined, howToSerialize?: object | undefined) => string;
