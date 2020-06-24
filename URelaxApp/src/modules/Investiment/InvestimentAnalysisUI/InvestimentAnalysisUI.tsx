import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { TouchItem } from '../../../components/TouchItem'
import { VariationMonitor } from '../../../components/VariationMonitor'
import { ts } from '../../../core/I18n'
import { Button, Colors, DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING, Typography, TypographyMedium } from '../../../theming'
import { AnalysisGraphic, DataGraph } from './AnalysisGraphic'
import { useInvestimentAnalysisUIHook } from './InvestimentAnalysisUIHook'

export const InvestimentAnalysisUI: FC = () => {
    
    const { 
        handleAnalysisDetail
    } = useInvestimentAnalysisUIHook()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("analysis")}/>
            <Soet>
                <Typography>R$ 128.989,00</Typography>
                <VariationMonitor value={-2.35}/>
            </Soet>

            <Graph>
                <AnalysisGraphic
                    data={[{
                        label: "03/Jan",
                        value: 10
                    }
                    ,{
                        label: "04/Jan",
                        value: 10
                    },{
                        label: "05/Jan",
                        value: 10
                    },{
                        label: "06/Jan",
                        value: 10
                    },{
                        label: "07/Jan",
                        value: 10
                    },{
                        label: "08/Jan",
                        value: 10
                    },{
                        label: "09/Jan",
                        value: 10
                    }
                ] as DataGraph[]}
                    minLengthToLoadMore={20}
                    />
            </Graph>
            
            <Row>
                <MyButton label="Diário" selected/>
                <MyButton label="Semanal" />
                <MyButton label="Mensal"/>
                <MyButton label="Anual" />
            </Row>
            {/* <Divider>{ts("currency")}</Divider> */}
            {/* <Divider>{ts("stocks")}</Divider> */}
            <Inves onPress={handleAnalysisDetail}>
                <View style={{ flex: 1 }}>
                    <TypographyMedium textAlign="center">{ts("period_investiment")}</TypographyMedium>
                </View>
            </Inves>
        </FlatLayout>
    )
}

export const MyButton: FC<{ label: string, selected?: boolean }> = ({ label, selected = false }) => {
    return (
        <But selected={selected}>
            <Typography color={selected ? Colors.BLUES_4 : Colors.BLACK_1}>{label}</Typography>
        </But>
    ) 
}

const Soet = styled.View`
    margin: ${DEFAULT_VERTICAL_SPACING}px ${DEFAULT_HORIZONTAL_SPACING}px;
    justify-content: space-between;
    flex-direction: row;
`

const Graph = styled.View`
    background-color: ${Colors.BG_1};
    flex: 1;
`

export const Row = styled.View`
    flex-direction: row;
    margin: ${DEFAULT_VERTICAL_SPACING}px 15px;
`

const But = styled(Button)<{ selected: boolean }>`
    border-width: ${({ selected }) => selected ? 1 : 0}px;
    border-color: ${Colors.BLUES_4};
    border-radius: 25px;
    margin: 0 2px;
    height: 40px;
    flex: 1;
`

const Inves = styled(TouchItem)`
    padding: ${DEFAULT_VERTICAL_SPACING + 5}px ${DEFAULT_HORIZONTAL_SPACING}px;
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
`

const Tex = styled(TypographyMedium)`
    background-color: blue;
    /* width: 100%; */
    /* margin: 0 auto; */
    /* flex: 2; */
    /* flex-direction: row; */
    /* flex: 1; */
`