import { utils } from 'js-commons'
import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '../../../components/Card'
import { BackHeader } from '../../../components/Header/BackHeader'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'
import { Touchable } from '../../../components/Touchable'
import { TouchItem } from '../../../components/TouchItem'
import AppConfig from '../../../core/AppConfig'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_HORIZONTAL_SPACING, Icons, InputTextBase, Typography, TypographyMedium } from '../../../theming'
import { useAddInvestimentUIHook } from './AddInvestimentUIHook'

export const AddInvestimentUI: FC = () => {
    
    const {
        finding,
        investiments,
        suggestionBtnData,
        suggestion,
        handleSuggestion,
        handleFindInvestiments,
        handleAddInvestiment,
        handleSearch
    } = useAddInvestimentUIHook()

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            header={
                <BackHeader
                    title={ts("add_investiments")}
                    center={finding && <Input placeholder={ts("find_for")} autoFocus onChangeText={handleFindInvestiments}/>}
                    right={
                        finding
                            ? <ButtonHeader
                                icon={Icons.CLOSE}
                                onPress={() => handleSearch(false)}/>
                            : <ButtonHeader 
                                icon={Icons.MAGNIFY}
                                onPress={() => handleSearch(true)}/>
                    }/>
            }>
            <Container>
                { investiments && investiments.map((inve, key) => {
                    return (<Investiment key={inve._id} onPress={() => handleAddInvestiment(inve)}>
                        <View>
                            <TypographyMedium fontSize={14}>{inve.description}</TypographyMedium>
                            <Typography color={Colors.GRAY_1}>({inve.stock.symbol}) Lotes de {inve.stock.stockLot} ações</Typography>
                        </View>
                    </Investiment>)
                }) }
                
                { suggestion && <Cardo>
                    <Touchable onPress={() => handleAddInvestiment(suggestion)}>
                        <Cardos>
                            <TypographyMedium fontSize={16}>{suggestion.description}</TypographyMedium>
                            <Typography>{suggestion.stock.symbol}</Typography>
                            <Typography>Lotes de {suggestion.stock.stockLot} ações</Typography>
                            <Typography>Custo atual de {utils.formatCurrency(0, { prefix: AppConfig.CURRENCY_PREFIX })}</Typography>
                        </Cardos>
                    </Touchable>
                </Cardo> }
                
                { !finding && <React.Fragment>
                    <GenericTextIcon title="Vamos investir!" message="Busque pelas ações desejadas e começe investir agora mesmo." icon="auto-fix" />
                    {/* <SuggestionBtn data={suggestionBtnData} indicatorColor={Colors.WHITE} onPress={handleSuggestion}/> */}
                </React.Fragment>}

            </Container>
        </FlatLayout>
    )
}

const Container = styled.View`
    flex: 1;
`

const SuggestionBtn = styled(InteractiveButton)`
    background-color: ${Colors.BLUES_1};
`

const Input = styled(InputTextBase)`
    width: 100%;
`

const Investiment = styled(TouchItem)`
    padding: 15px ${DEFAULT_HORIZONTAL_SPACING}px;
`

const Cardo = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

const Cardos = styled(Card)`
    background-color: ${Colors.BG_1};
    padding: 10px;
    width: 70%;
`