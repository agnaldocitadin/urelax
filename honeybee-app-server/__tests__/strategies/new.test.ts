import dotenv from 'dotenv-flow'
import { connectDB } from '../../src/db/mongo'
import { BBStochasticRSIStrategy } from "../../src/modules/Stock/strategies/bb.stochastic.rsi.strategy"
import Logger from '../../src/logger'

const STRATEGY_TYPE = BBStochasticRSIStrategy

const TEST_PRESETS = [
    { 
        symbol: "AZUL4",
        ranges: [
            { start: "2019-12-27T00:00:00.000Z", end: "2019-12-28T00:00:00.000Z" },
        ]
    }
]

beforeAll(async () => {
    dotenv.config()
    await connectDB()
})

it("BBStochasticRSIStrategy Performance Test", async () => {
    jest.setTimeout(50000)

    const impl: any = new STRATEGY_TYPE()
    Logger.debug("Loaded strategy: %s", STRATEGY_TYPE.name)
    
    // Bee Mock
    let bee = {}

    for (let preset of TEST_PRESETS) {

        for (let range of preset.ranges) {

            for (let event of history) {
                
            }
        }
    }
})