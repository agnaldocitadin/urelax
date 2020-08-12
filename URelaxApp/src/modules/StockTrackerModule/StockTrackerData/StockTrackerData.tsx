import { useNavigation } from '@react-navigation/native'
import { StockTracker } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import StockTrackerModule from '..'
import { Info } from '../../../components/Info'
import { HeaderDivider } from '../../../components/Layout/Layout.style'
import AppConfig from '../../../core/AppConfig'
import { animatedCallback } from '../../../core/Commons.hook'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, SymbolsImg, Typography } from '../../../theming'
import { StockTrackerWizardViews } from '../const'

interface StockTrackerDataProps {
    stockTracker: StockTracker
    isReview: boolean
}

export const StockTrackerData: FC<StockTrackerDataProps> = ({ stockTracker, isReview }) => {
    
    const { strategy, strategySetting, frequency, brokerAccount, stockInfo, status } = stockTracker
    const { autoAmountLimit, stockAmountLimit } = strategySetting || {}
    
    const navigation = useNavigation()
    const { editStockTrackerData } = StockTrackerModule.actions()
    const handleStrategy = animatedCallback(() => editStockTrackerData(StockTrackerWizardViews.STRATEGY, navigation))
    const handleFrequency = animatedCallback(() => editStockTrackerData(StockTrackerWizardViews.FREQUENCY, navigation))
    const handleTransaction = animatedCallback(() => editStockTrackerData(StockTrackerWizardViews.TRANSACTION, navigation))

    return (
        <React.Fragment>
            <StockLogo
                source={(SymbolsImg as any)[String(stockTracker?.stockInfo?.stock?.symbol)]}
                resizeMode="contain"/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("stock")}</Title>}
                description={<Description>{`${stockInfo?.description} (${stockInfo?.stock.symbol})`}</Description>}
                disabled={isReview}/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("broker")}</Title>}
                description={<Description>{brokerAccount?.brokerCode}</Description>}
                disabled={isReview}/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("account")}</Title>}
                description={<Description>{brokerAccount?.accountName}</Description>}
                disabled={isReview}/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("strategy")}</Title>}
                description={<Description>{strategy}</Description>}
                onPress={handleStrategy}
                disabled={isReview}/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("frequency")}</Title>}
                description={<Description>{frequency}</Description>}
                onPress={handleFrequency}
                disabled={isReview}/>

            <StockInfo
                isReview={isReview}
                title={<Title>{ts("status")}</Title>}
                description={<Description>{ts(String(status))}</Description>}
                disabled={isReview}/>

            <Divider>Negociação</Divider>
            <StockInfo
                isReview={isReview}
                title={<Title>{ts("max_trade_amount")}</Title>}
                description={<Description>{utils.formatCurrency(stockAmountLimit || 0, { prefix: AppConfig.CURRENCY_PREFIX })}</Description>}
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

const StockInfo = styled(Info)<{ isReview?: boolean }>`
    padding-left: ${({ isReview }) => isReview ? 0 : DEFAULT_HORIZONTAL_SPACING}px;
    padding-right: ${({ isReview }) => isReview ? 0 : DEFAULT_HORIZONTAL_SPACING}px;
`

const Title = styled(Typography)`
    color: ${Colors.GRAY_1};
`

const Description = styled(Typography)`
    font-size: 14px;
`

const Divider = styled(HeaderDivider)<{ isReview?: boolean }>`
    padding-left: ${({ isReview }) => isReview ? 0 : DEFAULT_HORIZONTAL_SPACING}px;
`