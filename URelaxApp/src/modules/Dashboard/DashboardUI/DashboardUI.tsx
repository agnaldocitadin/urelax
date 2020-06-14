import { utils } from 'js-commons'
import React, { FC } from 'react'
import { RefreshControl, View, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import styled from 'styled-components/native'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { GenericTextIcon, SRoundedBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Icons, Typography, TypographyMedium } from '../../../theming'
import { FinancialHistoryApp } from '../const'
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

    const renderIt = ({ item }: { item: FinancialHistoryApp }) => {
        return (
            <History>
                <Typography>Ontem</Typography>
                <View>
                    <Typography textAlign="center">Lucro</Typography>
                    <VariationMonitor value={item.variation} fontSize={19}/>
                </View>
                <Info 
                    name={ts("Seu patrimônio era de")}
                    value={utils.formatCurrency(item.patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                    style={{ alignItems: "center" }}
                    valueFontSize={20}/>
            </History>
        )
    }

    return (
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <Refresher enabled={true} refreshing={refreshing} onRefresh={handleRefresh}>
                <PatrimonyNow>
                    <TypographyMedium fontSize={20}>{ts("welcome")}, {"Nick"}!</TypographyMedium>
                    <Info 
                        name="Patrimônio acumulado"
                        value={utils.formatCurrency(currentPatrimony || 0, { prefix: AppConfig.CURRENCY_PREFIX })}
                        style={{ alignItems: "center" }}
                        valueFontSize={39}
                        onPress={handleInvestiments}
                        />
                </PatrimonyNow>
                <PatrimonyHistory>
                    { history.length === 0 
                        ? <GenericTextIcon icon={Icons.ALERT_CIRCLE} message={ts("nothing")}/> 
                        : <AppIntroSlider
                            renderDoneButton={() => false}
                            renderNextButton={() => false}
                            renderItem={renderIt}
                            dotStyle={dotStyle}
                            activeDotStyle={activeDotStyle}
                            keyExtractor={(_item, index) => `hs_${index}`}
                            data={history} />
                    }
                </PatrimonyHistory>
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
const PatrimonyNow = styled.View`
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;
`

const PatrimonyHistory = styled(SRoundedBox)`
    flex: 1;
`

const History = styled.View`
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
`