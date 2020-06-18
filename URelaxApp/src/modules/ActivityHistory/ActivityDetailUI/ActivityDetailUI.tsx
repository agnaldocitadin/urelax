import { format } from 'date-fns'
import { Activity } from 'honeybee-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../components/Layout/Layout.style'
import { Colors } from '../../../theming'
import ActivityHistory from '..'

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
                        name={detail.title}
                        value={detail.description}/>
                    )
                }
                <ActivityInfo
                    name="Data/Hora"
                    value={format(new Date(activity.createdAt), "dd/MM/yyyy 'at' HH:mm'h'")}/>
            </ScrollView>
        </FlatLayout>
    )
}

const ActivityInfo = styled(Info)`
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
`