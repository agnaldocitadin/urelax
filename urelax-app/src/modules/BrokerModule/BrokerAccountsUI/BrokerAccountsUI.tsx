import React, { FC } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
import { Touchable } from '../../../components/Touchable'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { useBrokerAccountsUIHook } from './BrokerAccountsUIHook'

export const BrokerAccountsUI: FC = ({}) => {
    
    const { 
        accounts,
        simulation,
        handleSelectBrokerAccount,
        handleAddBrokerAccount
    } = useBrokerAccountsUIHook()

    return (
        <PrimaryLayout
            loading={false}
            title={ts("broker_accounts")}
            right={
                !simulation && <ButtonHeader
                    color={Colors.WHITE}
                    icon={Icons.ADD_BROKER_ACCOUNT}
                    onPress={handleAddBrokerAccount}/>
            }>
            <ScrollView>
                <MarginBox>
                    { accounts.length === 0 && <NoInvestiments
                        iconColor={Colors.GRAY_2}
                        icon={"flask-empty-outline"}
                        title={ts("oops")}
                        message={ts("nothing_here")} /> }
                    { accounts.map((account, key) => (
                        <Card key={key}>
                            <Touchable onPress={() => handleSelectBrokerAccount(account)}>
                                <MarginBox>
                                    <Badge style={{ marginBottom: 5 }} bgColor={Colors.BLUES_2} text={account.brokerCode} />
                                    <Badge bgColor={Colors.GRAY_1} text={account.accountName} />
                                </MarginBox>
                            </Touchable>
                        </Card>
                    )) }
                </MarginBox>
            </ScrollView>
        </PrimaryLayout>
    )
}

const NoInvestiments = styled(TextIconDisplay)`
    justify-content: center;
    align-items: center;
`