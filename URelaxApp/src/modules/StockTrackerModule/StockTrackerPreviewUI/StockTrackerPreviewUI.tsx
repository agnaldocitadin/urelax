import { utils } from 'js-commons'
import React, { FC } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Icons, SymbolsImg, Typography } from '../../../theming'
import { StatementTimeline } from '../../StatementModule/StatementTimeline'
import { StockTrackerControlButton } from '../StockTrackerControlButton'
import { useStockTrackerPreviewUIHook } from './StockTrackerPreviewUIHook'

interface StockTrackerPreviewUIProps {}

export const StockTrackerPreviewUI: FC<StockTrackerPreviewUIProps> = ({}) => {
    
    const { 
        stockTracker,
        amount,
        transactions,
        loading,
        fail,
        btnState,
        handleSettings, 
        handleRefresh, 
        handleLoadMoreData,
        handleStockTrackerAction
    } = useStockTrackerPreviewUIHook()

    return (
        <FlatLayout
            fail={fail}
            loading={loading}
            header={
                <BackHeader 
                    title={stockTracker?.stockInfo?.description || ""}
                    right={
                        <ButtonHeader
                            icon={Icons.SETTINGS} 
                            onPress={handleSettings}/>
                    }/>
            }>

            { stockTracker && !fail && 
                <StatementTimeline
                    data={transactions}
                    minLengthToLoadMore={30}
                    onRefresh={handleRefresh}
                    onEndPageReached={handleLoadMoreData}
                    ListHeaderComponent={
                        <React.Fragment>
                            <InfoHeader>
                                <LeftColumn>
                                    <InfoItem 
                                        title={<Typography>{ts("stock_amount")}</Typography>} 
                                        description={<Typography>{utils.formatCurrency(amount, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>}/>

                                    <InfoItem 
                                        title={<Typography>{ts("buy_average_price")}</Typography>} 
                                        description={<Typography>{utils.formatCurrency(stockTracker.buyPrice || 0, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>}/>

                                    <InfoItem 
                                        title={<Typography>{ts("quantity")}</Typography>} 
                                        description={<Typography>{stockTracker.qty || 0}</Typography>}/>
                                </LeftColumn>
                                <RightColumn>
                                    { stockTracker && <Image 
                                        source={(SymbolsImg as any)[stockTracker?.stockInfo?.stock?.symbol ?? ""]}
                                        resizeMode="contain"
                                        style={{ maxWidth: 100, maxHeight: 60 }}/>}
                                </RightColumn>
                            </InfoHeader>
                            <StockTrackerControlButton 
                                status={stockTracker?.status} 
                                onPress={handleStockTrackerAction}
                                activityState={btnState}/>
                        </React.Fragment>
                    }
                />}
        </FlatLayout>
    )
}

const InfoHeader = styled.View`
    padding-bottom: ${DEFAULT_HORIZONTAL_SPACING}px;
    border-bottom-color: ${Colors.BG_3};
    background-color: ${Colors.WHITE};
    border-bottom-width: 1px;
    flex-direction: row;
`

const LeftColumn = styled.View`
    padding-left: ${DEFAULT_HORIZONTAL_SPACING}px;
    flex: 2;
`

const RightColumn = styled.View`
    padding-top: ${DEFAULT_VERTICAL_SPACING}px;
    padding-right: ${DEFAULT_HORIZONTAL_SPACING}px;
`

const InfoItem = styled(Info)`
    padding-bottom: ${DEFAULT_VERTICAL_SPACING / 2}px;
    padding-left: 0;
`