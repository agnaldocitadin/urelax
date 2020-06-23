import React, { FC } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerSettingUIHook } from './StockTrackerSettingUIHook'

interface StockTrackerSettingUIProps {}

export const StockTrackerSettingUI: FC<StockTrackerSettingUIProps> = ({}) => {

    const { stockTracker, showDestroyBtn, handleDestroyStockTracker } = useStockTrackerSettingUIHook()

    return (
        <FlatLayout>
            <BackHeader title={ts("stock_tracker_settings")}/>
            <ScrollView>
                <StockTrackerData isReview={!showDestroyBtn} stockTracker={stockTracker}/>
                { showDestroyBtn && <ButtonView>
                    <InteractiveButton
                        data={{}}
                        onPress={handleDestroyStockTracker}/>
                </ButtonView>}
            </ScrollView>
        </FlatLayout>
    )
}

const ButtonView = styled.View`
    border-top-color: ${Colors.BG_3};
    border-top-width: 1px;
`