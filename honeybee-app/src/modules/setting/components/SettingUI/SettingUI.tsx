
import { View } from 'native-base'
import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { InputSwitch } from '../../../../ui/components/InputSwitch'
import { InteractiveButton } from '../../../../ui/components/InteractiveButton'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING, SHeaderDivider } from '../../../../ui/components/Layout/Layout.style'
import { Profile } from '../../../../ui/components/Profile'
import { TouchItem } from '../../../../ui/components/TouchItem'
import { useSettingUIHook } from './SettingUIHook'

interface SettingUIProps {
    navigation: NavigationStackProp
}

export const SettingUI: FC<SettingUIProps> = ({ navigation }) => {
    
    const {
        nickname,
        receiveTradeNotification,
        receiveBalanceNotification,
        addStockTrackerPaused,
        simulationBtnLabel,
        handleAccountEdit,
        handleAccountSimulation,
        handleLogout,
        handleManageBrokkerAccount,
        handleTradeNotification,
        handleBalanceNotification,
        handleAddTrackerPaused
    } = useSettingUIHook(navigation)

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("settings")}/>
            <ScrollView>
                <ProfileSetting name={nickname} onPress={handleAccountEdit}/>
                
                <Divider>{ts("brokers")}</Divider>
                <SettingItem 
                    text={ts("manage_broker_accounts")} 
                    onPress={handleManageBrokkerAccount}/>

                <Divider>{ts("stock_trackers")}</Divider>
                <Switch
                    text={ts("add_tracker_paused")}
                    value={addStockTrackerPaused}
                    onChange={handleAddTrackerPaused}/>

                <Divider>{ts("notifications")}</Divider>
                <Switch
                    text={ts("trade_notification")}
                    value={receiveTradeNotification} 
                    onChange={handleTradeNotification}/>

                <Switch
                    text={ts("balance_notification")}
                    value={receiveBalanceNotification}
                    onChange={handleBalanceNotification}/>

                <Divider>{ts("general")}</Divider>
                <Buttons>
                    <InteractiveButton
                        block
                        normalText={simulationBtnLabel}
                        normalBgColor={Colors.BLUES_2}
                        textColor={Colors.WHITE}
                        radius={30}
                        animate={false}
                        onPress={handleAccountSimulation}/>

                    <InteractiveButton
                        block
                        normalText={ts("exit_app")}
                        textColor={Colors.RED_ERROR} 
                        borderColor={Colors.RED_ERROR}
                        normalBgColor={Colors.WHITE}
                        borderWidth={1}
                        radius={30}
                        animate={false}
                        onPress={handleLogout}/>
                </Buttons>

            </ScrollView>
        </FlatLayout>
    )
}

const ProfileSetting = styled(Profile)`
    margin: ${FORM_PADDING} ${FORM_PADDING} 0 ${FORM_PADDING};
    padding-bottom: 20px;
`

const Divider = styled(SHeaderDivider)`
    padding-left: ${FORM_PADDING};
`

const SettingItem = styled(TouchItem)`
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
`

const Switch = styled(InputSwitch)`
    padding: 18px ${FORM_PADDING};
`

const Buttons: any = styled(View)`
    padding: ${FORM_PADDING};
    justify-content: space-between;
    height: 170px;
`