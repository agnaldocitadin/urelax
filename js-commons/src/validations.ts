export const validations = {

    validateUserName: (chars?: string) => {
        return !chars || !!chars.match(/^[a-zA-Z0-9]{5,}$/)
    },
    
    validatePassword: (chars?: string) => {
        return !chars || !!chars.match(/^[a-zA-Z0-9]{5,}$/)
    },
    
    validateFullName: (chars?: string) => {
        return !chars || !!chars.match(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/)
    },
    
    validateEmail: (chars?: string) => {
        return !chars || !!chars.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    },
    
    validateNickname: (chars?: string) => {
        return !chars || !!chars.match(/^[a-zA-Z\-]+$/)
    }

}