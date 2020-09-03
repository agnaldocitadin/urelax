import { StockTracker } from 'urelax-api'
import { utils } from 'js-commons'
import { Text } from 'native-base'
import React, { FC } from 'react'
import { Image, ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, SymbolsImg, Theme } from '../../../../core/Theme'
import { Info } from '../../../../ui/components/Info'
import { FORM_PADDING, SHIMMER_COLORS } from '../../../../ui/components/Layout/Layout.style'
import { Touchable } from '../../../../ui/components/Touchable'

interface StockTrackerListItemProps {
    stockTracker: StockTracker
    amount: number
    loading?: boolean
    style?: ViewStyle
    onStockTrackerPress?(stockTracker: StockTracker): void
}

export const StockTrackerListItem: FC<StockTrackerListItemProps> = ({ stockTracker, amount, onStockTrackerPress, style, loading }) => {
    return (
        <Touch style={style} onPress={() => onStockTrackerPress && onStockTrackerPress(stockTracker)} noChevron={!onStockTrackerPress}>
            <Shimmer autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                <Image source={SymbolsImg[stockTracker.stock?.symbol]} resizeMode="contain" style={{ maxWidth: 60, maxHeight: 60 }} />
            </Shimmer>
            <StockInfo
                name={stockTracker.stock?.description} 
                nameFontSize={16}
                value={utils.formatCurrency(amount, { prefix: AppConfig.CURRENCY_PREFIX })}
                valueFontSize={14}
                loading={loading}
                bottom={
                    <ShimmerStatus autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                        <Status>{ts(stockTracker.status || "")}</Status>
                    </ShimmerStatus>
                }/>
        </Touch>
    )
}

const Touch = styled(Touchable)`
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
    align-items: center;
`

const StockInfo = styled(Info)`
    flex: 2;
    padding-left: ${FORM_PADDING};
`

const Status = styled(Text)`
    color: ${Colors.BLUES_4};
    font-family: ${Theme.FONT_MEDIUM};
    font-size: 14px;
`

const Shimmer = styled(ShimmerPlaceHolder)`
    width: 50px;
    height: 50px;
`

const ShimmerStatus = styled(ShimmerPlaceHolder)`
    width: 120px;
    height: 10px;
    margin: 4px 0;
`
