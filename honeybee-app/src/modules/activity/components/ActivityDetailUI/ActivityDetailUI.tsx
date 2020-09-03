import { format } from 'date-fns'
import { Activity } from 'urelax-api'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationStackProp } from 'react-navigation-stack'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../../../core/Theme'
import { States } from '../../../../reducers/Reducer'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { Info } from '../../../../ui/components/Info'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'

interface ActivityDetailUIProps {
    navigation: NavigationStackProp
}

export const ActivityDetailUI: FC<ActivityDetailUIProps> = ({ navigation }) => {
    const activity = useSelector((state: States) => state.ACTIVITY.selectedActiviy || {} as Activity)
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={activity.title}/>
            <ScrollView>
                { activity && activity.details.map((detail, key) => <ActivityInfo key={key} name={detail.title} value={detail.description}/>) }
                <ActivityInfo name="Data/Hora" value={format(new Date(activity.dateTime), "dd/MM/yyyy 'at' HH:mm'h'")} />
            </ScrollView>
        </FlatLayout>
    )
}

const ActivityInfo = styled(Info)`
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
`