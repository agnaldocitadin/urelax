import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { ButtonHeader } from '../../../components/Header/ButtonHeader'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { useAddInvestimentUIHook } from './AddInvestimentUIHook'
import { GenericTextIcon } from '../../../components/Layout/Layout.style'

export const AddInvestimentUI: FC = () => {
    
    const {
        suggestionBtnData,
        handleSuggestion
    } = useAddInvestimentUIHook()

    return (
        <FlatLayout bgColor={Colors.WHITE}>
            <BackHeader title={ts("add_investiments")} right={
                <ButtonHeader icon={Icons.MAGNIFY} color={Colors.BLUES_1}/>
            }/>
            <Container>
                <GenericTextIcon title="Não sabe no que investir?" message="Podemos ajudar você" icon="auto-fix" />
                <SuggestionBtn data={suggestionBtnData} indicatorColor={Colors.WHITE} onPress={handleSuggestion}/>
            </Container>
        </FlatLayout>
    )
}

const Container = styled.View`
    flex: 1;
    /* justify-content: flex-end; */
`

const SuggestionBtn = styled(InteractiveButton)`
    background-color: ${Colors.BLUES_1};
`