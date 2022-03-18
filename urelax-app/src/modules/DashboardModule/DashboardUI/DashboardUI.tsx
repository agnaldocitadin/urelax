import { utils } from 'js-commons'
import React, { FC } from 'react'
import { ListRenderItem, RefreshControl, View, ViewStyle } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import styled from 'styled-components/native'
import { FinancialSummary } from 'urelax-api'
import { BaseButton } from '../../../components/BaseButton'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { FlatHeader } from '../../../components/Header/FlatHeader'
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
        nickname,
        refreshing,
        currentPatrimony,
        summaries,
        ready,
        handleInvestiments,
        handleStartInvesting,
        handleAnalysis,
        handleRefresh,
        toogleDrawer
    } = useDashboardUIHook()

    const renderSummary: ListRenderItem<FinancialSummary> = ({ item, index }) => {
        const variation = item.variation === 0 ? ts("no_variation") : (item.variation > 0 ? ts("gain") : ts("loss"))
        return (
            <History>
                <TypographyMedium 
                    fontSize={16}
                    color={Colors.GRAY_2}>
                    {item.when}
                </TypographyMedium>
                <CenteredView>
                    <Typography
                        fontSize={14}
                        color={Colors.GRAY_3}
                        textAlign="center">
                        {variation}
                    </Typography>
                    <VariationMonitor
                        fontSize={18}
                        onPress={() => handleAnalysis(index)}
                        value={item.variation}/>
                </CenteredView>
                <View>
                    <Typography
                        fontSize={14}
                        color={Colors.GRAY_3}>
                        {ts("your_patrimony_was")}
                    </Typography>
                    <TypographyMedium
                        fontSize={19}
                        color={Colors.GRAY_1}
                        textAlign="center">
                        {utils.formatCurrency(item.patrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                    </TypographyMedium>
                </View>
            </History>
        )
    }

    return (
        <FlatLayout
            bgColor={Colors.BLUES_1}
            barStyle="light-content"
            header={
                <FlatHeader
                    bgHeaderColor={Colors.BLUES_1}
                    borderBottomWidth={0}
                    right={
                        <ButtonHeader
                            onPress={toogleDrawer}
                            icon={"dots-horizontal"}
                            color={Colors.WHITE}/>
                    }/>
            }>
            <Refresher
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}>
                    
                <PatrimonyNow>
                    <TypographyMedium
                        color={Colors.WHITE}
                        fontSize={20}>
                        {ts("welcome")}, {nickname}!
                    </TypographyMedium>
                    <View>
                        <Typography
                            color={Colors.WHITE}
                            fontSize={13}
                            textAlign="center">
                            {ts("patrimony_amount")}
                        </Typography>
                        <Typography
                            fontSize={36}
                            loading={!ready}
                            textAlign="center"
                            color={Colors.WHITE}
                            shimmerColor={[Colors.BLUES_1, Colors.WHITE, Colors.BLUES_1]}
                            onPress={handleInvestiments}>
                            {utils.formatCurrency(currentPatrimony, { prefix: AppConfig.CURRENCY_PREFIX })}
                        </Typography>
                    </View>
                </PatrimonyNow>
                <PatrimonyHistory>
                    { summaries.length === 0 
                        ?
                            <StartInvesting onPress={handleStartInvesting}>
                                <TypographyMedium fontSize={16} color={Colors.WHITE}>{ts("start_investing")}</TypographyMedium>
                            </StartInvesting>
                        : 
                            <AppIntroSlider
                                renderDoneButton={() => false}
                                renderNextButton={() => false}
                                renderItem={renderSummary}
                                dotStyle={dotStyle}
                                activeDotStyle={activeDotStyle}
                                keyExtractor={(_item, index) => `hs_${index}`}
                                data={summaries} />
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
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
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