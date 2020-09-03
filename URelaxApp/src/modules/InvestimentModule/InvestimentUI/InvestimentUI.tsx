import { AppliedInvestiment } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Badge } from '../../../components/Badge'
import { BaseButton } from '../../../components/BaseButton'
import { HeaderDivider } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
import { TouchItem } from '../../../components/TouchItem'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { BaseIcon, Colors, DEFAULT_HORIZONTAL_SPACING, Typography, TypographyMedium } from '../../../theming'
import { useInvestimentUIHook } from './InvestimentUIHook'

export const InvestimentUI: FC = () => {
    
    const {
        fail,
        loading,
        investiments,
        refreshing,
        online,
        noInvestiments,
        handleAdd,
        handleStockTracker,
        handleRefresh
    } = useInvestimentUIHook()

    const { patrimony, currency, stocks } = investiments

    return (
        <PrimaryLayout
            title={ts("investiments")}
            loading={loading}
            fail={fail}>
            <RefreshControl
                style={{ flex: 1 }}
                enabled
                refreshing={refreshing}
                onRefresh={handleRefresh}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Patrimony>
                        <Typography
                            color={Colors.GRAY_1}
                            textAlign="center">
                            {ts("available_to_invest")}
                        </Typography>
                        <TypographyMedium textAlign="center" fontSize={28}>{utils.formatCurrency(patrimony || 0, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
                    </Patrimony>
                    <BtnContainer>
                        { online && <AddInvestimentBtn onPress={handleAdd}>
                            <BaseIcon
                                size={25}
                                color={Colors.WHITE}
                                name={"cart-outline"}/>
                        </AddInvestimentBtn>}
                    </BtnContainer>
                    <Content>
                        {
                            noInvestiments ?
                                <NoInvestiments
                                    iconColor={Colors.GRAY_2}
                                    icon={"flask-empty-outline"}
                                    title={ts("oops")}
                                    message={ts("nothing_here")} />
                            :
                                <React.Fragment>
                                    <Currency 
                                        investiments={currency} />
                                    <Stocks
                                        investiments={stocks}
                                        handle={handleStockTracker}/>
                                </React.Fragment>
                        }
                    </Content>
                </ScrollView>
            </RefreshControl>
        </PrimaryLayout>
    )
}

const Currency: FC<{ investiments: AppliedInvestiment[] }> = ({ investiments }) => (
    <React.Fragment>
        { investiments?.length > 0 && <Divider>{ts("currency")}</Divider> }
        { investiments?.map((currency, key) => (
            <Touch key={key} noChevron disabled>
                <Item>
                    <Typography>{currency.investiment?.description}</Typography>
                    <Badge text={currency.investiment.brokerCode || ""} bgColor={Colors.BLUES_3}/>
                    <Badge text={currency.brokerAccountName}/>
                </Item>
                <TypographyMedium>{utils.formatCurrency(currency.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
            </Touch>
        )) }
    </React.Fragment>
)

const Stocks: FC<{ investiments: AppliedInvestiment[], handle(item: AppliedInvestiment): void }> = ({ investiments, handle }) => (
    <React.Fragment>
        { investiments?.length > 0 && <Divider>{ts("stocks")}</Divider>}
        { investiments?.map((stock, key) => (
            <Touch key={key} onPress={() => handle(stock)}>
                <Item>
                    <Typography>{stock.investiment?.description}</Typography>
                    <Badge text={stock.investiment?.brokerCode} bgColor={Colors.BLUES_3}/>
                    <Badge text={stock.brokerAccountName}/>
                </Item>
                <TypographyMedium>{utils.formatCurrency(stock.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
            </Touch>
        )) }
    </React.Fragment>
)

const Patrimony = styled.View`
    background-color: ${Colors.BG_3};
    justify-content: center;
    align-items: center;
    height: 160px;
`

const Content = styled.View`
    padding-bottom: ${DEFAULT_HORIZONTAL_SPACING}px;
`

const Item = styled.View`
    justify-content: space-between;
    margin: 15px 0;
    height: 70px;
    flex: 1;
`

const AddInvestimentBtn = styled(BaseButton)`
    background-color: ${Colors.BLUES_2};
    border-radius: 30px;
    height: 60px;
    width: 60px;
`

const BtnContainer = styled.View`
    align-items: center;
    position: absolute;
    width: 100%;
    top: 130px;
`

const Touch = styled(TouchItem)`
    padding: 0 ${DEFAULT_HORIZONTAL_SPACING}px;
`

const Divider = styled(HeaderDivider)`
    padding: 0 ${DEFAULT_HORIZONTAL_SPACING}px;
`

const NoInvestiments = styled(TextIconDisplay)`
    height: 100%;
    justify-content: center;
    align-items: center;
`


// const handleAnalysis = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS), [])
// const handleStatements = useCallback(() => navigation.navigate(Routes.STATEMENT), [])
{/* <BaseButton onPress={handleAdd}>
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
</BaseButton> */}