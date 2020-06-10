import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { SHIMMER_COLORS } from '../../../components/Layout/Layout.style'
import { Colors, Typography, TypographySemibold } from '../../../theming'

interface ActivityItemProps {
    activity: Activity
    showDate?: boolean
    loading?: boolean
    bgIcon?: string
    style?: ViewStyle
}

export const ActivityItem: FC<ActivityItemProps> = ({ activity, style, loading, showDate = true, bgIcon = Colors.BG_1 }) => (
    <SActivityBody style={style}>

        <ShimmerIcon autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
            <SActivityIcon 
                name={activity.icon}
                bgColor={bgIcon}
                color={Colors.GRAY_3}
                size={27}/>
        </ShimmerIcon>
        
        <SLeftInfo>
            <ShimmerActivity  autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
                <TypographySemibold 
                    color={Colors.BLACK_2}
                    fontSize={13}>
                    {activity.title}
                </TypographySemibold>
            </ShimmerActivity>
            <ShimmerDetail autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
                {renderDetails(activity)}
            </ShimmerDetail>            
        </SLeftInfo>

        { showDate && <SRightInfo>
            { activity.createdAt && <SDate>{format(new Date(activity.createdAt), "dd/MMM")}</SDate>}
            { activity.createdAt && <SDate>{format(new Date(activity.createdAt), "HH:mm")}</SDate>}
        </SRightInfo>}
        
    </SActivityBody>
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

const SActivityBody = styled.View`
    flex-direction: row;
`

const SLeftInfo = styled.View`
    flex: 1;
    margin-left: 10px;
`

const SRightInfo = styled.View`
    align-items: flex-end;
`

const SActivityIcon = styled(Icon)<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 20px;
    margin: 0 5px;
    padding: 1px;
`

const SDate = styled(Typography)`
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

const ShimmerActivity = styled(ShimmerPlaceHolder)`
    width: 55%;
    margin-bottom: 10px;
`

const ShimmerDetail = styled(ShimmerPlaceHolder)`
    width: 85%;
    margin-bottom: 5px;
`

const ShimmerDate = styled(ShimmerPlaceHolder)`
    width: 70px;
    height: 13px;
    margin-bottom: 5px;
`

const ShimmerHour = styled(ShimmerDate)`
    width: 50px;
`