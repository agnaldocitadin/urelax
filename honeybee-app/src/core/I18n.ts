import { Locales } from 'honeybee-api'
import i18n, { TOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_US from '../translations/en_US.json'
import pt_BR from '../translations/pt_BR.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en_US: { translation: en_US },
            pt_BR: { translation: pt_BR }
            //...
        },
        lng: Locales.PT_BR, //get the language from device
        fallbackLng: "en_US",
        interpolation: { escapeValue: false },
        parseMissingKeyHandler: (key: string) => {
            if (key === "") return "!_KEY_NOT_PROVIDED_!"
            return `!_${key}_!`
        }
    });

export { i18n }

export const ts = (key: string | string[], options?: TOptions<any> | string) => {
    return i18n.t(key, options)
}