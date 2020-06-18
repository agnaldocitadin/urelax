import { useNavigation } from '@react-navigation/native'
import { FinancialSummary } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { RefreshControl, View, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { Info } from '../../../components/Info'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SRoundedBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Button, Colors, Typography, TypographyMedium } from '../../../theming'
import { Routes } from '../../Navigation/const'
import { useDashboardUIHook } from './DashboardUIHook'

interface HomeDashboardProps {}

export const DashboardUI: FC<HomeDashboardProps> = () => {
    
    const {
        refreshing,
        currentPatrimony,
        history,
        handleInvestiments,
        handleStartInvesting,
        handleRefresh
    } = useDashboardUIHook()
    const navigation = useNavigation()

    const renderIt = ({ item }: { item: FinancialSummary }) => {
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
                    
                    {/* <Button onPress={() => navigation.navigate(Routes.ACTIVITY_LIST)}>
                        <Typography>Activity</Typography>
                    </Button> */}

                    { history.length === 0 
                        ?
                            <StartInvesting onPress={handleStartInvesting}>
                                <TypographyMedium fontSize={16} color={Colors.WHITE}>Começar a investir</TypographyMedium>
                            </StartInvesting>
                        : 
                            <AppIntroSlider
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
    justify-content: center;
    flex: 1;
`

const History = styled.View`
    align-items: center;
    justify-content: space-evenly;
    flex: 1;
`

const StartInvesting = styled(BaseButton)`
    width: 70%;
    margin: 0 auto;
    border-radius: 25px;
    background-color: ${Colors.BLUES_4};
`