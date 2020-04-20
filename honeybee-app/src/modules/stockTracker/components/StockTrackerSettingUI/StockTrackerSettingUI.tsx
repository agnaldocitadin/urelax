import React, { FC } from 'react'
import { ScrollView, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { InteractiveButton } from '../../../../ui/components/InteractiveButton'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerSettingUIHook } from './StockTrackerSettingUIHook'

interface StockTrackerSettingUIProps {
    navigation: NavigationStackProp
}

export const StockTrackerSettingUI: FC<StockTrackerSettingUIProps> = ({ navigation }) => {

    const { stockTracker, showDestroyBtn, handleDestroyStockTracker } = useStockTrackerSettingUIHook(navigation)

    return (
        <FlatLayout>
            <BackHeader title={ts("stock_tracker_settings")}/>
            <ScrollView>
                <StockTrackerData isReview={!showDestroyBtn} stockTracker={stockTracker}/>
                { showDestroyBtn && <ButtonView>
                    <InteractiveButton 
                        block 
                        normalText={ts("destroy_stock_tracker")}
                        normalBgColor={Colors.RED_ERROR}
                        textColor={Colors.WHITE}
                        onPress={handleDestroyStockTracker}
                        animate={false}
                        radius={6}/>
                </ButtonView>}
            </ScrollView>
        </FlatLayout>
    )
}

const ButtonView = styled(View)`
    border-top-color: ${Colors.BG_3};
    border-top-width: 1px;
    padding: ${FORM_PADDING};
`