import { utils } from 'js-commons'
import React, { FC } from 'react'
import { RefreshControl, View, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import styled from 'styled-components/native'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SRoundedBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography, TypographyMedium } from '../../../theming'
import { useDashboardUIHook } from './DashboardUIHook'

interface HomeDashboardProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const DashboardUI: FC<HomeDashboardProps> = () => {
    
    const {
        refreshing,
        currentPatrimony,
        history,
        handleInvestiments,
        handleRefresh
    } = useDashboardUIHook()

    const renderIt = ({ item }: any) => {
        return (
            <Others>
                <Typography>Ontem</Typography>
                <View>
                    <Typography textAlign="center">Lucro</Typography>
                    <VariationMonitor value={1.92} fontSize={19}/>
                </View>
                <Info 
                    name={ts("Seu patrimônio era de")}
                    value="R$ 220,22"
                    style={{ alignItems: "center" }}
                    valueFontSize={20}/>
                
            </Others>
        )
    }

    return (
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <Refresher enabled={true} refreshing={refreshing} onRefresh={handleRefresh}>
                <Value>
                    <TypographyMedium fontSize={20}>{ts("welcome")}, {"Nick"}!</TypographyMedium>
                    <Info 
                        name="Patrimônio acumulado"
                        value={utils.formatCurrency(currentPatrimony || 0, { prefix: AppConfig.CURRENCY_PREFIX })}
                        style={{ alignItems: "center" }}
                        valueFontSize={39}
                        onPress={handleInvestiments}
                        />
                </Value>
                <Top>
                    <AppIntroSlider
                        renderDoneButton={() => false}
                        renderNextButton={() => false}
                        renderItem={renderIt}
                        dotStyle={dotStyle}
                        activeDotStyle={activeDotStyle}
                        data={history} />
                </Top>
            </Refresher>
        </FlatLayout>
    )
}

const dotStyle: ViewStyle = {
    backgroundColor: "rgba(29, 161, 242, .2)", 
    width: 8,
    height: 8 
}

const activeDotStyle: ViewStyle = { 
    backgroundColor: "rgba(29, 161, 242, .7)", 
    width: 8, 
    height: 8
}

const Refresher = styled(RefreshControl)`
    flex: 1;
`
const Value = styled.View`
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
`

const Top = styled(SRoundedBox)`
    flex: 1;
`

const Others = styled.View`
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
`