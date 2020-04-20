import dotenv from 'dotenv-flow'
import { connectDB } from '../src/db/mongo'
import { regenerateBalanceSheetAndHistory } from '../src/services/balance.sheet.service'


beforeAll(async () => {
    dotenv.config()
    await connectDB()
})

it("teste", async () => {
    jest.setTimeout(50000)


    // BalanceService.createNewBalanceSheet(ObjectId.createFromHexString("5e2a417deababd0d50cfd797"))
    // BalanceService.setInitialAmount("5e53ded18a81591244a3613b", 50000)
    // BalanceService.updateStocks("BROKER_5e4d427bc74cc522245f7559_950846300", 110, 51.54)
    // BalanceService.updateStocks("BROKER_5e4bfa2e7be5c00764040ac5_853241699", 120, 51.54)
    // BalanceService.buildBalanceSheet()
    
    // updateStocks("BROKER_5e4d4a64d166972ea000cf98_945707800", 1, 51.54) //AZUL4
    // updateStocks("BROKER_5e4c065e7be5c00764040b31_861284800", 1, 12.50) //MGLU3

    regenerateBalanceSheetAndHistory("5e2a417deababd0d50cfd797")
    regenerateBalanceSheetAndHistory("5d6a88e4f857b851188f58ea")

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

})