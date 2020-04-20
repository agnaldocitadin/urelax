import { Button, Icon, Text, Thumbnail, View } from 'native-base'
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import styled from 'styled-components'
import { ts } from '../../../../core/I18n'
import { Colors, Icons, PROFILE, Theme } from '../../../../core/Theme'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { InputText } from '../../../../ui/components/InputText'
import { InteractiveButton } from '../../../../ui/components/InteractiveButton'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { FORM_PADDING } from '../../../../ui/components/Layout/Layout.style'
import { ScrollViewForm } from '../../../../ui/components/Layout/ScrollViewForm'
import { useAccountUIHook } from './AccountUIHook'

const TEXT_SIZE = 14

interface AccountUIProps {
    navigation: NavigationStackProp
}

export const AccountUI: FC<AccountUIProps> = ({ navigation }) => {
    
    const { 
        account,
        passwordConfirm,
        validName,
        validNickname,
        validEmail,
        validPassword,
        validConfirmPassword,
        validForm,
        disabledForm,
        handleFullnameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleNicknameChanges,
        handleSaveAccount,
        handlePasswordConfirmChanges
    } = useAccountUIHook()

    return (
        <FlatLayout>
            <BackHeader title="Acccount"/>
                <ScrollViewForm justifyContent="flex-end">
                    <SProfile>
                        <Thumbnail large source={PROFILE} style={{ width: 120, height: 120, borderRadius: 60 }}/>
                        <SButtonPhotoSwitch rounded>
                            <ThumbIcon type={Theme.ICON_PACK} name={Icons.CAMERA}/>
                            <ThumbChange>Change</ThumbChange>
                        </SButtonPhotoSwitch>
                    </SProfile>

                    { disabledForm && <WhyDisabled>{ts("account_update_disabled")}</WhyDisabled>}

                    <Input
                        value={account?.name}
                        label={ts("full_name")}
                        textContentType="username"
                        textSize={TEXT_SIZE}
                        autoCapitalize="words"
                        autoCorrect={false}
                        leftIcon={Icons.USER}
                        invalid={!validName}
                        invalidText={ts("invalid_full_name")}
                        onChangeText={handleFullnameChanges}
                        loading={!account}
                        disabled={disabledForm}/>

                    <Input
                        value={account?.email}
                        label={ts("email")}
                        textContentType="emailAddress"
                        textSize={TEXT_SIZE}
                        autoCapitalize="none"
                        autoCorrect={false}
                        leftIcon={Icons.EMAIL}
                        invalid={!validEmail}
                        invalidText={ts("invalid_email")}
                        onChangeText={handleEmailChanges}
                        loading={!account}
                        disabled={disabledForm}/>

                    <Input
                        value={account?.nickname}
                        label={ts("nickname")}
                        textContentType="nickname"
                        textSize={TEXT_SIZE}
                        autoCapitalize="words"
                        autoCorrect={false}
                        leftIcon={Icons.USER}
                        invalid={!validNickname}
                        invalidText={ts("invalid_nickname")}
                        onChangeText={handleNicknameChanges}
                        loading={!account}
                        disabled={disabledForm}/>

                    <Input
                        value={account?.passwd}
                        label={ts("password")}
                        textContentType="password"
                        textSize={TEXT_SIZE}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        leftIcon={Icons.PASSWD}
                        invalid={!validPassword}
                        invalidText={ts("invalid_password")}
                        onChangeText={handlePasswdChanges}
                        loading={!account}
                        disabled={disabledForm}/>

                    <Input
                        value={passwordConfirm}
                        label={ts("password_confirmation")}
                        textContentType="password"
                        textSize={TEXT_SIZE}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        leftIcon={Icons.PASSWD}
                        invalid={!validConfirmPassword}
                        invalidText={ts("invalid_password_confirmation")}
                        onChangeText={handlePasswordConfirmChanges}
                        loading={!account}
                        disabled={disabledForm}/>
                    
                    <InteractiveButton 
                        block
                        textColor={Colors.WHITE}
                        normalBgColor={Colors.BLUES_1}
                        normalText={ts("save_account")}
                        radius={6}
                        disabled={!validForm || disabledForm}
                        animate={false}
                        onPress={handleSaveAccount}/>
                </ScrollViewForm>
        </FlatLayout>
    )
}

const SProfile = styled(View)`
    align-items: center;
`

const Input = styled(InputText)`
    margin-bottom: ${FORM_PADDING};
`

const ThumbIcon = styled(Icon)`
    font-size: 20px;
`

const ThumbChange = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
`

const SButtonPhotoSwitch = styled(Button)`
    background-color: ${Colors.BLACK_2};
    transform: translateY(-20px);
    height: 35px;
`

const WhyDisabled = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    margin-bottom: ${FORM_PADDING};
    border-color: ${Colors.GRAY_1};
    color: ${Colors.GRAY_1};
    text-align: center;
    border-radius: 5px;
    border-width: 1px;
    font-size: 14px;
    padding: 15px;
`