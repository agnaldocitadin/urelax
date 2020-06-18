import { Activity, API } from "honeybee-api"

export const fetchActivities = async (accountID: string, page: number, qty: number, date: Date = new Date()): Promise<Activity[]> => {
    return API.Activity.fetchActivities({ accountID, date: date.toISOString(), page, qty }, `
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
