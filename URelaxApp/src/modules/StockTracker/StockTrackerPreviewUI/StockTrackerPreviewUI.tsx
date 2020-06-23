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
import { Colors, DEFAULT_HORIZONTAL_PADDING, DEFAULT_VERTICAL_PADDING, Icons, SymbolsImg, Typography } from '../../../theming'
import { StatementTimeline } from '../../Statement/StatementTimeline'
import { StockTrackerControlButton } from '../StockTrackerControlButton'
import { useStockTrackerPreviewUIHook } from './StockTrackerPreviewUIHook'

interface StockTrackerPreviewUIProps {}

export const StockTrackerPreviewUI: FC<StockTrackerPreviewUIProps> = ({}) => {
    
    const { 
        stockTracker,
        amount,
        transactions, 
        fail,
        handleSettings, 
        handleSelectActivity, 
        handleRefresh, 
        handleLoadMoreData,
        handleStockTrackerAction
    } = useStockTrackerPreviewUIHook()

    return (
        <FlatLayout fail={fail}>
            <BackHeader 
                title={stockTracker.stockInfo?.description || ""}
                right={
                    <ButtonHeader
                        color={Colors.BLUES_1} 
                        icon={Icons.SETTINGS} 
                        onPress={handleSettings}/>
                }/>

            { !fail && 
                <StatementTimeline
                    data={transactions}
                    minLengthToLoadMore={30}
                    onRefresh={handleRefresh}
                    onEndPageReached={handleLoadMoreData}
                    onPress={handleSelectActivity}
                    ListHeaderComponent={
                        <React.Fragment>
                            <InfoHeader>
                                <LeftColumn>
                                    <InfoItem 
                                        title={<Typography>{ts("stock_amount")}</Typography>} 
                                        description={<Typography>{utils.formatCurrency(amount, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>}/>

                                    <InfoItem 
                                        title={<Typography>{ts("buy_average_price")}</Typography>} 
                                        description={<Typography>{utils.formatCurrency(stockTracker.buyPrice, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>}/>

                                    <InfoItem 
                                        title={<Typography>{ts("quantity")}</Typography>} 
                                        description={<Typography>{stockTracker.qty}</Typography>}/>
                                </LeftColumn>
                                <RightColumn>
                                    <Image 
                                        source={SymbolsImg.AZUL4} 
                                        resizeMode="contain"
                                        style={{ maxWidth: 100, maxHeight: 60 }}/>
                                </RightColumn>
                            </InfoHeader>
                            <ButtonView>
                                <StockTrackerControlButton 
                                    status={stockTracker?.status} 
                                    onPress={handleStockTrackerAction}/>
                            </ButtonView>
                        </React.Fragment>
                    }
                />}
        </FlatLayout>
    )
}

const InfoHeader = styled.View`
    padding-bottom: ${DEFAULT_HORIZONTAL_PADDING}px;
    border-bottom-color: ${Colors.BG_3};
    background-color: ${Colors.WHITE};
    border-bottom-width: 1px;
    flex-direction: row;
`

const LeftColumn = styled.View`
    padding-left: ${DEFAULT_HORIZONTAL_PADDING}px;
    flex: 1;
`

const RightColumn = styled.View`
    justify-content: space-between;
    margin-top: 15px;
    width: 130px;
`

const InfoItem = styled(Info)`
    padding-bottom: ${DEFAULT_VERTICAL_PADDING / 2}px;
    padding-left: 0;
`

const ButtonView = styled.View`
    position: absolute;
    right: 30px;
    bottom: 0;
`