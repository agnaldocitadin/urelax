import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { Colors } from '../../../../core/Theme'
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
        handleRefresh,
        handleLoadMoreData,
        handleBalancePress
    } = useBalanceHistoryUIHook(navigation)

    return (
        <FlatLayout fail={fail} bgColor={Colors.WHITE}>
            <BackHeader title={ts("balance_history")}/>
            { !fail && <BalanceHistoryTimeline
                loading={balances.length === 0}
                balances={balances}
                minLengthToLoadMore={10}
                onRefresh={handleRefresh}
                onPress={handleBalancePress}
                onLoadMoreData={handleLoadMoreData}/>}
        </FlatLayout>
    )
}