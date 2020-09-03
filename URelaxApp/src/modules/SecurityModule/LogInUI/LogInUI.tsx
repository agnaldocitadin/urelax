import React, { FC } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { InputSecure } from '../../../components/Inputs/InputSecure'
import { InputSwitch } from '../../../components/Inputs/InputSwitch'
import { InputText } from '../../../components/Inputs/InputText'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_VERTICAL_SPACING, Icons, Images } from '../../../theming'
import { SplashAuth } from '../SplashAuth'
import { useLogInUIHook } from './LogInUIHook'

const COLOR = Colors.BLUES_1
const INPUTEXT_FONT_SIZE = 15

interface LogInUIProps {}

export const LogInUI: FC<LogInUIProps> = ({}) => {
    
    const {
        authenticate,
        email,
        password,
        keepSession,
        disabledLogIn,
        signinBtn,
        setEmail,
        setPassword,
        setKeepSession,
        handleAuthentication,
        handleAuthSuccess,
        handleAuthFail
    } = useLogInUIHook()

    return (
        <FlatLayout 
            bgStatusBar={COLOR}
            bgColor={COLOR}>
            <SplashAuth
                authenticating={authenticate}
                email={email}
                password={password}
                keepSession={keepSession}
                onSuccess={handleAuthSuccess}
                onFail={handleAuthFail}
                noAuthElement={
                    <ScrollViewForm style={{ flex: 1 }} justifyContent="flex-end">
                        <Content>
                            <Logo source={Images.LOGO}/>
                        </Content>
                        <MarginBox>
                            <EmailInput
                                placeholder={ts("your_email")}
                                placeholderTextColor={Colors.BG_3}
                                textContentType="emailAddress"
                                autoCapitalize="none"
                                autoCorrect={false}
                                leftIcon={Icons.EMAIL}
                                leftIconColor={Colors.WHITE}
                                value={email}
                                onChangeText={setEmail}
                                wrapperStyle={{ 
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <PasswordInput
                                placeholder={ts("your_password")}
                                placeholderTextColor={Colors.BG_3}
                                textContentType="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={true}
                                leftIcon={Icons.PASSWD}
                                leftIconColor={Colors.WHITE}
                                rightIconColor={Colors.WHITE}
                                value={password}
                                onChangeText={setPassword}
                                wrapperStyle={{ 
                                    borderColor: Colors.WHITE,
                                    marginBottom: DEFAULT_VERTICAL_SPACING
                                }}/>

                            <Switch
                                label={ts("keep_session")}
                                labelColor={Colors.WHITE}
                                value={keepSession}
                                onChange={setKeepSession}/>

                            <Button 
                                data={signinBtn}
                                disabled={disabledLogIn}
                                onPress={handleAuthentication}/>
                        </MarginBox>
                    </ScrollViewForm>
                }/>
        </FlatLayout>
    )
}

const Logo = styled(Image)`
    transform: scale(.5);
`

const Content = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

const EmailInput = styled(InputText)`
    color: ${Colors.WHITE};
    font-size: ${INPUTEXT_FONT_SIZE}px;
`

const PasswordInput = styled(InputSecure)`
    color: ${Colors.WHITE};
    font-size: ${INPUTEXT_FONT_SIZE}px;
`

const Switch = styled(InputSwitch)`
    margin-bottom: ${DEFAULT_VERTICAL_SPACING}px;
`

const Button = styled(InteractiveButton)`
    background-color: ${Colors.WHITE};
    border-radius: 25px;
    margin-top: 30px;
`