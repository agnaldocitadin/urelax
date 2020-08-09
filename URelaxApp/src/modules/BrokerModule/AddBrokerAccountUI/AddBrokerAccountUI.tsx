import React, { FC } from 'react'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Card } from '../../../components/Card'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { Touchable } from '../../../components/Touchable'
import { ts } from '../../../core/I18n'
import { Colors, Icons, Images } from '../../../theming'
import { useAddBrokerAccountUIHook } from './AddBrokerAccountUIHooks'

export const AddBrokerAccountUI: FC = ({}) => {
    
    const {
        brokers,
        loading,
        handleAddClearAccount,
        handleBrokerAccounts
    } = useAddBrokerAccountUIHook()

    return (
        <PrimaryLayout
            loading={loading}
            title={ts("brokers")}
            right={
                <ButtonHeader
                    color={Colors.WHITE}
                    icon={Icons.PLUS_CIRCLE}
                    onPress={handleBrokerAccounts}/>
            }>
            <MarginBox>
                { brokers.map(broker => (
                    <Card key={broker.code}>
                        <Touchable onPress={handleAddClearAccount}>
                            <CardContent>
                                <Logo>
                                    <Image source={Images.CLEAR} />
                                </Logo>
                                <Btn>
                                    <Icon size={20} color={Colors.BLACK_2} name={Icons.PLUS_CIRCLE} />
                                </Btn>
                            </CardContent>
                        </Touchable>
                    </Card>
                )) }
            </MarginBox>
        </PrimaryLayout>
    )
}

const CardContent = styled.View`
    flex-direction: row;
    align-items: center;
    height: 150px;
`

const Logo = styled.View`
    border-color: ${Colors.GRAY_4};
    border-right-width: 1px;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex: 1;
`

const Btn = styled.View`
    justify-content: center;
    align-items: center;
    width: 45px;
`