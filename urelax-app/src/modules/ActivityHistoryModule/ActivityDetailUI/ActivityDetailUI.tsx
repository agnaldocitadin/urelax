import { format } from 'date-fns'
import { Activity } from 'urelax-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ActivityHistory from '..'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { Colors, Typography } from '../../../theming'

interface ActivityDetailUIProps {}

export const ActivityDetailUI: FC<ActivityDetailUIProps> = () => {
    const activity: Activity = ActivityHistory.select("selectedActiviy")
    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={activity.title}/>}>
            <ScrollView>
                <MarginBox noMarginTop>
                    { activity && activity.details.map((detail, key) => 
                        <ActivityInfo
                            key={key}
                            title={detail.title}
                            description={detail.description}/>    
                    )}
                    <ActivityInfo 
                        title="Data/Hora" 
                        description={format(new Date(activity.createdAt), "dd/MM/yyyy 'at' HH:mm'h'")}/>
                </MarginBox>
            </ScrollView>
        </FlatLayout>
    )
}

const ActivityInfo: FC<{ title: string, description: string, onPress?(): void }> = ({ title, description, onPress }) => {
    return <Info 
        title={<Typography color={Colors.GRAY_1}>{title}</Typography>}
        description={<Typography fontSize={15}>{description}</Typography>}
        onPress={onPress}/>
}