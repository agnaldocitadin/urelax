import dotenv from 'dotenv-flow'

beforeAll(async () => {
    dotenv.config()
    // await connectDB()
})

it("cler signin", async () => {
    jest.setTimeout(50000)

    // let res = await API.authenticate("", "")
    

    // let opa = [1,2,3,4,5,6,7,8,9,0]
    // opa.forEach(o => console.log(o, generateID("agnaldo"), new Date(), "PF:", process.hrtime()[1]))
    // opa.forEach(o => console.log(o, new Date().getMilliseconds(), process.hrtime()[1]))
    // for (let op of opa) {
    // for (let op of opa) {
    //     await Utils.sleep(50)
    //     console.log(op, generateID("agnaldo"), process.hrtime()[1])
    // }

    let opa: string[] = []

    console.log(opa[0])

    
    
    
    // validar credenciais
    // let res = await fetch("https://www.clear.com.br/pit/signin/Do?controller=SignIn", {
    //     method: "POST",
    //     redirect: "manual",
    //     headers: {
    //         "Content-Type" : "application/x-www-form-urlencoded",
    //         "Accept": "*/*",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
    //         "Connection": "keep-alive",
    //         "Host": "www.clear.com.br",
    //         "Origin": "https://www.clear.com.br",
    //         "Sec-Fetch-Dest": "empty",
    //         "Sec-Fetch-Mode": "cors",
    //         "Sec-Fetch-Site": "none"
    //     },
    //     body: "refer=&identificationNumber=00963868942&password=840528&dob=1984-05-28"
    // })

    // if (res.status === 302) {
    //     const cookie = res.headers.get("set-cookie")
    //     const auth = cookie.match(/(AuthCookie=.*?;)/)[0].replace("AuthCookie=", "").replace(";", "")
    //     const sessionId = cookie.match(/(ASP.NET_SessionId=.*?;)/)[0].replace("ASP.NET_SessionId=", "").replace(";", "")

    //     console.log("status", res.status)
    //     console.log(">", sessionId)
    //     console.log("auth", auth)
    // }

    // throw

    // console.log(res.status)
    // console.log(res.headers)
    // // console.log(res.headers.get("WWW-authenticate"))

    // let body = await res.text()
    // console.log(body)

    // let cookie = "ASP.NET_SessionId=vukgvdopivnnycfn3tsrsf2d; domain=clear.com.br; path=/; HttpOnly; SameSite=Lax, AuthCookie=qsxlgf0EXg8izCzpFZBAwGvlmCX2pYq2+qahltsdoZn0yezOFabTYcQT+mjesPVBtgRz+ys+cuPsf9Beh/m4eCdqOdIDf8DBwMPOZvlKrOZx4yG+vIOYWc0OzlK9P+ajAqO0q2RZD8/EBVOQhJxDNEBCPbqtoO5jgb8WKk6EZWiEsV0/kIAKMMmWbKbcBdLoL4jBxtFkd1pnde22sOwrJwL2FM8pH9anoL0cJyazW8XmmHarjGwNGx5nUTfHfhJoBcsNjZ37BhmoQTh06WoxYXHvRAfv7upBhvSHshSvr9KoqCTd52lLWDpVoM4t+2moXgahQcF6ez2nP1FwtFtGpQhUg0rS/Qat41Cn/YLS4Fi/6rza7LEA0g==; domain=clear.com.br; expires=Mon, 13-Apr-2020 23:12:49 GMT; path=/, demoing=false; domain=clear.com.br; path=/, ASP.NET_SessionId=vukgvdopivnnycfn3tsrsf2d; domain=clear.com.br; path=/, alb=wwwclear1; expires=Mon, 13-Apr-2020 22:17:49 GMT; path=/; secure, bm_sz=97752FEF178A2190736A59A376BF076D~YAAQPMXTuouvCGRxAQAAbCeadQcRN4E++dpzLJCrMposg383EXTV2Ve1/TZKxYjQRurWqiNsUqXY2RC5QPE/sXYxeh7eSdic9ha9k+PKLMkigRmQ0eIwKeXWosR+Q/lf493Deyhr9yheB8knehFRWTzW9ywyqVSvQ7CeFgPrV+ySwkZq76sxmb+LJVFqUJ1rLfY=; Domain=.clear.com.br; Path=/; Expires=Tue, 14 Apr 2020 02:12:49 GMT; Max-Age=14400; HttpOnly, _abck=59203B02D83BA6D64D2DA6ADAF24B1E2~-1~YAAQPMXTuoyvCGRxAQAAbCeadQNwtoQf3N0jsVW4bCEQfH2FUJHtYnhKtMQLqatZLPmp7QMW+TDiHTZVskUmzcRCMXFmeZ6xwqIRo506t5A872SwIt0rqxT90zzRjb6rvBFnZrgHGHojYS2MVZ4K0G6ljD5v+3/ZAXD584/xSqVBkONAtxLFAn+yFkc1ZAOvM0A98+Pg4gWtjYYbht60o7ZW1dO8egVuEpocsOSYYqKvfFC440O/a1WkgQRMx/DteRyHrCHp5lT9qCfGTFuE0LSdxs5nLWqpiNo9ydYaemN3XGsRzIOah8gL0oA=~-1~-1~-1; Domain=.clear.com.br; Path=/; Expires=Tue, 13 Apr 2021 22:12:49 GMT; Max-Age=31536000; Secure"
    

    // let authCookieStart = cookie.indexOf("AuthCookie=")
    // let authCookieEnd = cookie.indexOf(";", authCookieStart)
    // let sessionIdStart = cookie.indexOf("ASP.NET_SessionId==")
    // let sessionIdEnd = cookie.indexOf(";", sessionIdStart)

    // let authCookie = cookie.substring(authCookieStart + 11, authCookieEnd)
    // let sessionId = cookie.substring(sessionIdStart + 18, sessionIdEnd)

    // console.log("AuthCookie>", authCookie)
    // console.log("ASP.NET_SessionId>", sessionId)

    // let opa = cookie.substring(init, end)
    // console.log(opa)
    // console.log("--->", "wwafskfsd33jacajs".match(/(a.*?j)/)[0])
    // console.log("--->", cookie.match(/(AuthCookie=.*?;)/)[0].replace("AuthCookie=", "").replace(";", ""))
    // console.log("--->", cookie.match(/(ASP.NET_SessionId=.*?;)/)[0].replace("ASP.NET_SessionId=", "").replace(";", ""))


    // let body = await res.text()
    // console.log(body)

    // obter token
    // let resT = await fetch("https://novopit.clear.com.br/Server/SessionHandler.ashx?p=1", {
    //     method: "GET",
    //     headers: {
    //         "authority" : "novopit.clear.com.br",
    //         "referer" : "https://novopit.clear.com.br/",
    //         "cookie" : cookie,
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36",
    //         "Accept": "*/*",
    //         "Sec-Fetch-Site": "none",
    //         "Sec-Fetch-Mode": "cors",
    //         "sec-fetch-dest": "empty",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7"
    //     }
    // })

    
    // // Logger.debug(JSON.stringify(res), "RES")
    // console.log(resT.status)
    // console.log(resT.headers)
    // let body = await resT.text()
    // console.log(body)
    


})


// export const fetchGraphql = async (query: string) => {
//     const res = await timedPromise(fetch(AppConfig.URL_GRAPHQL_SERVER, {
//         method: "POST",
//         headers: { 
//             "Content-Type": "application/json;charset=UTF-8", 
//             "Accept-Encoding": "gzip, deflate"
//         },
//         body: JSON.stringify({ query })
//     }), "Server offline")

//     const json = await res.json()
//     if (json.errors) {
//         throw json.errors.map((error: any) => error.message)
//     }

//     return json
// }