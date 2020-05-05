
import { View } from 'native-base'
import React, { FC, ReactElement } from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../../../core/Theme'
import { Touchable } from '../../../../ui/components/Touchable'

interface DashboardPanelProps {
    bottom?: ReactElement
    onBottomPress?(): void
}

export const DashboardPanel: FC<DashboardPanelProps> = ({ children, bottom, onBottomPress }) => (
    <SHomePanel>
        <Content>
            {children}
        </Content>
        {bottom && <SHomePanelBottom onPress={onBottomPress}>
            {bottom}
        </SHomePanelBottom>}
    </SHomePanel>
)

const Content = styled.View`
    justify-content: space-between;
    padding: 25px;
    flex: 1;
`

const SHomePanel: any = styled(View)`
    background-color: ${Colors.WHITE};
    border-radius: 5px;
    margin: 15px 20px;
    flex: 1;
`

const SHomePanelBottom: any = styled(Touchable)`
    border-top-width: 1px;
    border-top-color: ${Colors.BG_1};
    height: 90px;
    padding: 0 10px;
`