import { Activity, API } from "honeybee-api"

export const fetchActivities = async (accountID: string, page: number, qty: number, date: Date = new Date()): Promise<Activity[]> => {
    return API.Activity.fetchActivities({ account: accountID, date: date.toISOString(), page, qty }, `
        icon
        dateTime
        title
        details{
            title
            description
            hidden
        }
    `)
}
