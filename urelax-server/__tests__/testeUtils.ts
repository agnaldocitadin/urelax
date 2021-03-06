import dotenv from 'dotenv-flow'
import Mongoose from 'mongoose'
import Logger from '../src/core/Logger'


const connectDB = async () => {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const db = process.env.DB_NAME
    await Mongoose.connect(`mongodb://${host}:${port}/${db}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    Logger.info("Database connected to: %s [%s:%s/%s]", "mongoDB", host, port, db)
}


beforeAll(async () => {
    dotenv.config()
    await connectDB()
})

function randomIntFromInterval(min: number, max: number) { // min and max included 
return Math.floor(Math.random() * (max - min + 1) + min);
}

const SEPARATOR = ","
export const serialize = (obj?: Object, howToSerialize?: object): string => {
    if (!obj) return ""

    let serialization = ""
    Object.keys(obj).forEach(field => {
        let value = (<any>obj)[field]
        if (value == undefined || null) return
        if (value instanceof Date || value instanceof Array || !(value instanceof Object)) {
            serialization = toPlain(serialization, field, serializeValue(value, field, howToSerialize))
        }
        else {
            serialization = toPlain(serialization, field, `{${serialize(value, howToSerialize)}}`)
        }
    })
    return serialization
}
const toPlain = (bucket: string, field: string, flatValue: string) => {
    return bucket.concat(`${bucket.length > 0 ? SEPARATOR : ""}${field}:${flatValue}`)
}
const serializeValue = (value: any, field: string, howToSerialize?: object) => {
    if (howToSerialize) {
        let serialize = (<any>howToSerialize)[field]
        if (serialize) {
            return serialize(value)
        }
    }
    if (value instanceof Array) {
        return JSON.stringify(value)
    }
    if (value instanceof Date) {
        return `"${(<Date>value).toISOString()}"`
    }
    if (typeof value === "string") {
        return `"${value}"`
    }
    return value
}


it("teste", async () => {
    jest.setTimeout(50000)

    const res = serialize({ nome: "agnaldo", data: ["abc", "def"], opa: { a:1, b:2 }})
    console.log(res)
    // console.log(JSON.stringify({ nome: "agnaldo", data: ["abc", "def"] }))

    // brokeracc 5ee657047038feff52a8f132
    // const dc = await addInvestiment(mongoose.Types.ObjectId("5ee657047038feff52a8f132"), new Date(), mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"))
    // const dc = await removeInvestiment(mongoose.Types.ObjectId("5ee657047038feff52a8f132"), new Date(), mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"))
    // const dc = await addTransaction(mongoose.Types.ObjectId("5ee657047038feff52a8f132"), {
    //     dateTime: new Date(),
    //     investiment: mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"),
    //     type: TransactionType.YIELD,
    //     value: 500
    // })
    // const dc = await addProfit3(mongoose.Types.ObjectId("5ee657047038feff52a8f132"), new Date(), {
    //     investiment: mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"),
    //     type: ProfitType.YIELD,
    //     value: 50
    // })
    // console.log(dc)

    // console.log(randomIntFromInterval(0, 500))
    // try {
    //     stockPriceClosing.run()
    //     // addTransaction(mongoose.Types.ObjectId("5ee657047038feff52a8f132"), mongoose.Types.ObjectId("5f06203b5b0180844e5aa64e"), new Date(), {
    //     //     dateTime: new Date(),
    //     //     type: TransactionType.YIELD,
    //     //     investiment: mongoose.Types.ObjectId("5f15af4242754a0949358ec0"),
    //     //     value: -20
    //     // })
    //     // financialOpening.run()
    // }
    // catch(e) {
    //     console.error(e)
    // }

    // console.log("sss")


    // BalanceService.createNewBalanceSheet(ObjectId.createFromHexString("5e2a417deababd0d50cfd797"))
    // BalanceService.setInitialAmount("5e53ded18a81591244a3613b", 50000)
    // BalanceService.updateStocks("BROKER_5e4d427bc74cc522245f7559_950846300", 110, 51.54)
    // BalanceService.updateStocks("BROKER_5e4bfa2e7be5c00764040ac5_853241699", 120, 51.54)
    // BalanceService.buildBalanceSheet()
    
    // updateStocks("BROKER_5e4d4a64d166972ea000cf98_945707800", 1, 51.54) //AZUL4
    // updateStocks("BROKER_5e4c065e7be5c00764040b31_861284800", 1, 12.50) //MGLU3

    // regenerateBalanceSheetAndHistory("5e2a417deababd0d50cfd797")
    // regenerateBalanceSheetAndHistory("5ea0e2483d30930834b0ec87")

    // console.log(new Date("2020-01-01T00:00:00.000Z"))
    // console.log(new Date("Wed Feb 19 2020 00:00:00 GMT-0300 (Brasilia Standard Time)"))

    // let p = await StockHistoryService.getLastClosingPrice("AZUL4", new Date("2020-02-19T02:00:00.000"))
    // Logger.debug(p)

    // let date = set(new Date(), { date: 1, month: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) 
    // const now = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) 

    // while(date < now) {
    //     date = addDays(date, 1)
    //     if (!isSaturday(date) && !isSunday(date)) {
    //         Logger.debug("-->", date)
    //     }
    // }

    // Logger.debug("-->", date)
    // const nova = subDays(date, 1)
    // Logger.debug("-->", nova)

    

    // Atividade
    // const ativ: Activity = {
    //     account: mongoose.Types.ObjectId("5eb5920a6c2cbf1ecc1784dc"),
    //     activityType: ActivityType.STOCK_TRACKER,
    //     icon: "ss",
    //     title: { text: "sdfs" },
    //     ref: "sadfsdf",
    //     details: [
    //         {
    //             title: {text: "sss"},
    //             description: {text: "33"},
    //         }
    //     ]
    // }

    // await ActivityModel.create(ativ)

    // BrokerAcc
    // const brkA: BrokerAccount = {
    //     account: mongoose.Types.ObjectId("5eb5920a6c2cbf1ecc1784dc"),
    //     accountName: "bisra",
    //     brokerCode: Brokers.CLEAR,
    //     extraData: {
    //         sessionId: "50"
    //     }
    // }
    // await BrokerAccountModel.create(brkA)

    // Broker
    // const broker: Broker = {
    //     code: Brokers.CLEAR,
    //     active: true,
    //     name: "clear",
    //     logo: "logo",
    //     investiments: [
    //         {
    //             description: "AZUL",
    //             logo: "hein",
    //             type: InvestimentType.STOCK,
    //             active: true,
    //             stock: {
    //                 symbol: "AZUL4",
    //                 stockLot: 100
    //             }
    //         }
    //     ]
    // }
    // await BrokerModel.create(broker)

    // Conta
    // const conta: Account = {
    //     profile: {
    //         name: "agnaldo",
    //         email: "adasdasd",
    //         nickname: "nick",
    //         password: "456456"
    //     },
    //     preference: {
    //         language: "pt_BR",
    //         addStockTrackerPaused: true,
    //         receiveBalanceNotification: true,
    //         receiveTradeNotification: true
    //     },
    //     active: true
    // }
    // await AccountModel.create(conta)

    // Profile
    // const profile: Profile = {
    //     name: "Agnaldo Citadin",
    //     nickname: "Agnaldo",
    //     email: "agnaldo.citadin@gmail.com",
    //     password: "123456",
    //     active: true,
    //     accounts: [
    //         {
    //             active: true,
    //             preference: {
    //                 language: "pt_BR",
    //                 addStockTrackerPaused: false,
    //                 receiveBalanceNotification: false,
    //                 receiveTradeNotification: false
    //             },
    //             simulation: false,
    //             devices: [
    //                 {
    //                     active: true,
    //                     deviceId: "device1",
    //                     token: "ASDV456"
    //                 }
    //             ]
    //         }
    //     ]

    // }

    // await ProfileModel.create(profile)

    // tracker
    // const tracker: StockTracker = {
    //     account: mongoose.Types.ObjectId("5ebbe3dd81f664438033c774"),
    //     brokerAccount: mongoose.Types.ObjectId("5ebbe3dd81f664438033c774"),
    //     frequency: "1M",
    //     strategy: "STRATEGY_ONE",
    //     status: "RUNNING",
    //     strategySetting: {
    //         autoAmountLimit: false,
    //         stockAmountLimit: 5000
    //     },
    //     stockInfo: {
    //         symbol: "MGLU3",
    //         stockLot: 100
    //     }
    // }

    // await StockTrackerModel.create(tracker)

    // const changes = {
    //     profile: {
    //         name: "Agnaldo Citadin 2",
    //     } as Profile,
    //     preference: { 
    //         language: "en_BR", 
    //         addStockTrackerPaused: false
    //     } as Preferences,
    //     active: true,
    // } as Account

    // const ser = (obj: any, last: string = "", serialization: any = {}) => {
    //     // let serialization = {}
    //     Object.keys(obj).forEach(field => {
    //         Logger.info(field)
    //         let value = (<any>obj)[field]
    //         if (value == undefined || null) return
    //         let toSerialize = typeof value === "object"

    //         if (toSerialize) {
    //             Logger.info(">", field, value)
    //             let idx = (last !== "") ? `${last}.${field}` : `${field}`
    //             ser(value, idx, serialization)
    //         }
    //         else {
    //             console.log(field, value)
    //             let idx = (last !== "") ? `${last}.${field}` : `${field}`
    //             serialization[idx] = (<any>obj)[field]
    //         }
    //     })

    //     return serialization
    //     // var newobj = {};
    //     // Object.keys( data ).forEach((key) => {
    //     //     if (typeof(data[key]) == "object" ) {
    //     //         Object.keys(data[key]).forEach(function(subkey) {
    //     //             (<any>newobj)[`${key}.${subkey}`] = data[key][subkey];
    //     //         })
    //     //     } 
    //     //     else {
    //     //         (<any>newobj)[key] = data[key];
    //     //     }
    //     // })

    //     // return newobj
    // }

    // let opa = ser(changes)
    // console.log(opa)

    // Logger.debug()
    
    // await updateAccount("5eb5b30f4591095c7c86de06", changes)

    // let res = await findByEmailPassword("adasdasd", "456456")
    // console.log(res)

    // const pwd = await bcrypt.hash('agnaldo', 10)
    // console.log(pwd)

    // const pwd2 = await bcrypt.hash('agnaldo', 10)

    // const eq = await bcrypt.compare("agnaldo", pwd)
    // console.log("pass", eq)

    // console.log("Done.")

    // const account: BrokerAccountInput = {
    //     account: "sjdfksjfks",
    //     accountName: "nome da conta",
    //     extraData: {
    //         cpf: "00963868942",
    //         birthdate: new Date(),
    //         signature: "assinatura",
    //         token: null,
    //         password: "pass",
    //         platformUID: "uiid",
    //         sessionId: "sessionid"
    //     }
    // }

    // const result = flatObject(account)
    // console.log(result)

    // await updateBrokerAccountById("5f10e99d71b2673f6812f184", {
    //     // brokerCode: Brokers.CLEAR,
    //     extraData: {
    //         password: "nova senha",
    //         // birthdate: null,
    //         signature: "WSE8974",
    //         cpf: "00963868942"
    //     }
    // })

    // await updateStockTrackerById("5f0fa8713d0a8e292c921d33", {
    //     strategySetting: {
    //         stockAmountLimit: 480.4
    //     }
    // })

    // const A = {
    //     account: "A1",
    //     accountName: "Account 1",
    //     extraData: {
    //         cpf: "cpf",
    //         password: "passwd"
    //     }
    // } as BrokerAccountInput

    // const B = {
    //     extraData: {
    //         signature: "59898"
    //     }
    // } as BrokerAccountInput

    // const res = mergeObjects(A, B)
    // console.log(res)

})