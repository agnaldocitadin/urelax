import { StockTracker } from 'honeybee-api'
import { Text } from 'native-base'
import React from 'react'
import { Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, SymbolsImg, Theme } from '../../../../core/Theme'
import { animatedCallback, formatCurrency } from '../../../../globals/Utils'
import { Routes } from '../../../../navigations/Navigator'
import { Info } from '../../../../ui/components/Info'
import { FORM_PADDING, SHeaderDivider } from '../../../../ui/components/Layout/Layout.style'

interface StockTrackerDataProps {
    navigation: NavigationStackProp
    stockTracker: StockTracker
    isReview: boolean
    noPadding?: boolean
}

export const StockTrackerData = withNavigation(({ stockTracker, navigation, isReview, noPadding }: StockTrackerDataProps) => {
    
    const { strategy, frequency, stock, brokerAccount, stockAmountLimit, autoAmountLimit } = stockTracker
    const handleStrategy = animatedCallback(() => navigation.navigate(Routes.StockTrackerStrategyUI))
    const handleFrequency = animatedCallback(() => navigation.navigate(Routes.StockTrackerFrequencyUI))
    const handleTransaction = animatedCallback(() => navigation.navigate(Routes.StockTrackerTransactionUI))

    return (
        <React.Fragment>
            <StockLogo source={SymbolsImg[stockTracker.stock?.symbol]} noPadding={noPadding}/>
            <SInfo name="Ativo" value={`${stock?.description} (${stock?.symbol})`} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Corretora" value={brokerAccount?.brokerCode} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Conta" value={brokerAccount?.accountName} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Estratégia" value={strategy?.description} onPress={handleStrategy} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Frequência" value={frequency?.description} onPress={handleFrequency} disabled={isReview} noPadding={noPadding}/>
            <Divider noPadding={noPadding}>Negociação</Divider>
            <SInfo name="Valor máximo negociável" value={formatCurrency(stockAmountLimit || 0, { prefix: AppConfig.CURRENCY_PREFIX })} onPress={handleTransaction} disabled={isReview} noPadding={noPadding}/>
            { autoAmountLimit && <AutoAmountLimit noPadding={noPadding}>{ts("stock_tracker_auto_transaction_active")}</AutoAmountLimit>}
        </React.Fragment>
    )
})

const StockLogo: any = styled(Image)`
    width: 100px;
    height: 100px;
    margin-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    margin-top: ${FORM_PADDING};
    margin-left: auto;
    margin-right: auto;
`

const SInfo: any = styled(Info)`
    padding-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    padding-right: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
`

const Divider: any = styled(SHeaderDivider)`
    margin-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
`

const AutoAmountLimit: any = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    padding: 10px 15px;
    margin: 0 ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    margin-bottom: ${FORM_PADDING};
    border-width: 1px;
    border-color: ${Colors.BLUES_2};
    color: ${Colors.BLUES_2};
    font-size: 14px;
    border-radius: 5px;
`