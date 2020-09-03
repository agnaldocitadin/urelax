import { BalanceSheetHistorySummary } from 'urelax-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Info } from '../../../../ui/components/Info'
import { VariationMonitor } from '../../../../ui/components/VariationMonitor'

interface BalanceDetailProps {
    balance: BalanceSheetHistorySummary
}

export const BalanceDetail: FC<BalanceDetailProps> = ({ balance }) => {

    const profit = balance.profit || 0
    let result = ts("no_variation")
    if (profit > 0) result = ts("gain")
    if (profit < 0) result = ts("loss")

    return (
        <React.Fragment>
            <BalanceInfo name={result} nameFontSize={17} valueFontSize={25} value={utils.formatCurrency(profit, { prefix: AppConfig.CURRENCY_PREFIX })}/>
            <Variation>
                <Amount name={ts("total_amount")} value={utils.formatCurrency(balance.amount || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                <VariationMonitor value={balance.amountVariation} fontSize={15}/>
            </Variation>

            <Variation>
                <Amount name={ts("account_amount")} value={utils.formatCurrency(balance.credits || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                <VariationMonitor value={balance.creditVariation} fontSize={15}/>
            </Variation>

            <Variation>
                <Amount name={ts("stock_amount")} value={utils.formatCurrency(balance.stocks || 0, { prefix: AppConfig.CURRENCY_PREFIX })}/>
                <VariationMonitor value={balance.stockVariation} fontSize={15}/>
            </Variation>
        </React.Fragment>
    )
}

const BalanceInfo = styled(Info)`
    align-items: center;
    margin: 0 auto;
    padding: 0;
`

const Amount = styled(Info)`
    padding: 0;
`

const Variation = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`