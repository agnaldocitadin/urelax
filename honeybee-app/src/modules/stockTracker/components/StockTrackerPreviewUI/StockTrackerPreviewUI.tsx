import { utils } from 'js-commons'
import { View } from 'native-base'
import React, { FC } from 'react'
import { Image } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, Icons, SymbolsImg } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { ButtonHeader } from '../../../../ui/components/Header/ButtonHeader'
import { Info } from '../../../../ui/components/Info'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { ActivityTimeline } from '../../../activity/components/ActivityTimeline'
import { StockTrackerControlButton } from '../StockTrackerControlButton'
import { useStockTrackerPreviewUIHook } from './StockTrackerPreviewUIHook'

interface StockTrackerPreviewUIProps {
    navigation: NavigationStackProp
}

export const StockTrackerPreviewUI: FC<StockTrackerPreviewUIProps> = ({ navigation }) => {
    
    const { 
        stockTracker, 
        activities, 
        stockBalance,
        fail,
        handleSettings, 
        handleSelectActivity, 
        handleRefresh, 
        handleLoadMoreData,
        handleStockTrackerAction
    } = useStockTrackerPreviewUIHook(navigation)

    return (
        <FlatLayout fail={fail}>
            <BackHeader 
                title={stockTracker.stock?.description || ""}
                right={
                    <ButtonHeader
                        color={Colors.BLUES_1} 
                        icon={Icons.SETTINGS} 
                        onPress={handleSettings}/>
                }/>

            { !fail && <ActivityTimeline
                loading={activities.length === 0}
                activities={activities}
                minLengthToLoadMore={30}
                onRefresh={handleRefresh}
                onLoadMoreData={handleLoadMoreData}
                onPress={handleSelectActivity}
                header={
                    <React.Fragment>
                        <InfoHeader>
                            <LeftColumn>
                                <InfoItem 
                                    name={ts("stock_amount")}
                                    value={utils.formatCurrency(stockBalance.amount, { prefix: AppConfig.CURRENCY_PREFIX })}
                                    nameFontSize={15}
                                    valueFontSize={24}/>

                                <InfoItem 
                                    name={ts("buy_average_price")}
                                    value={utils.formatCurrency(stockBalance.averagePrice, { prefix: AppConfig.CURRENCY_PREFIX })}
                                    valueFontSize={18}/>

                                <InfoItem 
                                    name={ts("quantity")}
                                    value={String(stockBalance.quantity)}
                                    valueFontSize={18}/>

                                <InfoItem 
                                    name={ts("stock_tracker_status")}
                                    value={ts(stockTracker?.status || "")}/>

                            </LeftColumn>
                            <RightColumn>
                                <Image 
                                    source={SymbolsImg[stockTracker.stock.symbol]} 
                                    resizeMode="contain"
                                    style={{ maxWidth: 100, maxHeight: 60 }}/>
                            </RightColumn>
                        </InfoHeader>
                        <ButtonView>
                            <StockTrackerControlButton 
                                buttonSize={60} 
                                iconSize={30}
                                status={stockTracker?.status} 
                                onPress={handleStockTrackerAction}/>
                        </ButtonView>
                    </React.Fragment>
                }/>}
        </FlatLayout>
    )
}

const InfoHeader = styled(View)`
    background-color: ${Colors.WHITE};
    flex-direction: row;
    margin-bottom: 30px;
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.BG_3};
    padding-left: ${FORM_PADDING};
    padding-bottom: 10px;
    padding-top: 10px;
`

const LeftColumn = styled(View)`
    flex: 1;
`

const RightColumn = styled(View)`
    justify-content: space-between;
    width: 130px;
    margin-top: 15px;
`

const InfoItem = styled(Info)`
    padding: 10px 0;
`

const ButtonView = styled(View)`
    position: absolute;
    bottom: 0;
    right: 30px;
`