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

interface StockTrackerDataProps {
    stockTracker: StockTracker
    isReview: boolean
    noPadding?: boolean
}

export const StockTrackerData: FC<StockTrackerDataProps> = ({ stockTracker, isReview, noPadding }) => {
    
    const { strategy, strategySetting, frequency, brokerAccount, stockInfo } = stockTracker
    const { autoAmountLimit, stockAmountLimit } = strategySetting

    const navigation = useNavigation()
    const handleStrategy = animatedCallback(() => navigation.navigate(""))
    const handleFrequency = animatedCallback(() => navigation.navigate(""))
    const handleTransaction = animatedCallback(() => navigation.navigate(""))

    return (
        <React.Fragment>
            <StockLogo source={SymbolsImg.LREN3} noPadding={noPadding} resizeMode="contain"/>
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
    /* width: 150px;
    height: 100px;
    margin-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    margin-top: ${FORM_PADDING};
    margin-left: auto;
    margin-right: auto; */
`

const SInfo: any = styled(Info)`
    /* padding-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    padding-right: ${(props: any) => props.noPadding ? 0 : FORM_PADDING}; */
`

const Divider: any = styled(SHeaderDivider)`
    /* margin-left: ${(props: any) => props.noPadding ? 0 : FORM_PADDING}; */
`

const AutoAmountLimit: any = styled(Typography)`
    /* font-family: ${Theme.FONT_REGULAR};
    padding: 10px 15px;
    margin: 0 ${(props: any) => props.noPadding ? 0 : FORM_PADDING};
    margin-bottom: ${FORM_PADDING};
    border-width: 1px;
    border-color: ${Colors.BLUES_2};
    color: ${Colors.BLUES_2};
    font-size: 14px;
    border-radius: 5px; */
`