
let TOKEN: string | undefined = undefined

const Actions = () => {

    return {
        TOKEN,
        setToken: (token: string) => {
            TOKEN = token
        }
    }

}

export default Actions