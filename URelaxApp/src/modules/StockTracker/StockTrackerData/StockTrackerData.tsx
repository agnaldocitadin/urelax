import { useNavigation } from '@react-navigation/native'
import { StockTracker } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Info } from '../../../components/Info'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import AppConfig from '../../../core/AppConfig'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { SymbolsImg, Typography } from '../../../theming'
import { Routes } from '../../Navigation/const'

interface StockTrackerDataProps {
    stockTracker: StockTracker
    isReview: boolean
    noPadding?: boolean
}

export const StockTrackerData: FC<StockTrackerDataProps> = ({ stockTracker, isReview, noPadding }) => {
    
    const { strategy, strategySetting, frequency, brokerAccount, stockInfo } = stockTracker
    const { autoAmountLimit, stockAmountLimit } = strategySetting

    const navigation = useNavigation()
    const handleStrategy = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_STRATEGY))
    const handleFrequency = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_FREQUENCY))
    const handleTransaction = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_TRANSACTION))

    return (
        <React.Fragment>
            <StockLogo source={SymbolsImg[stockTracker.stockInfo.stock.symbol]} noPadding={noPadding} resizeMode="contain"/>
            <SInfo name="Ativo" value={`${stockInfo.description} (${stockInfo.stock.symbol})`} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Corretora" value={brokerAccount?.brokerCode} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Conta" value={brokerAccount?.accountName} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Estratégia" value={strategy} onPress={handleStrategy} disabled={isReview} noPadding={noPadding}/>
            <SInfo name="Frequência" value={frequency} onPress={handleFrequency} disabled={isReview} noPadding={noPadding}/>
            <Divider noPadding={noPadding}>Negociação</Divider>
            <SInfo name="Valor máximo negociável" value={utils.formatCurrency(stockAmountLimit || 0, { prefix: AppConfig.CURRENCY_PREFIX })} onPress={handleTransaction} disabled={isReview} noPadding={noPadding}/>
            { autoAmountLimit && <AutoAmountLimit noPadding={noPadding}>{ts("stock_tracker_auto_transaction_active")}</AutoAmountLimit>}
        </React.Fragment>
    )
}

const StockLogo: any = styled.Image`
    
`

const SInfo: any = styled(Info)`
    
`

const Divider: any = styled(SHeaderDivider)`
    
`

const AutoAmountLimit: any = styled(Typography)`
    
`