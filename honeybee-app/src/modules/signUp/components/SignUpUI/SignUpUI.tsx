import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { InputText } from '../../../../ui/components/InputText'
import { InteractiveButton, InteractiveButtonStates } from '../../../../ui/components/InteractiveButton'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { SplashAuth } from '../../../signIn'
import { useSignUpUIHook } from './SignUpUIHook'

const TEXT_SIZE = 14

interface SignUpUIProps {
    navigation: NavigationStackProp
}

export const SignUpUI: FC<SignUpUIProps> = ({ navigation }) => {

    const {
        handleFullnameChanges,
        handleNicknameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleConfirmPasswdChanges,
        handleSignUp,
        handleSignInFailure,
        validFullname,
        validNickname,
        validPassword,
        validEmail,
        validPwdConfirm,
        formFilled,
        authenticate,
        account,
        passwordMatch
    } = useSignUpUIHook(navigation)

    return (
        <FlatLayout>
            <BackHeader title={ts("sign_up")}/>

            <SplashAuth
                navigation={navigation}
                authenticating={authenticate}
                email={account.email}
                password={account.passwd}
                simulation={false}
                onFail={handleSignInFailure}
                noAuthElement={
                    <ScrollViewForm justifyContent="flex-end">
                        <Input
                            value={account.name}
                            label={ts("full_name")}
                            textContentType="username"
                            textSize={TEXT_SIZE}
                            autoCapitalize="words"
                            autoCorrect={false}
                            leftIcon={Icons.USER}
                            invalid={!validFullname}
                            invalidText={ts("invalid_full_name")}
                            onChangeText={handleFullnameChanges}/>

                        <Input
                            value={account.nickname}
                            label={ts("nickname")}
                            textSize={TEXT_SIZE}
                            textContentType="nickname"
                            autoCapitalize="words"
                            autoCorrect={false}
                            leftIcon={Icons.USER}
                            invalid={!validNickname}
                            invalidText={ts("invalid_nickname")}
                            onChangeText={handleNicknameChanges}/>

                        <Input
                            value={account.email}
                            label={ts("email")}
                            textContentType="emailAddress"
                            textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            leftIcon={Icons.EMAIL}
                            invalid={!validEmail}
                            invalidText={ts("invalid_email")}
                            onChangeText={handleEmailChanges}/>

                        <Input
                            value={account.passwd}
                            label={ts("password")}
                            textContentType="password"
                            textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            leftIcon={Icons.PASSWD}
                            invalid={!validPassword}
                            invalidText={ts("invalid_password")}
                            onChangeText={handlePasswdChanges}/>

                        <Input
                            value={passwordMatch}
                            label={ts("password_confirmation")}
                            textContentType="password"
                            textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            leftIcon={Icons.PASSWD}
                            invalid={!validPwdConfirm}
                            invalidText={ts("invalid_password_confirmation")}
                            onChangeText={handleConfirmPasswdChanges}/>

                        <InteractiveButton
                            block
                            successStatus={InteractiveButtonStates.NORMAL}
                            normalText={ts("sign_up")}
                            indicatorColor={Colors.WHITE}
                            processingBgColor={Colors.BLUES_1}
                            normalBgColor={Colors.BLUES_1}
                            textColor={Colors.WHITE}
                            disabled={!formFilled || !(validFullname && validNickname && validEmail && validPassword && validPwdConfirm)}
                            radius={4}
                            onPress={handleSignUp}/>
                    </ScrollViewForm>
                }/> 
        </FlatLayout>
    )
}

const Input = styled(InputText)`
    margin-bottom: ${FORM_PADDING};
`