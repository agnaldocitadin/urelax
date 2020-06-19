import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ActivityHistory from '..'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Colors, Typography } from '../../../theming'

interface ActivityDetailUIProps {}

export const ActivityDetailUI: FC<ActivityDetailUIProps> = () => {
    const activity: Activity = ActivityHistory.select("selectedActiviy")
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={activity.title}/>
            <ScrollView>
                { activity && activity.details.map((detail, key) => 
                    <ActivityInfo
                        key={key}
                        title={detail.title}
                        description={detail.description}/>    
                )}
                <ActivityInfo 
                    title="Data/Hora" 
                    description={format(new Date(activity.createdAt), "dd/MM/yyyy 'at' HH:mm'h'")}/>
            </ScrollView>
        </FlatLayout>
    )
}

const ActivityInfo: FC<{ title: string, description: string, onPress?(): void }> = ({ title, description, onPress }) => {
    return <Info 
        title={<Typography>{title}</Typography>}
        description={<Typography>{description}</Typography>}
        onPress={onPress}/>
}