import { useNavigation } from '@react-navigation/native'
import { AppliedInvestiment } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Badge } from '../../../components/Badge'
import { BaseButton } from '../../../components/BaseButton'
import { BackHeader } from '../../../components/Header/BackHeader'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import { TouchItem } from '../../../components/TouchItem'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, Icons, Typography, TypographyMedium } from '../../../theming'
import { Routes } from '../../Navigation/const'
import { useInvestimentUIHook } from './InvestimentUIHook'

export const InvestimentUI: FC = ({ children }) => {
    
    const {
        investiments,
        handleAdd,
        handleAnalysis,
        handleStatements,
        handleFilter,
        handleStockTracker
    } = useInvestimentUIHook()

    const { patrimony, currency, stocks } = investiments
    const nav = useNavigation()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("investiments")} right={
                <ButtonHeader icon="filter-variant" color={Colors.BLUES_1} onPress={handleFilter}/>
            }/>
            <ScrollView>
                <Patrimony>
                    <Typography textAlign="center">{ts("patrimony_amount")}</Typography>
                    <Typography textAlign="center" fontSize={28}>{utils.formatCurrency(patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                </Patrimony>
                <AddInvestimentBtn onPress={handleAdd}>
                    <TypographyMedium color={Colors.WHITE}>{"Investir "}</TypographyMedium>
                    <Icon size={15} color={Colors.WHITE} name={Icons.PLUS_CIRCLE}/>
                </AddInvestimentBtn>
                <Content>
                    <Currency investiments={investiments.currency} />
                    <Stocks investiments={investiments.stocks} handle={handleStockTracker}/>
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
        { investiments.length > 0 && <Divider>{ts("currency")}</Divider> }
        { investiments.map((currency, key) => (
            <Touch key={key} noChevron disabled>
                <Item>
                    <Typography>{currency.investiment?.description}</Typography>
                    <Row>
                    <Badge text={currency.brokerAccountName}/>
                    <Badge text={currency.investiment.broker.name} bgColor={Colors.BLUES_3}/>
                    </Row>
                </Item>
                <TypographyMedium>{utils.formatCurrency(currency.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
            </Touch>
        )) }
    </React.Fragment>
)

const Stocks: FC<{ investiments: AppliedInvestiment[], handle(): void }> = ({ investiments, handle }) => (
    <React.Fragment>
        { investiments.length > 0 && <Divider>{ts("stocks")}</Divider>}
        { investiments.map((stock, key) => (
            <Touch key={key} onPress={handle}>
                <Item>
                    <Typography>{stock.investiment?.description}</Typography>
                    <Row>
                        <Badge text={stock.brokerAccountName}/>
                        <Badge text={stock.investiment?.broker?.name} bgColor={Colors.BLUES_3}/>
                    </Row>
                </Item>
                <TypographyMedium>{utils.formatCurrency(stock.amount, { prefix: AppConfig.CURRENCY_PREFIX })}</TypographyMedium>
            </Touch>
        )) }
    </React.Fragment>
)

const Row = styled.View`
    flex-direction: row;
`

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
    margin: 12px 0;
    flex: 1;
`

const AddInvestimentBtn = styled(BaseButton)`
    background-color: ${Colors.BLUES_2};
    border-radius: 7px;
    height: 40px;
    width: 120px;
    position: absolute;
    right: 140px;
    top: 140px;
`

const Touch = styled(TouchItem)`
    padding: 0 ${DEFAULT_HORIZONTAL_SPACING}px;
`

const Divider = styled(SHeaderDivider)`
    padding: 0 ${DEFAULT_HORIZONTAL_SPACING}px;
`