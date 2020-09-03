import { Activity, ActivityType, API } from 'urelax-api'

export const fetchActivities = async (options: {
        id?: string
        accounts?: string[]
        ref?: string 
        activityType?: ActivityType
        date?: string
        page?: number
        qty?: number
    }): Promise<Activity[]> => {
    return API.Activity.fetchActivities(options, `
        icon
        title
        createdAt
        details {
            title
            description
            hidden
        }
    `)
}