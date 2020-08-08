import React, { FC } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { InputSecure } from '../../../components/Inputs/InputSecure'
import { InputText } from '../../../components/Inputs/InputText'
import { InteractiveButton, InteractiveButtonStates } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_VERTICAL_SPACING, Icons, Images } from '../../../theming'
import { SplashAuth } from '../../SecurityModule/SplashAuth'
import { useSignUpUIHook } from './SignUpUIHook'

interface SignUpUIProps {}

export const SignUpUI: FC<SignUpUIProps> = ({}) => {

    const {
        handleFullnameChanges,
        handleNicknameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleConfirmPasswdChanges,
        handleSignUp,
        handleSignUpFailure,
        handleSignUpSuccess,
        validFullname,
        validNickname,
        validPassword,
        validEmail,
        validPwdConfirm,
        formFilled,
        authenticate,
        profile,
        passwordMatch,
        sending
    } = useSignUpUIHook()

    console.log("--", formFilled)

    return (
        <FlatLayout
            bgColor={Colors.BLUES_2}
            bgStatusBar={Colors.BLUES_2}>

            <SplashAuth
                authenticating={authenticate}
                email={profile?.email}
                password={profile?.password}
                onFail={handleSignUpFailure}
                onSuccess={handleSignUpSuccess}
                noAuthElement={
                    <ScrollViewForm justifyContent="flex-end">
                        <Content>
                            <Logo source={Images.LOGO}/>
                        </Content>
                        <MarginBox>
                            <Input
                                invalid={!validFullname}
                                value={profile?.name}
                                label={ts("full_name")}
                                labelStyle={{ color: Colors.WHITE, fontSize: 14 }}
                                textContentType="username"
                                autoCapitalize="words"
                                autoCorrect={false}
                                leftIcon={Icons.USER}
                                leftIconColor={Colors.WHITE}
                                onChangeText={handleFullnameChanges}
                                wrapperStyle={{
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Input
                                invalid={!validNickname}
                                value={profile?.nickname}
                                label={ts("nickname")}
                                labelStyle={{ color: Colors.WHITE, fontSize: 14 }}
                                textContentType="nickname"
                                autoCapitalize="words"
                                autoCorrect={false}
                                leftIcon={Icons.USER}
                                leftIconColor={Colors.WHITE}
                                onChangeText={handleNicknameChanges}
                                wrapperStyle={{
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Input
                                invalid={!validEmail}
                                value={profile?.email}
                                label={ts("email")}
                                labelStyle={{ color: Colors.WHITE, fontSize: 14 }}
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                autoCorrect={false}
                                leftIcon={Icons.EMAIL}
                                leftIconColor={Colors.WHITE}
                                onChangeText={handleEmailChanges}
                                wrapperStyle={{
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Password
                                invalid={!validPassword}
                                value={profile?.password}
                                label={ts("password")}
                                labelStyle={{ color: Colors.WHITE, fontSize: 14 }}
                                textContentType="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                leftIcon={Icons.PASSWD}
                                leftIconColor={Colors.WHITE}
                                rightIconColor={Colors.WHITE}
                                onChangeText={handlePasswdChanges}
                                wrapperStyle={{
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Password
                                invalid={!validPwdConfirm}
                                value={passwordMatch}
                                label={ts("password_confirmation")}
                                labelStyle={{ color: Colors.WHITE, fontSize: 14 }}
                                textContentType="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                leftIcon={Icons.PASSWD}
                                leftIconColor={Colors.WHITE}
                                rightIconColor={Colors.WHITE}
                                onChangeText={handleConfirmPasswdChanges}
                                wrapperStyle={{
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Button
                                data={{ 
                                    text: "Sign Up",
                                    activityState: sending ? InteractiveButtonStates.PROCESSING : InteractiveButtonStates.NORMAL
                                }}
                                disabled={!formFilled}
                                onPress={handleSignUp}/>
                                
                        </MarginBox>
                    </ScrollViewForm>
                }/> 
        </FlatLayout>
    )
}

const Logo = styled(Image)`
    transform: scale(.4);
`

const Input = styled(InputText)`
    color: ${Colors.WHITE};
`

const Password = styled(InputSecure)`
    color: ${Colors.WHITE};
`

const Content = styled.View`
    align-items: center;
`

const Button = styled(InteractiveButton)`
    background-color: ${Colors.WHITE};
    border-radius: 25px;
`