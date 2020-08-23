import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { InputSwitch } from '../../../components/Inputs/InputSwitch'
import { HeaderDivider, MarginBox } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ts } from '../../../core/I18n'
import { useSettingUIHook } from './SettingUIHook'

export const SettingUI: FC = ({ children }) => {
    
    const {
        input,
        handleBuyNotification,
        handleSellNotification,
        handleBalanceNotification,
        handleAddStockTrackerPaused
    } = useSettingUIHook()

    return (
        <PrimaryLayout title={ts("settings")}>
            <ScrollView>
                <MarginBox noMarginTop>
                    <HeaderDivider>Geral</HeaderDivider>
                    <Switch
                        label="Novo rastreador pausado"
                        value={input?.addStockTrackerPaused}
                        onChange={handleAddStockTrackerPaused}/>

                    <HeaderDivider>Notificações</HeaderDivider>
                    <Switch
                        label="Notificar compra de ações"
                        value={input?.receiveBuyNotification}
                        onChange={handleBuyNotification}/>
                        
                    <Switch
                        label="Notificar venda de ações"
                        value={input?.receiveSellNotification}
                        onChange={handleSellNotification}/>
                        
                    <Switch
                        label="Notificar fechamento de balanço"
                        value={input?.receiveBalanceNotification}
                        onChange={handleBalanceNotification}/>
                </MarginBox>
            </ScrollView>
        </PrimaryLayout>
    )
}

const Switch = styled(InputSwitch)`
    padding-top: 20px;
`