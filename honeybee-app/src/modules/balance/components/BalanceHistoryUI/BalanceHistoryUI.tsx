import { Button, Segment, Text } from 'native-base'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Theme } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { BalanceHistoryTimeline } from '../BalanceHistoryTimeline'
import { useBalanceHistoryUIHook } from './BalanceHistoryUIHook'

interface BalanceHistoryUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @returns
 */
export const BalanceHistoryUI: FC<BalanceHistoryUIProps> = ({ navigation }) => {
    
    const { 
        fail,
        balances,
        loading,
        grouping,
        handleRefresh,
        handleLoadMoreData,
        handleBalancePress,
        handleDay,
        handleWeek,
        handleMonth,
        handleYear
    } = useBalanceHistoryUIHook(navigation)

    return (
        <FlatLayout fail={fail} bgColor={Colors.WHITE}>
            <BackHeader title={ts("balance_history")}/>
            
            { !fail && 
                <React.Fragment>
                    <ButtonSegment>
                        <FirstButton first active={grouping === "day"} onPress={handleDay}>
                            <BtnText>Diário</BtnText>
                        </FirstButton>
                        <Btn active={grouping === "week"} onPress={handleWeek}>
                            <BtnText>Semanal</BtnText>
                        </Btn>
                        <Btn active={grouping === "month"} onPress={handleMonth}>
                            <BtnText>Mensal</BtnText>
                        </Btn>
                        <LastButton last active={grouping === "year"} onPress={handleYear}>
                            <BtnText>Anual</BtnText>
                        </LastButton>
                    </ButtonSegment>
                    <BalanceHistoryTimeline
                        loading={loading}
                        balances={balances}
                        minLengthToLoadMore={10}
                        numShimmerItens={balances.length || 5}
                        onRefresh={handleRefresh}
                        onPress={handleBalancePress}
                        onLoadMoreData={handleLoadMoreData}/>
                </React.Fragment>
            }
        </FlatLayout>
    )
}

const ButtonSegment = styled(Segment)`
    background-color: ${Colors.WHITE};
    height: 70px;
`

const Btn = styled(Button)`
    background-color: ${(props: any) => props.active ? Colors.BLUES_4 : Colors.BLUES_2};
    height: 40px;
`

const FirstButton = styled(Btn)`
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`

const LastButton = styled(Btn)`
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`

const BtnText = styled(Text)`
    color: ${Colors.WHITE};
    font-family: ${Theme.FONT_REGULAR};
    font-size: 13px;
`