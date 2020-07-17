import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InputDatetime } from '../../../components/Inputs/InputDatetime'
import { InputMask } from '../../../components/Inputs/InputMask'
import { InputText } from '../../../components/Inputs/InputText'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { GenericTextIcon, MarginBox, SFormDescription, SFormTitle } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { WizardView } from '../../../components/Wizard/WizardView'
import { WizardForm } from '../../../components/WizardForm'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { AccountData } from '../AccountData'
import { BrokerAccountWizardViews } from '../const'
import { useBrokerAccountWizardUIHook } from './BrokerAccountWizardUIHook'

interface BrokerAccountWizardUIProps {}

export const BrokerAccountWizardUI: FC<BrokerAccountWizardUIProps> = () => {
    
    const {
        transient,
        sequence,
        messageDone,
        loading,
        handleFinish,
        handleValidation,
        handleFlowEnded,
        handleChangeBirthdate,
        handleChangeCPF,
        handleChangeDescription,
        handleChangePassword,
        handleChangeConfirmPassword,
        handleChangeSignature
    } = useBrokerAccountWizardUIHook()

    const { cpf, birthdate, password, signature } = transient?.extraData || {}

    return (
        <FlatLayout
            bgColor={Colors.WHITE}
            loading={loading}
            header={<BackHeader title={ts("new_broker_account")}/>}>
            
            <WizardForm
                sequence={sequence}
                finishViewName={String(BrokerAccountWizardViews.DONE)}
                onFinish={handleFinish}
                onValidate={handleValidation}
                onFlowEnded={handleFlowEnded}
                views={[
                    {
                        id: String(BrokerAccountWizardViews.BIRTHDATE),
                        view: (
                            <WizardView icon="wallet">
                                <MarginBox>
                                    <SFormTitle>{ts("broker_account_birthdate")}</SFormTitle>
                                    <SFormDescription>{ts("broker_account_birthdate_tip")}</SFormDescription>
                                    <InputDatetime dateValue={birthdate} onChangeDate={handleChangeBirthdate}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.CPF),
                        view: (
                            <WizardView icon="wallet">
                                <MarginBox>
                                    <SFormTitle>{ts("broker_account_cpf")}</SFormTitle>
                                    <SFormDescription>{ts("broker_account_cpf_tip")}</SFormDescription>
                                    <InputMask
                                        keyboardType="numeric"
                                        value={cpf}
                                        autoCapitalize="words"
                                        textContentType="name"
                                        mask="[000].[000].[000]-[00]"
                                        onChangeText={handleChangeCPF}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.DESCRIPTION),
                        view: (
                            <WizardView icon="wallet">
                                <MarginBox>
                                    <SFormTitle>{ts("broker_account_name")}</SFormTitle>
                                    <SFormDescription>{ts("broker_account_name_tip")}</SFormDescription>
                                    <InputText
                                        value={transient.accountName}
                                        // tip={ts("broker_account_name_msg")}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                        onChangeText={handleChangeDescription}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.PASSWORD),
                        view: (
                            <WizardView icon="wallet">
                                <MarginBox>
                                    <SFormTitle>{ts("broker_account_password")}</SFormTitle>
                                    <SFormDescription>{ts("broker_account_password_tip")}</SFormDescription>
                                    <InputText
                                        value={password}
                                        textContentType="password"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        onChangeText={handleChangePassword}/>

                                    <InputText
                                        value={password}
                                        textContentType="password"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        onChangeText={handleChangeConfirmPassword}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.SIGNATURE),
                        view: (
                            <WizardView icon="wallet">
                                <MarginBox>
                                    <SFormTitle>{ts("broker_account_signature")}</SFormTitle>
                                    <SFormDescription>{ts("broker_account_signature_tip")}</SFormDescription>
                                    <InputText
                                        value={signature}
                                        autoCapitalize="words"
                                        textContentType="name"
                                        onChangeText={handleChangeSignature}/>
                                </MarginBox>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.REVIEW),
                        view: (
                            <WizardView icon="wallet">
                                <ScrollViewForm>
                                    <MarginBox noMarginTop>
                                        <SFormDescription>Confira os dados da sua conta na corretora Clear. Caso tenha alguma informação que deseja alterar, você poderá voltar nas telas.</SFormDescription>
                                        <AccountData isReview={true} brokerAccount={transient}/>
                                    </MarginBox>
                                </ScrollViewForm>
                            </WizardView>
                        )
                    },
                    {
                        id: String(BrokerAccountWizardViews.DONE),
                        view: (
                            <WizardView icon="wallet">
                                <GenericTextIcon
                                    title={ts("eba")}
                                    message={ts(messageDone)}
                                    icon={Icons.CHECK_CIRCLE}
                                    iconColor={Colors.BLUES_1}/>
                            </WizardView>
                        )
                    }
                ]}/>
        </FlatLayout>
    )
}