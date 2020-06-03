import React, { FC } from 'react'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Colors } from '../../../theming'
import { SplashAuth } from '../SplashAuth'
import { useLogInUIHook } from './LogInUIHook'

const TEXT_SIZE = 16

interface LogInUIProps {}

export const LogInUI: FC<LogInUIProps> = ({}) => {
    
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
    } = useLogInUIHook()

    return (
        <FlatLayout bgStatusBar={authenticate ? Colors.BLUES_1 : Colors.WHITE}>
            
            <SplashAuth
                authenticating={authenticate}
                email={email}
                password={passwd}
                keepSession={keepSession}
                onFail={handleAuthFail}
                noAuthElement={
                    <React.Fragment>
                        {/* <BackHeader title={ts("sign_in")}/>
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
                        </ScrollViewForm> */}
                    </React.Fragment>
                }/>
        </FlatLayout>
    )
}

// const Input = styled(InputText)`
//     margin-bottom: ${FORM_PADDING};
// `

// const Switch = styled(InputSwitch)`
//     margin-bottom: ${FORM_PADDING};
// `