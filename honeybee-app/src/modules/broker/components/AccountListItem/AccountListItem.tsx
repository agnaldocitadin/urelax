import { BrokerAccount } from 'honeybee-api'
import React, { FC } from 'react'
import { Image, ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import { BrokerImg } from '../../../../core/Theme'
import { Info } from '../../../../ui/components/Info'
import { FORM_PADDING, SHIMMER_COLORS } from '../../../../ui/components/Layout/Layout.style'
import { Touchable } from '../../../../ui/components/Touchable'

interface AccountListItemProps {
    brokerAccount: BrokerAccount
    loading?: boolean
    style?: ViewStyle
    onPress?(brokerAccount: BrokerAccount): void
}

export const AccountListItem: FC<AccountListItemProps> = ({ brokerAccount, style, loading, onPress }) => (
    <Touch style={style} onPress={() => onPress && onPress(brokerAccount)} noChevron={!onPress}>
        <Shimmer autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
            <Image source={BrokerImg[brokerAccount.brokerCode]} style={{ width: 50, height: 50 }} />
        </Shimmer>
        <AccountInfo
            name={brokerAccount.brokerCode}
            value={brokerAccount.accountName}
            valueFontSize={14}
            loading={loading}/>
    </Touch>
)

const Touch = styled(Touchable)`
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
    justify-content: center;
`

const AccountInfo = styled(Info)`
    flex: 2;
    padding-left: ${FORM_PADDING};
`

const Shimmer = styled(ShimmerPlaceHolder)`
    width: 50px;
    height: 50px;
`