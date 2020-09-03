import { Locales } from 'honeybee-api'
import i18n, { TOptions } from 'i18next'
import en_US from './langs/en_US.json'
import pt_BR from './langs/pt_BR.json'

i18n
    .init({
        resources: {
            en_US: { translation: en_US },
            pt_BR: { translation: pt_BR }
            //...
        },
        lng: Locales.PT_BR,
        fallbackLng: Locales.EN_US,
        interpolation: { escapeValue: false },
        parseMissingKeyHandler: (key: string) => {
            if (key === "") return "!_KEY_NOT_PROVIDED_!"
            return `!_${key}_!`
        }
    });

export { i18n };

export const tsLng = (locale: string, key: string | string[], options?: TOptions<any> | string) => {
    return i18n.getFixedT(locale)(key, options)
}

export const ts = (key: string | string[], options?: TOptions<any> | string) => {
    return i18n.t(key, options)
}
