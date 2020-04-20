import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { FormLayout } from '../../../../ui/components/Layout/FormLayout'
import { SFormDescription } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerReviewUIHook } from './StockTrackerReviewUIHook'

interface StockTrackerReviewUIProps {
    navigation: NavigationStackProp
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerReviewUI: FC<StockTrackerReviewUIProps> = ({ navigation }) => {
    const { stockTracker, handleSaveStockTracker, handleClose } = useStockTrackerReviewUIHook(navigation)

    return (
        <FormLayout
            title={ts("add_stock_tracker")}
            normalText={ts("create_stock_tracker")}
            onProcess={handleSaveStockTracker}
            onClose={handleClose}>
            <ScrollViewForm>
                <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                <StockTrackerData stockTracker={stockTracker} isReview={true} noPadding/>
            </ScrollViewForm>
        </FormLayout>
    )
}
