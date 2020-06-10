import React, { FC } from 'react'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Colors } from '../../../theming'
import { BackHeader } from '../../../components/Header/BackHeader'
import { Info } from '../../../components/Info'
import { SHeaderDivider } from '../../../components/Layout/Layout.style'
import { CashDisplay } from '../../../components/CashDisplay'

export const InvestimentUI: FC = ({ children }) => {
    
    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title="Investiments"  />
            <Info name="Patrimonio acumulado" value="R$ 1000,00" valueFontSize={30}/>
            <SHeaderDivider>Moeda</SHeaderDivider>
            <SHeaderDivider>Ações</SHeaderDivider>
            <SHeaderDivider>Renda Fixa</SHeaderDivider>
            <SHeaderDivider>Fundos imobiliários</SHeaderDivider>
        </FlatLayout>
    )
}