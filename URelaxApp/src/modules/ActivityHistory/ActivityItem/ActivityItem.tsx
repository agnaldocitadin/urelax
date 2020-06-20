import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Typography, TypographyMedium } from '../../../theming'

interface ActivityItemProps {
    activity: Activity
    loading?: boolean
    color?: string
    style?: ViewStyle
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity, style, loading, color = Colors.BLACK_2 }) => (
    <React.Fragment>
        <LeftContent>
            <TypographyMedium color={color}>{activity.title}</TypographyMedium>
            {renderDetails(activity, color)}
        </LeftContent>
        <RightContent>
            { activity.createdAt && <TypoDate color={color}>{format(new Date(activity.createdAt), "dd/MMM")}</TypoDate>}
            { activity.createdAt && <TypoDate color={color}>{format(new Date(activity.createdAt), "HH:mm")}</TypoDate>}
        </RightContent>
    </React.Fragment>
)

const renderDetails = (activity: Activity, color: string) => {
    return activity.details && activity.details.map((detail, key) => !detail.hidden ? 
        <Typography
            color={color}
            fontSize={15}
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
    width: 70px;
`