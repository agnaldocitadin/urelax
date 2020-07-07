import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Wizard } from '../../../components/Wizard'
import { WizardView } from '../../../components/Wizard/WizardView'
import { ts } from '../../../core/I18n'
import { Button, Icons, Typography } from '../../../theming'

export const FilterUI: FC = () => {
    const [ idx, setIdx ] = useState(0)
    return (
        <FlatLayout bgColor="white">
            <BackHeader title={ts("filter")}/>
            
            <NewWizard index={idx}>
                <WizardView label="Init" icon={Icons.SETTINGS}>
                    <Typography>first</Typography>
                </WizardView>

                <WizardView label="Frequência" icon={Icons.USER}>
                    <Typography>second</Typography>
                </WizardView>

                <WizardView label="Transação" icon={Icons.ALERT_CIRCLE}>
                    <Typography>Transação</Typography>
                </WizardView>

                <WizardView label="Revisão" icon={Icons.ALERT_CIRCLE}>
                    <Typography>Final!</Typography>
                </WizardView>
            </NewWizard>
            <Button onPress={() => setIdx(old => (old + 1))}>
                <Typography>Next</Typography>
            </Button>
        </FlatLayout>
    )
}

const NewWizard = styled(Wizard)`
    padding: 20px 0;
`