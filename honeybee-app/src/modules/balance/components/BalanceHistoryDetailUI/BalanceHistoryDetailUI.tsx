import { utils } from "js-commons"
import { View } from "native-base"
import React, { FC } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useSelector } from "react-redux"
import styled from "styled-components"
import AppConfig from "../../../../core/AppConfig"
import { ts } from "../../../../core/I18n"
import { Colors } from "../../../../core/Theme"
import { States } from "../../../../reducers/Reducer"
import { BackHeader } from "../../../../ui/components/Header/BackHeader"
import { Info } from "../../../../ui/components/Info"
import { FlatLayout } from "../../../../ui/components/Layout/FlatLayout"
import { VariationMonitor } from "../../../../ui/components/VariationMonitor"


interface BalanceHistoryDetailUIProps {
    navigation: NavigationStackProp
}

export const BalanceHistoryDetailUI: FC<BalanceHistoryDetailUIProps> = ({ navigation }) => {
    const balance = useSelector((state: States) => state.BALANCE.selectedBalanceHistory)
    const money = (balance.amount || 0) * ((balance.amountVariation || 0) / 100)
    let result = ts("no_variation")
    if (money > 0) result = ts("gain")
    if (money < 0) result = ts("loss")

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("balance_from", { period: balance.label })}/>
            <BalanceInfo name={result} nameFontSize={17} valueFontSize={25} value={utils.formatCurrency(money, { prefix: AppConfig.CURRENCY_PREFIX })}/>
            <Data>
                <Variation>
                    <Info name={ts("total_amount")} value={utils.formatCurrency(balance.amount || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                    <VariationMonitor value={balance.amountVariation} fontSize={15}/>
                </Variation>

                <Variation>
                    <Info name={ts("account_amount")} value={utils.formatCurrency(balance.credits || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                    <VariationMonitor value={balance.creditVariation} fontSize={15}/>
                </Variation>

                <Variation>
                    <Info name={ts("stock_amount")} value={utils.formatCurrency(balance.stocks || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                    <VariationMonitor value={balance.stockVariation} fontSize={15}/>
                </Variation>
            </Data>
        </FlatLayout>
    )
}

const Data = styled(View)`
    margin: 0 35px;
`

const BalanceInfo = styled(Info)`
    align-items: center;
    margin: 0 auto;
`

const Variation = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`