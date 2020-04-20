import AsyncStorage from "@react-native-community/async-storage"

export interface StorageApp {
    email: string
    passwd: string
    keepSession: "yes" | "no"
    tour: boolean
    simulation: boolean
}

interface StorageAppUpdate {
    email?: string
    passwd?: string
    keepSession?: "yes" | "no"
    tour?: boolean
    simulation?: boolean
}

enum Storage {
    HONEYBEE_DATA_APP = "@honeybeeapp:LOCAL_DATA_APP"
}

/**
 *
 *
 * @returns {Promise<StorageApp>}
 */
export const initStorage = async (): Promise<StorageApp> => {
    const data = await retrieveDataApp()
    if (!data) return storeDataApp({ 
        email: "none", 
        passwd: "none", 
        keepSession: "no", 
        tour: false, 
        simulation: false 
    })
    return data
}

/**
 *
 *
 * @param {StorageApp} data
 * @returns {StorageApp}
 */
export const storeDataApp = (data: StorageApp): StorageApp => {
    AsyncStorage.setItem(Storage.HONEYBEE_DATA_APP, JSON.stringify(data))
    return data
}

/**
 *
 *
 * @returns {(Promise<StorageApp|undefined>)}
 */
export const retrieveDataApp = async (): Promise<StorageApp|undefined> => {
    const dataJson = await AsyncStorage.getItem(Storage.HONEYBEE_DATA_APP)
    if (dataJson) return JSON.parse(dataJson)
}

/**
 *
 *
 * @param {StorageAppUpdate} data
 * @returns
 */
export const updateDataApp = async (data: StorageAppUpdate) => {
    const storageData = await retrieveDataApp()
    if (storageData) return storeDataApp({...storageData, ...data})
}

/**
 *
 *
 * @returns
 */
export const resetStorage = () => {
    return updateDataApp({ 
        email: "none", 
        passwd: "none", 
        keepSession: "no", 
        simulation: false 
    })
}