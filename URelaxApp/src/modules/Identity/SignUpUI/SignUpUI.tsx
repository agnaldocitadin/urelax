import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InputText } from '../../../components/InputText'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, Icons } from '../../../theming'
import { SplashAuth } from '../../Security/SplashAuth'
import { useSignUpUIHook } from './SignUpUIHook'

const TEXT_SIZE = 14

interface SignUpUIProps {}

export const SignUpUI: FC<SignUpUIProps> = ({}) => {

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
    } = useSignUpUIHook()

    return (
        <FlatLayout>
            <BackHeader title={ts("sign_up")}/>

            <SplashAuth
                authenticating={authenticate}
                email={account.email}
                password={account.passwd}
                onFail={handleSignInFailure}
                noAuthElement={
                    <ScrollViewForm justifyContent="flex-end">
                        <Input
                            value={account.name}
                            label={ts("full_name")}
                            textContentType="username"
                            // textSize={TEXT_SIZE}
                            autoCapitalize="words"
                            autoCorrect={false}
                            leftIcon={Icons.USER}
                            // invalid={!validFullname}
                            // invalidText={ts("invalid_full_name")}
                            onChangeText={handleFullnameChanges}/>

                        <Input
                            value={account.nickname}
                            label={ts("nickname")}
                            // textSize={TEXT_SIZE}
                            textContentType="nickname"
                            autoCapitalize="words"
                            autoCorrect={false}
                            leftIcon={Icons.USER}
                            // invalid={!validNickname}
                            // invalidText={ts("invalid_nickname")}
                            onChangeText={handleNicknameChanges}/>

                        <Input
                            value={account.email}
                            label={ts("email")}
                            textContentType="emailAddress"
                            // textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            leftIcon={Icons.EMAIL}
                            // invalid={!validEmail}
                            // invalidText={ts("invalid_email")}
                            onChangeText={handleEmailChanges}/>

                        <Input
                            value={account.passwd}
                            label={ts("password")}
                            textContentType="password"
                            // textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            leftIcon={Icons.PASSWD}
                            // invalid={!validPassword}
                            // invalidText={ts("invalid_password")}
                            onChangeText={handlePasswdChanges}/>

                        <Input
                            value={passwordMatch}
                            label={ts("password_confirmation")}
                            textContentType="password"
                            // textSize={TEXT_SIZE}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            leftIcon={Icons.PASSWD}
                            // invalid={!validPwdConfirm}
                            // invalidText={ts("invalid_password_confirmation")}
                            onChangeText={handleConfirmPasswdChanges}/>

                        <InteractiveButton
                            data={{}}
                            indicatorColor={Colors.WHITE}
                            disabled={!formFilled || !(validFullname && validNickname && validEmail && validPassword && validPwdConfirm)}
                            onPress={handleSignUp}/>

                    </ScrollViewForm>
                }/> 
        </FlatLayout>
    )
}

const Input = styled(InputText)`
    margin-bottom: ${FORM_PADDING};
`