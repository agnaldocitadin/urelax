import { useEffectWhenReady } from "../../../core/Commons.hook"
import StockTrackerModule from ".."

export const useStockTrackerWizardUIHook = () => {

    const input = StockTrackerModule.select("stockTrackerInput")

    console.log("========>>>", input)

    useEffectWhenReady(() => {
        // TODO load everything!
    })

    return {

    }
}