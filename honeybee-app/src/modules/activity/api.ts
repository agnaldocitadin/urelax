import { Activity, API } from "honeybee-api"

export const fetchUserActivitiesQuery = async (userAccountId: string, page: number, qty: number, date: Date = new Date()): Promise<Activity[]> => {
    return API.fetchUserActivitiesQuery(userAccountId, date, page, qty, `
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
