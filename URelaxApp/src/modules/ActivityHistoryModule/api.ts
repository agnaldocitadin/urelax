import { Activity, ActivityType, API } from "honeybee-api"

export const fetchActivities = async (options: {
        id?: string
        accountID?: string
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