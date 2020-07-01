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
import { DEFAULT_VERTICAL_SPACING, SymbolsImg, Typography } from '../../../theming'
import { Routes } from '../../Navigation/const'

interface StockTrackerDataProps {
    stockTracker: StockTracker
    isReview: boolean
    noPadding?: boolean
}

export const StockTrackerData: FC<StockTrackerDataProps> = ({ stockTracker, isReview, noPadding }) => {
    
    const { strategy, strategySetting, frequency, brokerAccount, stockInfo, status } = stockTracker
    const { autoAmountLimit, stockAmountLimit } = strategySetting

    const navigation = useNavigation()
    const handleStrategy = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_STRATEGY))
    const handleFrequency = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_FREQUENCY))
    const handleTransaction = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_TRANSACTION))

    return (
        <React.Fragment>
            <StockLogo
                source={SymbolsImg[String(stockTracker?.stockInfo?.stock?.symbol)]}
                resizeMode="contain"/>

            <Info 
                title={<Typography>{ts("stock")}</Typography>}
                description={<Typography>{`${stockInfo.description} (${stockInfo.stock.symbol})`}</Typography>}
                disabled={isReview}/>

            <Info
                title={<Typography>{ts("broker")}</Typography>}
                description={<Typography>{brokerAccount?.brokerCode}</Typography>}
                disabled={isReview}/>

            <Info
                title={<Typography>{ts("account")}</Typography>}
                description={<Typography>{brokerAccount?.accountName}</Typography>}
                disabled={isReview}/>

            <Info
                title={<Typography>{ts("strategy")}</Typography>}
                description={<Typography>{strategy}</Typography>}
                onPress={handleStrategy}
                disabled={isReview}/>

            <Info
                title={<Typography>{ts("frequency")}</Typography>}
                description={<Typography>{frequency}</Typography>}
                onPress={handleFrequency}
                disabled={isReview}/>

            <Info
                title={<Typography>{ts("status")}</Typography>}
                description={<Typography>{ts(status)}</Typography>}
                disabled={isReview}/>

            <Divider>Negociação</Divider>
            <Info
                title={<Typography>{ts("max_trade_amount")}</Typography>}
                description={<Typography>{utils.formatCurrency(stockAmountLimit || 0, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>}
                onPress={handleTransaction}
                disabled={isReview}/>

            { autoAmountLimit && <Typography>{ts("stock_tracker_auto_transaction_active")}</Typography>}
        </React.Fragment>
    )
}

const StockLogo = styled.Image`
    margin: 0 auto;
    margin-top: ${DEFAULT_VERTICAL_SPACING}px;
`

const Divider = styled(SHeaderDivider)`
    margin: 0 ${DEFAULT_VERTICAL_SPACING}px;
`