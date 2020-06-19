import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { TouchItem, TouchItemProps } from '../../../components/TouchItem'
import { Colors, DEFAULT_HORIZONTAL_PADDING, DEFAULT_VERTICAL_PADDING, SHIMMER_COLORS, Typography, TypographyMedium } from '../../../theming'

interface ActivityItemProps extends TouchItemProps {
    activity: Activity
    loading?: boolean
    style?: ViewStyle
}

export const ActivityItem: FC<ActivityItemProps> = ({ 
    activity, 
    style, 
    loading,
    ...others
}) => (
    <Item {...others}>
        <ShimmerIcon autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
            <IIcon 
                name={activity.icon}
                color={Colors.GRAY_3}
                size={27}/>
        </ShimmerIcon>
        <LeftContent>
            <TypographyMedium color={Colors.BLACK_2}>{activity.title}</TypographyMedium>
            {renderDetails(activity)}
        </LeftContent>
        <RightContent>
            { activity.createdAt && <TypoDate>{format(new Date(activity.createdAt), "dd/MMM")}</TypoDate>}
            { activity.createdAt && <TypoDate>{format(new Date(activity.createdAt), "HH:mm")}</TypoDate>}
        </RightContent>
    </Item>
)

const renderDetails = (activity: Activity) => {
    return activity.details && activity.details.map((detail, key) => !detail.hidden ? 
        <Typography
            color={Colors.GRAY_1}
            fontSize={15}
            key={key}>
            {detail.description}
        </Typography>
    : null)
}

const Item = styled(TouchItem)`
    padding: ${DEFAULT_VERTICAL_PADDING}px ${DEFAULT_HORIZONTAL_PADDING}px;
`

const LeftContent = styled.View`
    flex: 1;
`

const RightContent = styled.View`
    align-items: flex-end;
`

const IIcon = styled(Icon)`
    padding: 1px;
`

const TypoDate = styled(Typography)`
    color: ${Colors.GRAY_2};
    font-size: 12px;
    text-align: right;
    width: 70px;
`

const ShimmerIcon = styled(ShimmerPlaceHolder)`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    margin: 0 5px;
`