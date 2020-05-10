import * as services from './services'
export * from './models'

const init = () => {
    // stockTrackerPlayground.schedule()
}

export default {
    init,
    ...services
}