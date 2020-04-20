
import React, { FC, useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import AppConfig from '../../../../core/AppConfig'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { ButtonHeader } from '../../../../ui/components/Header/ButtonHeader'
import { InfiniteFlatList } from '../../../../ui/components/InfiniteFlatList'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { GenericTextIcon } from '../../../../ui/components/Layout/Layout.style'
import { AccountListItem } from '../AccountListItem/AccountListItem'
import { useAccountListUIHook } from './AccountListUIHook'

const RENDER_SHIMMERS = 7

interface AccountListUIProps {
    navigation: NavigationStackProp
}

export const AccountListUI: FC<AccountListUIProps> = ({ navigation }) => {
    
    const { 
        fail,
        loading,
        brokerAccounts,
        handleEditAccount,
        handleAddBrokerAccount
    } = useAccountListUIHook(navigation)
    
    const renderBrokerAccount = useCallback(({ item }: any) => <AccountListItem brokerAccount={item} onPress={handleEditAccount} loading={loading}/>, [loading])

    return (
        <FlatLayout fail={fail}>
            <BackHeader title={ts("broker_accounts")} right={
                <ButtonHeader icon={Icons.PLUS_CIRCLE} color={Colors.BLUES_1} onPress={handleAddBrokerAccount}/>
            }/>
                
            { !fail && <InfiniteFlatList
                showShimmer={loading}
                numShimmerItens={3}
                minLengthToLoadMore={AppConfig.QTY_INITIAL_ACTIVITIES}
                data={brokerAccounts}
                renderItem={renderBrokerAccount}
                keyExtractor={(item, index) => `act${index}`}
                ListEmptyComponent={
                    <GenericTextIcon    
                        icon={Icons.ALERT_CIRCLE}
                        title={ts("nothing_here")}
                        message={ts("broker_adding_tip")}/>
                }/>
            }
        </FlatLayout>
    )
}