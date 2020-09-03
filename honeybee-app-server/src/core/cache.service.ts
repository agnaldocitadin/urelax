import mongoose from 'mongoose'
import NodeCache from 'node-cache'
import { ErrorCodes } from './error.codes'
import Logger from './Logger'

/**
 *
 *
 * @returns
 */
const CacheService = () => {

    const cache = new NodeCache({
        useClones: false
    })

    return {
        
        /**
         *
         *
         * @param {string} key
         * @param {Function} storeFn
         * @returns {Promise<any>}
         */
        get: async (key: string, storeFn: Function): Promise<any> => {
            let result = cache.get(key)
            if (!result) {
                cache.set(key, await storeFn())
                return cache.get(key)
            }
            return result
        },

        /**
         *
         *
         * @param {*} entity
         * @param {mongoose.Model<any>} model
         */
        save: (entity: any, model: mongoose.Model<any>) => {
            if (!entity._doc) Logger.throw(ErrorCodes.ENTITY_NOT_PROVIDED)
            model.updateOne({ _id: entity._id }, { ...(<any>entity)._doc }).exec()
        },

        /**
         *
         *
         * @param {string} key
         */
        del: (key: string) => cache.del(key),

        /**
         *
         *
         */
        flush: () => cache.flushAll()
    }
}

export const cache = CacheService()