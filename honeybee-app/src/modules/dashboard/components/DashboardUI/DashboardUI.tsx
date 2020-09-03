import { Activity, BalanceSheetHistorySummary, BalanceSheetSummary } from 'urelax-api'
import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { RefreshControl, TouchableNativeFeedback, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components/native'
import { ts } from '../../../../core/I18n'
import { Colors, Icons, Theme } from '../../../../core/Theme'
import { CashDisplay } from '../../../../ui/components/CashDisplay'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { MenuButton } from '../../../../ui/components/MenuButton'
import { TextIconDisplay } from '../../../../ui/components/TextIconDisplay'
import { Touchable } from '../../../../ui/components/Touchable'
import { ActivityItem } from '../../../activity/components/ActivityItem'
import { BalanceDetail } from '../../../balance'
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
    balanceSheetHistories: BalanceSheetHistorySummary
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
        refreshing,
        handleActivities, 
        handleBalances,
        handleStockTracker,
        handleSetting,
        handleNicknameTouch,
        handleBalancePress,
        handleRefresh
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
            <Refresher enabled={true} refreshing={refreshing} onRefresh={handleRefresh}>
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
            </Refresher>
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
        <CashDisplay 
            label={ts("total_amount")}
            value={balanceSummary.amount} 
            loading={balanceSummary.amount === undefined}
            showVariation={false}
            valueSize={25}/>

        <CashDisplay 
            label={ts("account_amount")}
            value={balanceSummary.credits} 
            loading={balanceSummary.credits === undefined}
            showVariation={false}
            valueSize={18}/>
            
        <Touchable noChevron onPress={onStockPress}>
            <CashDisplay 
                label={ts("stock_amount")}
                value={balanceSummary.stocks} 
                loading={balanceSummary.stocks === undefined}
                showVariation={false}
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
    <DashboardPanel>
        { !noBalances && 
            <TouchableNativeFeedback onPress={onBottomPress}>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <Date>{balanceSheetHistories.label}</Date>
                    <BalanceDetail balance={balanceSheetHistories}/>
                </View>
            </TouchableNativeFeedback>
        }
        { noBalances && <SNoBalances
            icon={Icons.CLOCK}
            title={ts("waiting_balance")}
            message={ts("waiting_balance_msg")}/>
        }
    </DashboardPanel>
)

const Date = styled.Text`
    font-family: ${Theme.FONT_REGULAR};
    text-align: center;
    color: ${Colors.BLACK_2};
`

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
    line-height: 90px;
`

const SMainHeader = styled(View)`
    flex: 1;
    padding-bottom: 40px;
`

const SMenuBox = styled(View)`
    flex-direction: row;
    justify-content: space-around;
    padding: 20px 10px;
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

const SNoBalances = styled(TextIconDisplay)`
    margin: auto 20px;
`

const Refresher = styled(RefreshControl)`
    flex: 1;
`