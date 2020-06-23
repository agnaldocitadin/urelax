import React, { FC } from 'react'
import { FormLayout } from '../../../components/Layout/FormLayout'
import { SFormDescription } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { StockTrackerData } from '../StockTrackerData'
import { useStockTrackerReviewUIHook } from './StockTrackerReviewUIHook'

interface StockTrackerReviewUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const StockTrackerReviewUI: FC<StockTrackerReviewUIProps> = ({}) => {
    const { stockTracker, handleSaveStockTracker, handleClose } = useStockTrackerReviewUIHook()

    return (
        <FormLayout
            data={{}}
            title={ts("add_stock_tracker")}
            // normalText={ts("create_stock_tracker")}
            onProcess={handleSaveStockTracker}
            onClose={handleClose}>
            <ScrollViewForm>
                <SFormDescription>{ts("stock_tracker_data_review")}</SFormDescription>
                <StockTrackerData stockTracker={stockTracker} isReview={true} noPadding/>
            </ScrollViewForm>
        </FormLayout>
    )
}
