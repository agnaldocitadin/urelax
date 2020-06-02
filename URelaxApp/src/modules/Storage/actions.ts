import AsyncStorage from "@react-native-community/async-storage"

export interface StorageApp {
    email: string
    password: string
    keepSession: "yes" | "no"
    tour: boolean
}

interface StorageAppUpdate {
    email?: string
    password?: string
    keepSession?: "yes" | "no"
    tour?: boolean
}

enum Storage {
    URELAX_DATA_APP = "@urelaxapp:LOCAL_DATA_APP"
}

const Actions = () => {

    /**
     *
     *
     * @returns {Promise<StorageApp>}
     */
    const initStorage = async (): Promise<StorageApp> => {
        const data = await retrieveDataApp()
        if (!data) return storeDataApp({ 
            email: "none", 
            password: "none", 
            keepSession: "no", 
            tour: false
        })
        return data
    }

    /**
     *
     *
     * @param {StorageApp} data
     * @returns {StorageApp}
     */
    const storeDataApp = (data: StorageApp): StorageApp => {
        AsyncStorage.setItem(Storage.URELAX_DATA_APP, JSON.stringify(data))
        return data
    }

    /**
     *
     *
     * @returns {(Promise<StorageApp|undefined>)}
     */
    const retrieveDataApp = async (): Promise<StorageApp|undefined> => {
        const dataJson = await AsyncStorage.getItem(Storage.URELAX_DATA_APP)
        if (dataJson) return JSON.parse(dataJson)
    }

    /**
     *
     *
     * @param {StorageAppUpdate} data
     * @returns
     */
    const updateDataApp = async (data: StorageAppUpdate) => {
        const storageData = await retrieveDataApp()
        if (storageData) return storeDataApp({...storageData, ...data})
    }

    /**
     *
     *
     * @returns
     */
    const resetStorage = () => {
        return updateDataApp({ 
            email: "none", 
            password: "none", 
            keepSession: "no"
        })
    }

    return {
        initStorage,
        storeDataApp,
        retrieveDataApp,
        updateDataApp,
        resetStorage
    }
}

export default Actions


