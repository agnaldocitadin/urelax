import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { Colors, TypographyMedium } from '../../../theming'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerSettingUIHook } from './StockTrackerSettingUIHook'

interface StockTrackerSettingUIProps {}

export const StockTrackerSettingUI: FC<StockTrackerSettingUIProps> = ({}) => {

    const { 
        stockTracker,
        showDestroyBtn,
        handleDestroyStockTracker 
    } = useStockTrackerSettingUIHook()

    const data = (
        <StockTrackerData
            isReview={!showDestroyBtn}
            stockTracker={stockTracker}/>
    )

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={<BackHeader title={ts("stock_tracker_settings")}/>}>
            
            <ScrollView>
                { showDestroyBtn ? data : <MarginBox>{data}</MarginBox>}
                { showDestroyBtn && (
                    <DestroyButton onPress={handleDestroyStockTracker}>
                        <TypographyMedium color={Colors.WHITE}>{ts("destroy_stock_tracker")}</TypographyMedium>
                    </DestroyButton>
                )}
            </ScrollView>
        </FlatLayout>
    )
}

const DestroyButton = styled(BaseButton)`
    background-color: ${Colors.RED_ERROR};
`
