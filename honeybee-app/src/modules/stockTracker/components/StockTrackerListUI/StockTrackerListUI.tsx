import { utils } from 'js-commons'
import React, { FC, useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { ButtonHeader } from '../../../../ui/components/Header/ButtonHeader'
import { InfiniteFlatList } from '../../../../ui/components/InfiniteFlatList'
import { Info } from '../../../../ui/components/Info'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { GenericTextIcon } from '../../../../ui/components/Layout/Layout.style'
import { StockTrackerListItem } from '../StockTrackerListItem'
import { useStockTrackerListUIHook } from './StockTrackerListUIHook'

const RENDER_SHIMMERS = 7

interface StockTrackerListUIProps {
    navigation: NavigationStackProp
}

export const StockTrackerListUI: FC<StockTrackerListUIProps> = ({ navigation }) => {
    
    const { 
        fail,
        loading,
        stockTrackers,
        stockAmount,
        handleAddBee, 
        handleBeePreview 
    } = useStockTrackerListUIHook(navigation)
    
    const renderStockTracker = useCallback(({ item }: any) => (
        <StockTrackerListItem 
            stockTracker={item} 
            onStockTrackerPress={handleBeePreview} 
            loading={loading}/>
    ), [loading])
    
    const hasData = stockTrackers.length > 0
    
    return (
        <FlatLayout fail={fail}>
            <BackHeader title={ts("stock_trackers")} right={
                <ButtonHeader icon={Icons.PLUS_CIRCLE} color={Colors.BLUES_1} onPress={handleAddBee}/>
            }/>

            { !fail && <InfiniteFlatList
                showShimmer={loading}
                numShimmerItens={4}
                minLengthToLoadMore={20}
                data={stockTrackers}
                renderItem={renderStockTracker}
                keyExtractor={(item, index) => `bee${index}`}
                ListEmptyComponent={
                    <GenericTextIcon
                        icon={Icons.ALERT_CIRCLE}
                        title={ts("none_stock_trackers")}
                        message={ts("stock_trackers_adding_tip")}/>
                }
                ListHeaderComponent={
                    (loading || hasData) ? <StockAmount
                        loading={loading}
                        name={ts("stock_amount")}
                        value={utils.formatCurrency(stockAmount, { prefix: AppConfig.CURRENCY_PREFIX })}
                        valueFontSize={25}/> : null
                }/>}
            
        </FlatLayout>
    )
}

const StockAmount = styled(Info)`
    background-color: ${Colors.WHITE};
    border-bottom-color: ${Colors.BG_3};
    border-bottom-width: 1px;
    align-items: center;
    margin: 0 auto;
    width: 100%;
`