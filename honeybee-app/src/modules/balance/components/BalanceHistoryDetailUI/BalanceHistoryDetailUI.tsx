import React, { FC } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useSelector } from "react-redux"
import styled from "styled-components/native"
import { ts } from "../../../../core/I18n"
import { Colors } from "../../../../core/Theme"
import { States } from "../../../../reducers/Reducer"
import { BackHeader } from "../../../../ui/components/Header/BackHeader"
import { FlatLayout } from "../../../../ui/components/Layout/FlatLayout"
import { FORM_PADDING } from "../../../../ui/components/Layout/Layout.style"
import { BalanceDetail } from "../BalanceDetail/BalanceDetail"

interface BalanceHistoryDetailUIProps {
    navigation: NavigationStackProp
}

export const BalanceHistoryDetailUI: FC<BalanceHistoryDetailUIProps> = ({ navigation }) => {
    const balance = useSelector((state: States) => state.BALANCE.selectedBalanceHistory)
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("balance_from", { period: balance.label })}/>
            <Detail>
                <BalanceDetail balance={balance}/>
            </Detail>
        </FlatLayout>
    )
}

const Detail = styled.View`
    justify-content: space-around;
    margin: ${FORM_PADDING};
    height: 300px;
`