import { Activity, BalanceSheetHistorySummary, BalanceSheetSummary } from 'honeybee-api'
import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons, Theme } from '../../../../core/Theme'
import { CashDisplay } from '../../../../ui/components/CashDisplay'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { MenuButton } from '../../../../ui/components/MenuButton'
import { TextIconDisplay } from '../../../../ui/components/TextIconDisplay'
import { Touchable } from '../../../../ui/components/Touchable'
import { ActivityItem } from '../../../activity/components/ActivityItem'
import { BalanceHistoryItem } from '../../../balance/components/BalanceHistoryItem'
import { DashboardPanel } from '../DashboardPanel'
import { useDashboardUIHook } from './DashboardUIHook'

interface HomeDashboardProps {
    navigation: NavigationStackProp
}

interface BalanceInfoProps {
    activity: Activity
    balanceSummary: BalanceSheetSummary
    onBottomPress(): void
    onStockPress(): void
}

interface BalanceHistoriesProps {
    balanceSheetHistories: BalanceSheetHistorySummary[]
    noBalances: boolean
    onBottomPress(): void
    onBalancePress(): void
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const DashboardUI: FC<HomeDashboardProps> = ({ navigation }) => {
    
    const {
        nickname, 
        lastActivity, 
        balanceSummary,
        balanceHistorySummary,
        noBalances,
        handleActivities, 
        handleBalances,
        handleStockTracker,
        handleSetting,
        handleNicknameTouch,
        handleBalancePress
    } = useDashboardUIHook(navigation)

    const balanceInfo = (
        <BalanceInfo
            key={0}
            activity={lastActivity} 
            balanceSummary={balanceSummary} 
            onBottomPress={handleActivities}
            onStockPress={handleStockTracker}/>
    )

    const balanceHistory = (
        <BalanceHistories 
            key={1}
            balanceSheetHistories={balanceHistorySummary} 
            noBalances={noBalances} 
            onBottomPress={handleBalances}
            onBalancePress={handleBalancePress}/>
    )

    return (
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <SNickName onPress={handleNicknameTouch}>{ts("welcome")}, {nickname}!</SNickName>
            <SMainHeader>
                <AppIntroSlider
                    renderDoneButton={() => false}
                    renderNextButton={() => false}
                    renderItem={item => item.item}
                    paginationStyle={{ height: 23, bottom: 0 } as any}
                    dotStyle={dotStyle}
                    activeDotStyle={activeDotStyle}
                    slides={[balanceInfo, balanceHistory]} />
            </SMainHeader>
            <SMenuBox>
                <MenuButton label={ts("stock_trackers")} icon={Icons.CHART_LINE_VARIANT} action={handleStockTracker}/>
                <MenuButton label={ts("settings")} icon={Icons.SETTINGS} action={handleSetting}/>
            </SMenuBox>
        </FlatLayout>
    )
}

/**
 *
 *
 * @param {*} { activity, balanceSummary, onBottomPress }
 */
const BalanceInfo: FC<BalanceInfoProps> = ({ activity, balanceSummary, onBottomPress, onStockPress }) => (
    <DashboardPanel onBottomPress={onBottomPress} bottom={<SActivityItem activity={activity} showDate={false} loading={balanceSummary.amount === undefined} bgIcon={Colors.WHITE}/>}>
        <SHomeCredit 
            label={ts("total_amount")}
            value={balanceSummary.amount} 
            variation={balanceSummary.amountVariation}
            variationSize={13}
            loading={balanceSummary.amount === undefined}
            valueSize={25}/>

        <SHomeCredit 
            label={ts("account_amount")}
            value={balanceSummary.credits} 
            variation={balanceSummary.creditVariation}
            variationSize={13}
            loading={balanceSummary.credits === undefined}
            valueSize={18}/>
            
        <Touchable noChevron onPress={onStockPress}>
            <SHomeCredit 
                label={ts("stock_amount")}
                value={balanceSummary.stocks} 
                variation={balanceSummary.stockVariation} 
                variationSize={13}
                loading={balanceSummary.stockVariation === undefined}
                valueSize={18}/>
        </Touchable>
    </DashboardPanel>
)

/**
 *
 *
 * @param {*} { balanceSheetHistories, onBottomPress, noBalances }
 */
const BalanceHistories: FC<BalanceHistoriesProps> = ({ balanceSheetHistories, onBottomPress, onBalancePress, noBalances }) => (
    <DashboardPanel 
        onBottomPress={onBottomPress} 
        bottom={!noBalances ? <SBalancesLink>{ts("balance_history")}</SBalancesLink> : undefined}>
        {!noBalances && <SLastBalances>{ts("last_balances")}</SLastBalances>}
        {renderBalanceHistories(balanceSheetHistories, onBalancePress)}
        { noBalances && <SNoBalances
            icon={Icons.CLOCK}
            title={ts("waiting_balance")}
            message={ts("waiting_balance_msg")}/>
        }
    </DashboardPanel>
)

/**
 *
 *
 * @param {BalanceSheetHistorySummary[]} balances
 * @returns
 */
const renderBalanceHistories = (balances: BalanceSheetHistorySummary[], onBalancePress: (balance: BalanceSheetHistorySummary) => void) => {
    const maxAmount = balances.reduce((max, value) => value.amount && value.amount > max ? value.amount : max, 0)
    return balances.map((balance, k) =>
        <Touchable onPress={() => onBalancePress(balance)} noChevron>
            <SBalanceHistoryItem 
                key={k} 
                label={balance.label}
                value={balance.amount}
                valueReference={maxAmount}
                variation={balance.amountVariation}/>
        </Touchable>
    )
}

const dotStyle: ViewStyle = {
    backgroundColor: "rgba(29, 161, 242, .2)", 
    width: 8,
    height: 8 
}

const activeDotStyle: ViewStyle = { 
    backgroundColor: "rgba(29, 161, 242, .7)", 
    width: 8, 
    height: 8
}

const SNickName = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.BLACK_2};
    font-size: 16px;
    text-align: center;
    margin: 20px 0;
`

const SMainHeader = styled(View)`
    flex: 1;
    padding-bottom: 30px;
`

const SMenuBox = styled(View)`
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 10px;
`

const SHomeCredit = styled(CashDisplay)`
    padding: 0 15px;
`

const SActivityItem = styled(ActivityItem)`
    flex: 1;
`

const SBalancesLink = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.BLACK_2};
    text-align: center;
    font-size: 14px;
    flex: 1;
`

const SBalanceHistoryItem = styled(BalanceHistoryItem)`
    margin: 10px 15px;
    flex: 1;
`

const SLastBalances = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    color: ${Colors.GRAY_3};
    font-size: 14px;
    margin-left: 20px;
`

const SNoBalances = styled(TextIconDisplay)`
    margin: auto 20px;
`