import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { Button, Colors, TypographyMedium } from '../../../theming'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerSettingUIHook } from './StockTrackerSettingUIHook'

interface StockTrackerSettingUIProps {}

export const StockTrackerSettingUI: FC<StockTrackerSettingUIProps> = ({}) => {

    const { 
        stockTracker,
        showDestroyBtn,
        handleDestroyStockTracker 
    } = useStockTrackerSettingUIHook()

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={ts("stock_tracker_settings")}/>}>
            
            <ScrollView>
                <MarginBox>
                    <StockTrackerData
                        isReview={!showDestroyBtn}
                        stockTracker={stockTracker}/>
                        
                    { showDestroyBtn && (
                        <DestroyButton onPress={handleDestroyStockTracker}>
                            <TypographyMedium color={Colors.WHITE}>{ts("destroy_tracker")}</TypographyMedium>
                        </DestroyButton>
                    )}
                </MarginBox>
            </ScrollView>
        </FlatLayout>
    )
}

const DestroyButton = styled(Button)`
    background-color: ${Colors.RED_ERROR};
`
