import { useNavigation } from '@react-navigation/native'
import { AppliedInvestiment } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { Badge } from '../../../components/Badge'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_PADDING, Typography, TypographyMedium } from '../../../theming'
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
            <ScrollView>
                <Patrimony>
                    <Typography>{ts("today")}</Typography>
                    <View>
                        <Typography textAlign="center">{ts("patrimony_amount")}</Typography>
                        <Typography textAlign="center" fontSize={30}>{utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                    </View>
                </Patrimony>
                
                <Content>
                    <Currency investiments={investiments.currency} />
                    <Stocks investiments={investiments.stocks} />
                    <Stocks investiments={investiments.stocks} />
                </Content>
            </ScrollView>

            

            

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

        </FlatLayout>
    )
}

const Currency: FC<{ investiments: AppliedInvestiment[] }> = ({ investiments }) => (
    <React.Fragment>
        { investiments.length > 0 && <SHeaderDivider>{ts("currency")}</SHeaderDivider> }
        { investiments.map((curr, key) => (
            <Item key={key}>
                <Typography>{curr.investiment?.description}</Typography>
                <Row between>
                    <Row>
                        <Badge text="Conta 0023-1"/>
                        <Badge text="Clear" bgColor={Colors.GRAY_2}/>
                    </Row>
                    <TypographyMedium>{utils.formatCurrency(curr.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
                </Row>
            </Item>
        )) }
    </React.Fragment>
)

const Stocks: FC<{ investiments: AppliedInvestiment[] }> = ({ investiments }) => (
    <React.Fragment>
        { investiments.length > 0 && <SHeaderDivider>{ts("stocks")}</SHeaderDivider>}
        { investiments.map((stock, key) => (
            <Item key={key}>
                <Typography>{stock.investiment?.description}</Typography>
                <Row between>
                    <Row>
                        <Badge text="Conta 0023-1"/>
                        <Badge text="Easyinvest" bgColor={Colors.GRAY_2}/>
                    </Row>
                    <TypographyMedium>{utils.formatCurrency(stock.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
                </Row>
            </Item>
        )) }
    </React.Fragment>
)

const Row = styled.View<{ between?: boolean }>`
    flex-direction: row;
    justify-content: ${({ between }) => between ? "space-between" : "flex-start"};
`

const Patrimony = styled.View`
    background-color: ${Colors.BG_3};
    align-items: center;
    justify-content: space-evenly;
    height: 150px;
`

const Content = styled.View`
    padding: 0 ${DEFAULT_HORIZONTAL_PADDING}px;
    padding-bottom: ${DEFAULT_HORIZONTAL_PADDING}px;
`

const Item = styled.View`
    margin: 12px 0;
`