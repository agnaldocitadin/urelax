import { differenceInHours, differenceInMinutes, set } from "date-fns"
import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"

export type STFrequencyDef = { 
    type: string, 
    hasToUpdate: Function, 
    inMinutes: number 
}

export class StockTrackerFrequency {

    static ONE_MINUE: STFrequencyDef = { 
        type: "1M",
        inMinutes: 1,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => {
            const _refDate = set(refDate, { seconds: 0, milliseconds: 0 })
            const _lastUpdate = set(lastUpdate, { seconds: 0, milliseconds: 0 })
            return differenceInMinutes(_refDate, _lastUpdate) >= 1
        }
    }

    static THREE_MINUES: STFrequencyDef = { 
        type: "3M",
        inMinutes: 3,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInMinutes(refDate, lastUpdate) >= 3
    }

    static FIVE_MINUES: STFrequencyDef = { 
        type: "5M",
        inMinutes: 5,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInMinutes(refDate, lastUpdate) >= 5
    }

    static FIFTEEN_MINUES: STFrequencyDef = { 
        type: "15M",
        inMinutes: 15, 
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInMinutes(refDate, lastUpdate) >= 15
    }

    static THIRTY_MINUES: STFrequencyDef = { 
        type: "30M",
        inMinutes: 30,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInMinutes(refDate, lastUpdate) >= 30
    }

    static FOURTY_FIVE_MINUES: STFrequencyDef = { 
        type: "45M",
        inMinutes: 45,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInMinutes(refDate, lastUpdate) >= 45
    }

    static ONE_HOUR: STFrequencyDef = { 
        type: "1H",
        inMinutes: 60,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInHours(refDate, lastUpdate) >= 1
    }

    static TWO_HOUR: STFrequencyDef = { 
        type: "2H",
        inMinutes: 120,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInHours(refDate, lastUpdate) >= 2
    }

    static THREE_HOUR: STFrequencyDef = { 
        type: "3H",
        inMinutes: 180,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInHours(refDate, lastUpdate) >= 3
    }

    static FOUR_HOUR: STFrequencyDef = { 
        type: "4H",
        inMinutes: 240,
        hasToUpdate: (refDate: Date, lastUpdate: Date) => differenceInHours(refDate, lastUpdate) >= 4
    }

    static convert(type: String): STFrequencyDef {
        const value = Object.values(StockTrackerFrequency).find(f => f.type === type)
        if (value) return value
        Logger.throw(ErrorCodes.FREQUENCY_NOT_FOUND)
    }
}