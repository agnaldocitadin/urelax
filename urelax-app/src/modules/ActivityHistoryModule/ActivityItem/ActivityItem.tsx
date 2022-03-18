import { format, isThisISOWeek, isToday, isYesterday } from 'date-fns'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Activity } from 'urelax-api'
import { ts } from '../../../core/I18n'
import { Colors, Typography, TypographyMedium } from '../../../theming'

interface ActivityItemProps {
    activity: Activity
    color?: string
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity, color = Colors.BLACK_1 }) => (
    <React.Fragment>
        <LeftContent>
            <TypographyMedium color={color}>{activity.title}</TypographyMedium>
            {renderDetails(activity, color)}
        </LeftContent>
        <RightContent>
            { activity.createdAt && <TypoDate color={Colors.GRAY_1}>{dateLabel(new Date(activity.createdAt))}</TypoDate>}
            { activity.createdAt && <TypoDate color={Colors.GRAY_1}>{format(new Date(activity.createdAt), "HH:mm")}</TypoDate>}
        </RightContent>
    </React.Fragment>
)

const dateLabel = (date: Date) => {
    if (isToday(date)) {
        return ts("today")
    }

    if (isYesterday(date)) {
        return ts("yesterday")
    }

    if (isThisISOWeek(date)) {
        return ts(format(date, "EEEE").toLocaleLowerCase())
    }
    
    return format(date, "dd/MMM")
}

const renderDetails = (activity: Activity, color: string) => {
    return activity.details && activity.details.map((detail, key) => !detail.hidden ? 
        <Typography
            color={Colors.GRAY_3}
            key={key}>
            {detail.description}
        </Typography>
    : null)
}

const LeftContent = styled.View`
    flex: 1;
`

const RightContent = styled.View`
    align-items: flex-end;
`

const TypoDate = styled(Typography)`
    font-size: 12px;
    text-align: right;
    width: 73px;
`