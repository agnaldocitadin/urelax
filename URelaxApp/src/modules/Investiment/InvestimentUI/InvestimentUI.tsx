import { useNavigation } from '@react-navigation/native'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { BaseButton } from '../../../components/BaseButton'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography } from '../../../theming'
import { Routes } from '../../Navigation/const'
import { useInvestimentUIHook } from './InvestimentUIHook'

export const InvestimentUI: FC = ({ children }) => {
    
    const {
        investiments,
        handleAdd,
        handleAnalysis,
        handleStatements
    } = useInvestimentUIHook()

    const { patrimony, currency, stocks } = investiments
    const nav = useNavigation()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("investiments")}/>

            <BaseButton onPress={handleAdd}>
                <Typography>ADD</Typography>
            </BaseButton>
            <BaseButton onPress={handleAnalysis}>
                <Typography>ANALYSIS</Typography>
            </BaseButton>
            <BaseButton onPress={handleStatements}>
                <Typography>STATEMENTS</Typography>
            </BaseButton>
            <BaseButton onPress={() => nav.navigate(Routes.ACTIVITY_LIST)}>
                <Typography>ACTIVITIES</Typography>
            </BaseButton>

            <Info 
                title={<Typography>{ts("patrimony_amount")}</Typography>}
                description={
                    <Typography fontSize={30}>{utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                }/>

            <SHeaderDivider>{ts("currency")}</SHeaderDivider>
            <Typography>{currency.investiment?.description} - {currency.amount}</Typography>

            { stocks.length > 0 && <SHeaderDivider>{ts("stocks")}</SHeaderDivider>}
            { stocks.map((stock, key) => (
                <Typography key={key}>{stock.investiment?.description || ""} - {stock.amount} - {stock.investiment?.broker.name || ""}</Typography>
            )) }

        </FlatLayout>
    )
}