import React, { FC, useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { CashDisplay } from '../../../../ui/components/CashDisplay'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { ButtonHeader } from '../../../../ui/components/Header/ButtonHeader'
import { InfiniteFlatList } from '../../../../ui/components/InfiniteFlatList'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { GenericTextIcon } from '../../../../ui/components/Layout/Layout.style'
import { StockTrackerListItem } from '../StockTrackerListItem'
import { useStockTrackerListUIHook } from './StockTrackerListUIHook'

const RENDER_SHIMMERS = 4

interface StockTrackerListUIProps {
    navigation: NavigationStackProp
}

export const StockTrackerListUI: FC<StockTrackerListUIProps> = ({ navigation }) => {
    
    const { 
        fail,
        loading,
        stockTrackers,
        stockAmount,
        stockVariation,
        handleAddStockTracker, 
        handleStockTrackerPreview,
        handleStockAmount
    } = useStockTrackerListUIHook(navigation)
    
    const renderStockTracker = useCallback(({ item }: any) => (
        <StockTrackerListItem 
            stockTracker={item}
            amount={handleStockAmount(item)}
            onStockTrackerPress={handleStockTrackerPreview} 
            loading={loading}/>
    ), [loading])
    
    const hasData = stockTrackers.length > 0
    
    return (
        <FlatLayout fail={fail}>
            <BackHeader title={ts("stock_trackers")} right={
                <ButtonHeader icon={Icons.PLUS_CIRCLE} color={Colors.BLUES_1} onPress={handleAddStockTracker}/>
            }/>

            { !fail && <InfiniteFlatList
                showShimmer={loading}
                numShimmerItens={RENDER_SHIMMERS}
                minLengthToLoadMore={20}
                data={stockTrackers}
                renderItem={renderStockTracker}
                keyExtractor={(item, index) => `stck${index}`}
                ListEmptyComponent={
                    <GenericTextIcon
                        icon={Icons.ALERT_CIRCLE}
                        title={ts("none_stock_trackers")}
                        message={ts("stock_trackers_adding_tip")}/>
                }
                ListHeaderComponent={
                    (loading || hasData) ? 
                    <StockAmount
                        loading={loading}
                        label={ts("stock_amount")}
                        value={stockAmount}
                        valueSize={25}
                        variation={stockVariation}/>
                    : null
                }/>}
            
        </FlatLayout>
    )
}

const StockAmount = styled(CashDisplay)`
    background-color: ${Colors.WHITE};
    border-bottom-color: ${Colors.BG_3};
    border-bottom-width: 1px;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    width: 100%;
`