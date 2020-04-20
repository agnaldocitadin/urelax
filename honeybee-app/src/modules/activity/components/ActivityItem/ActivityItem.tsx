import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import { Icon, Text, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import { Colors, Theme } from '../../../../core/Theme'
import { SHIMMER_COLORS } from '../../../../ui/components/Layout/Layout.style'

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
            <SActivityIcon type={Theme.ICON_PACK} name={activity.icon} bgColor={bgIcon}/>
        </ShimmerIcon>
        
        <SLeftInfo>
            <ShimmerActivity  autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
                <SActivityTitle>{activity.title}</SActivityTitle>
            </ShimmerActivity>
            <ShimmerDetail autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
                {renderDetails(activity)}
            </ShimmerDetail>            
        </SLeftInfo>

        { showDate && <SRightInfo>
            { activity.dateTime && <SDate>{format(new Date(activity.dateTime), "dd/MMM")}</SDate>}
            { activity.dateTime && <SDate>{format(new Date(activity.dateTime), "HH:mm")}</SDate>}
        </SRightInfo>}
        
    </SActivityBody>
)

const renderDetails = (activity: Activity) => {
    return activity.details && activity.details.map((detail, key) => !detail.hidden ? <SDetail key={key}>{detail.description}</SDetail> : null)
}

const SActivityBody = styled(View)`
    flex-direction: row;
`

const SLeftInfo = styled(View)`
    flex: 1;
    margin-left: 10px;
`

const SRightInfo = styled(View)`
    align-items: flex-end;
`

const SActivityIcon: any = styled(Icon)`
    background-color: ${(props: any) => props.bgColor};
    color: ${Colors.GRAY_3};
    font-size: 27px;
    border-radius: 20px;
    margin: 0 5px;
    padding: 1px;
`

const SActivityTitle = styled(Text)`
    font-family: ${Theme.FONT_SEMIBOLD};
    color: ${Colors.BLACK_2};
    font-size: 13px;
`

const SDetail = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    color: ${Colors.GRAY_1};
    font-size: 15px;
`

const SDate = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
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