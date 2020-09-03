import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export const MODULE_NAME = "StockTracker"

// type Root = {
//     STOCKTRACKER_WIZARDE: { 
//         view: string, 
//         editing: boolean
//     }
// }

// export type StockTrackerWizardRoutes = RouteProp<Root, "STOCKTRACKER_WIZARDE">

// export type StockTrackerWizardProp = StackNavigationProp<Root, "STOCKTRACKER_WIZARDE">

export enum StockTrackerWizardViews {
    FREQUENCY,
    STRATEGY,
    TRANSACTION,
    REVIEW,
    DONE
}