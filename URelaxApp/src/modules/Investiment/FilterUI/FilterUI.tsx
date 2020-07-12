import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { BackHeader } from '../../../components/Header/BackHeader'
import { CurrencyInput } from '../../../components/Inputs/CurrencyInput'
import { InputText } from '../../../components/Inputs/InputText/InputText'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { WizardForm } from '../../../components/WizardForm'
import { ts } from '../../../core/I18n'

export const FilterUI: FC = () => {

    const [ val, setVal ] = useState(0)
    console.log(val)

    return (
        <FlatLayout
            bgColor="white"
            header={<BackHeader title={ts("filter")}/>}>

            
            {/* <InputSecure label="Password" /> */}
            {/* <InputDatetime label="data" /> */}
            <InputText
                // label="dddd"
                // rightIcon="wallet"
                // leftIcon="settings"
                />
            <CurrencyInput label="eita" value={val} onChangeValue={setVal}/>
            
            {/* <InputWrapper
                El={<InputTextBase />}
                value={val}
                onChangeText={setVal}
                onChange={s => {
                    console.log("---")
                    // return s.preventDefault()
                    return s.stopPropagation()
                }}/> */}

        </FlatLayout>
    )
}

const NewWizard = styled(WizardForm)`
    padding: 20px 0;
`