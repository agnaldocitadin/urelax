import { useSelector } from "react-redux"
import { States } from "../../../../reducers/Reducer"

export const useAccountPreviewUIHook = () => {

    const brokerAccount = useSelector((state: States) => state.BROKER.accountToUpdate)

    return {
        brokerAccount
    }
}