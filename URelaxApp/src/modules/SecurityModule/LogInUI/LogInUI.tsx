import React, { FC } from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import { InputSwitch } from '../../../components/Inputs/InputSwitch'
import { InputText } from '../../../components/Inputs/InputText'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { FORM_PADDING, MarginBox } from '../../../components/Layout/Layout.style'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, Icons, Images } from '../../../theming'
import { SplashAuth } from '../SplashAuth'
import { useLogInUIHook } from './LogInUIHook'

const TEXT_SIZE = 16

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
            bgStatusBar={Colors.BLUES_1}
            bgColor={Colors.BLUES_1}>
            <SplashAuth
                authenticating={authenticate}
                email={email}
                password={password}
                keepSession={keepSession}
                onSuccess={handleAuthSuccess}
                onFail={handleAuthFail}
                noAuthElement={
                    <React.Fragment>
                        <Image source={Images.LOGO} style={{ transform: [{ scale: .7 }] }}/>
                        <ScrollViewForm justifyContent="flex-end">
                            <MarginBox>
                                <Input
                                    label={ts("email")}
                                    labelStyle={{ color: Colors.WHITE }}
                                    placeholder={ts("your_email")}
                                    textContentType="emailAddress"
                                    // inputStyle={{ fontSize: TEXT_SIZE, color: Colors.WHITE }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    leftIcon={Icons.EMAIL}
                                    // invalid={!validEmail}
                                    // invalidText={ts("invalid_email")}
                                    value={email}
                                    onChangeText={setEmail}/>

                                <Input
                                    label={ts("password")}
                                    labelStyle={{ color: Colors.WHITE }}
                                    placeholder={ts("your_password")}
                                    textContentType="password"
                                    autoCapitalize="none"
                                    // inputStyle={{ fontSize: TEXT_SIZE, color: Colors.WHITE }}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    leftIcon={Icons.PASSWD}
                                    // invalid={!validPassword}
                                    // invalidText={ts("invalid_password")}
                                    value={password}
                                    onChangeText={setPassword}/>

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

const Input = styled(InputText)`
    /* margin-bottom: ${FORM_PADDING}; */
    /* background-color: ${Colors.BLUES_1}; */
    /* border-color: ${Colors.WHITE}; */
`

const Switch = styled(InputSwitch)`
    margin-bottom: ${FORM_PADDING};
`