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
                    <React.Fragment>
                        <Logo source={Images.LOGO}/>
                        <ScrollViewForm justifyContent="flex-end">
                            <MarginBox>
                                <EmailInput
                                    label={ts("email")}
                                    labelStyle={{ color: Colors.WHITE }}
                                    placeholder={ts("your_email")}
                                    textContentType="emailAddress"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon={Icons.EMAIL}
                                    value={email}
                                    onChangeText={setEmail}
                                    wrapperStyle={{ 
                                        borderColor: Colors.WHITE,
                                        marginBottom: DEFAULT_VERTICAL_SPACING
                                    }}/>

                                <PasswordInput
                                    label={ts("password")}
                                    labelStyle={{ color: Colors.WHITE }}
                                    placeholder={ts("your_password")}
                                    textContentType="password"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    leftIcon={Icons.PASSWD}
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

                                <InteractiveButton 
                                    data={signinBtn}
                                    disabled={disabledLogIn}
                                    onPress={handleAuthentication}/>
                            </MarginBox>
                        </ScrollViewForm>
                    </React.Fragment>
                }/>
        </FlatLayout>
    )
}
const Logo = styled(Image)`
    transform: scale(.7);
`

const EmailInput = styled(InputText)`
    color: ${Colors.WHITE};
`

const PasswordInput = styled(InputSecure)`
    color: ${Colors.WHITE};
`

const Switch = styled(InputSwitch)`
    margin-bottom: ${DEFAULT_VERTICAL_SPACING}px;
`