import { EMA } from "technicalindicators"

type Stoch = {
    d: number
    k: number
    close: number
}

enum StochasticRegion {
    TOP = 1,
    BOTTOM = -1
}

export enum Trends {
    UP = "UP",
    DOWN = "DOWN",
    INDECISION = "INDECISION"
}

export class StochasticAnalizer {

    static HIGH_BAND = 80
    static LOW_BAND = 20

    region: StochasticRegion
    lastTop: Stoch[]
    previousTop: Stoch[]
    lastBottom: Stoch[]
    previousBottom: Stoch[]

    constructor() {
        this.reset()
    }

    addValue(value: Stoch) {
        this.addTopValue(value)
        this.addBottomValue(value)
    }

    isAtTop() {
        return this.region === StochasticRegion.TOP
    }

    isAtBottom() {
        return this.region === StochasticRegion.BOTTOM
    }

    reset() {
        this.region = StochasticRegion.BOTTOM
        this.lastTop = []
        this.previousTop = []
        this.lastBottom = []
        this.previousBottom = []
    }

    private isTrendUp() {
        const previousCloses = this.previousTop.map(stoch => stoch.close)
        const lastCloses = this.lastTop.map(stoch => stoch.close)
        let previousAverage = EMA.calculate({ values: previousCloses, period: previousCloses.length })[0]
        let lastAverage = EMA.calculate({ values: lastCloses, period: lastCloses.length })[0]
        return previousAverage > 0 && previousAverage < lastAverage
    }

    private isTrendDown() {
        const previousCloses = this.previousBottom.map(stoch => stoch.close)
        const lastCloses = this.lastBottom.map(stoch => stoch.close)
        let previousAverage = EMA.calculate({ values: previousCloses, period: previousCloses.length })[0]
        let lastAverage = EMA.calculate({ values: lastCloses, period: lastCloses.length })[0]
        return previousAverage > 0 && previousAverage > lastAverage
    }

    getTrend(): Trends {
        if (this.isTrendDown()) return Trends.DOWN
        if (this.isTrendUp()) return Trends.UP
        return Trends.INDECISION
    }

    private addTopValue(value: Stoch) {
        if (value.d >= StochasticAnalizer.HIGH_BAND) {
            if (this.region !== StochasticRegion.TOP) {
                this.region = StochasticRegion.TOP
                this.previousTop = this.lastTop
                this.lastTop = []
            }
            this.lastTop.push(value)
        }
    }

    private addBottomValue(value: Stoch) {
        if (value.d <= StochasticAnalizer.LOW_BAND) {
            if (this.region !== StochasticRegion.BOTTOM) {
                this.region = StochasticRegion.BOTTOM
                this.previousBottom = this.lastBottom
                this.lastBottom = []
            }
            this.lastBottom.push(value)
        }
    }

}