import { utils } from 'js-commons'
import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography } from '../../../theming'
import { useInvestimentUIHook } from './InvestimentUIHook'

export const InvestimentUI: FC = ({ children }) => {
    
    const {
        patrimony,
        currency,
        stocks
    } = useInvestimentUIHook()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("investiments")}/>

            <Info 
                name={ts("patrimony_amount")}
                value={utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                valueFontSize={30}/>
            
            <SHeaderDivider>{ts("currency")}</SHeaderDivider>
            <Typography>{currency.investiment?.description} - {currency.amount}</Typography>

            { stocks.length > 0 && <SHeaderDivider>{ts("stocks")}</SHeaderDivider>}
            { stocks.map(stock => (
                <Typography>{stock.investiment?.description || ""} - {stock.amount} - {stock.investiment?.broker.name || ""}</Typography>
            )) }

        </FlatLayout>
    )
}