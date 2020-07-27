import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'
import { ts } from '../../../core/I18n'
import { Colors, Icons, InputTextBase, Typography } from '../../../theming'
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
                { investiments && investiments.map((inve, key) => <Typography key={key} onPress={() => handleAddInvestiment(inve)}>{inve.description}</Typography>) }
                
                { suggestion && <Typography onPress={() => handleAddInvestiment(suggestion)}>{suggestion.description}</Typography> }
                
                { !suggestion && !finding && <React.Fragment>
                    <GenericTextIcon title="Não sabe no que investir?" message="Podemos ajudar você" icon="auto-fix" />
                    <SuggestionBtn data={suggestionBtnData} indicatorColor={Colors.WHITE} onPress={handleSuggestion}/>
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