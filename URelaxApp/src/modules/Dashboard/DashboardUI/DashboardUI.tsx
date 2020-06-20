import { FinancialSummary } from 'honeybee-api'
import { utils } from 'js-commons'
import React, { FC } from 'react'
import { RefreshControl, View, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { SRoundedBox } from '../../../components/Layout/Layout.style'
import { VariationMonitor } from '../../../components/VariationMonitor'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, Typography, TypographyMedium } from '../../../theming'
import { useDashboardUIHook } from './DashboardUIHook'

interface HomeDashboardProps {}

export const DashboardUI: FC<HomeDashboardProps> = () => {
    
    const {
        refreshing,
        currentPatrimony,
        history,
        handleInvestiments,
        handleStartInvesting,
        handleAnalysis,
        handleRefresh
    } = useDashboardUIHook()

    const renderIt = ({ item }: { item: FinancialSummary }) => {
        return (
            <History>
                <Typography color={Colors.GRAY_1}>{item.when}</Typography>
                <CenteredView>
                    <Typography textAlign="center">{item.variation > 0 ? ts("gain") : ts("loss")}</Typography>
                    <VariationMonitor onPress={handleAnalysis} value={item.variation}/>
                </CenteredView>
                <View>
                    <Typography color={Colors.GRAY_1}>{ts("your_patrimony_was")}</Typography>
                    <Typography textAlign="center">{utils.formatCurrency(item.patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                </View>
            </History>
        )
    }

    return (
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <Refresher enabled={true} refreshing={refreshing} onRefresh={handleRefresh}>
                <PatrimonyNow>
                    <TypographyMedium fontSize={20}>{ts("welcome")}, {"Nick"}!</TypographyMedium>
                    <View>
                        <Typography color={Colors.GRAY_1} textAlign="center">Patrimônio acumulado</Typography>
                        <Typography textAlign="center" fontSize={39} onPress={handleInvestiments}>{utils.formatCurrency(currentPatrimony || 0, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                    </View>
                </PatrimonyNow>
                <PatrimonyHistory>
                    { history.length === 0 
                        ?
                            <StartInvesting onPress={handleStartInvesting}>
                                <TypographyMedium fontSize={16} color={Colors.WHITE}>{ts("start_investing")}</TypographyMedium>
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
    height: 8,
    marginTop: 25
}

const activeDotStyle: ViewStyle = { 
    backgroundColor: "rgba(29, 161, 242, .7)", 
    width: 10, 
    height: 10,
    marginTop: 25
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

const CenteredView = styled.View`
    align-items: center;
`