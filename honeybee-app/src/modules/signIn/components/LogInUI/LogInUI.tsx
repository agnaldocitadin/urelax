import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { InputSwitch } from '../../../../ui/components/InputSwitch'
import { InputText } from '../../../../ui/components/InputText'
import { InteractiveButton } from '../../../../ui/components/InteractiveButton'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { SplashAuth } from '../SplashAuth'
import { useLogInUIHook } from './LogInUIHook'

const TEXT_SIZE = 16

interface LogInUIProps {
    navigation: NavigationStackProp
}

export const LogInUI: FC<LogInUIProps> = ({ navigation }) => {
    
    const {
        authenticate,
        email,
        passwd,
        keepSession,
        disabledLogIn,
        validEmail,
        validPassword,
        handleEmailChanges, 
        handlePasswdChanges, 
        handleAuthentication,
        handleKeepSessionChange,
        handleAuthFail
    } = useLogInUIHook(navigation)

    return (
        <FlatLayout bgStatusBar={authenticate ? Colors.BLUES_1 : Colors.WHITE}>
            
            <SplashAuth
                navigation={navigation} 
                authenticating={authenticate}
                email={email}
                password={passwd}
                simulation={false}
                keepSession={keepSession}
                onFail={handleAuthFail}
                noAuthElement={
                    <React.Fragment>
                        <BackHeader title={ts("sign_in")}/>
                        <ScrollViewForm justifyContent="flex-end">
                            <Input
                                label={ts("email")}
                                placeholder={ts("your_email")}
                                textContentType="emailAddress"
                                textSize={TEXT_SIZE}
                                autoCapitalize="none"
                                autoCorrect={false}
                                leftIcon={Icons.EMAIL}
                                invalid={!validEmail}
                                invalidText={ts("invalid_email")}
                                value={email}
                                onChangeText={handleEmailChanges}/>

                            <Input
                                label={ts("password")}
                                placeholder={ts("your_password")}
                                textContentType="password"
                                autoCapitalize="none"
                                textSize={TEXT_SIZE}
                                autoCorrect={false}
                                secureTextEntry={true}
                                leftIcon={Icons.PASSWD}
                                invalid={!validPassword}
                                invalidText={ts("invalid_password")}
                                value={passwd}
                                onChangeText={handlePasswdChanges}/>

                            <Switch
                                text={ts("keep_session")}
                                value={keepSession}
                                onChange={handleKeepSessionChange}/>

                            <InteractiveButton 
                                block
                                normalText={ts("sign_in")}
                                indicatorColor={Colors.WHITE}
                                processingBgColor={Colors.BLUES_1}
                                normalBgColor={Colors.BLUES_1}
                                textColor={Colors.WHITE}
                                radius={4}
                                disabled={disabledLogIn}
                                onPress={handleAuthentication}
                                animate={false}/>
                        </ScrollViewForm>
                    </React.Fragment>
                }/>
        </FlatLayout>
    )
}

const Input = styled(InputText)`
    margin-bottom: ${FORM_PADDING};
`

const Switch = styled(InputSwitch)`
    margin-bottom: ${FORM_PADDING};
`