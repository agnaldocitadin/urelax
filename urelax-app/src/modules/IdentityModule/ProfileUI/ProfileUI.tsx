import React, { FC } from 'react'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { InputSecure } from '../../../components/Inputs/InputSecure'
import { InputText } from '../../../components/Inputs/InputText'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { MarginBox } from '../../../components/Layout/Layout.style'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, DEFAULT_VERTICAL_SPACING, Icons, Images, Typography } from '../../../theming'
import { useProfileUIHook } from './ProfileUIHook'

export const ProfileUI: FC = ({ children }) => {
    
    const {
        input,
        loading,
        passwordMatch,
        validFullname,
        validNickname,
        validEmail,
        validPassword,
        validPwdConfirm,
        formFilled,
        handleFullname,
        handleNickname,
        handlePassword,
        handleEmail,
        handleSaveProfile,
        handlePasswordConfirm
    } = useProfileUIHook()

    return (
        <PrimaryLayout
            loading={loading}
            title={ts("profile")}
            bgColor={Colors.WHITE}>
            { !loading && <ScrollViewForm>
                <ProfilePhoto>
                    <Image 
                        source={Images.PROFILE}
                        style={{ maxWidth: 100, maxHeight: 100, borderRadius: 50 }}/>

                    <ChangePhotoBtn>
                        <Camera name={Icons.CAMERA} size={20} color={Colors.WHITE}/>
                        <Typography color={Colors.WHITE}>Change</Typography>
                    </ChangePhotoBtn>
                </ProfilePhoto>
                <MarginBox>

                <InputText
                    invalid={!validFullname}
                    label={ts("full_name")}
                    labelStyle={{ color: Colors.GRAY_1 }}
                    value={input.name}
                    onChangeText={handleFullname}
                    textContentType="username"
                    autoCapitalize="words"
                    autoCorrect={false}
                    wrapperStyle={{
                        borderColor: Colors.GRAY_4,
                        marginBottom: DEFAULT_VERTICAL_SPACING
                    }}
                    />

                <InputText
                    invalid={!validNickname}
                    label={ts("nickname")}
                    labelStyle={{ color: Colors.GRAY_1 }}
                    value={input.nickname}
                    onChangeText={handleNickname}
                    textContentType="nickname"
                    autoCapitalize="words"
                    autoCorrect={false}
                    wrapperStyle={{
                        borderColor: Colors.GRAY_4,
                        marginBottom: DEFAULT_VERTICAL_SPACING
                    }}
                    />
                    
                <InputText
                    invalid={!validEmail}
                    label={ts("email")}
                    labelStyle={{ color: Colors.GRAY_1 }}
                    value={input.email}
                    onChangeText={handleEmail}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    wrapperStyle={{
                        borderColor: Colors.GRAY_4,
                        marginBottom: DEFAULT_VERTICAL_SPACING
                    }}
                    />

                <InputSecure
                    invalid={!validPassword}
                    label={ts("password")}
                    labelStyle={{ color: Colors.GRAY_1 }}
                    value={input.password}
                    onChangeText={handlePassword}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    wrapperStyle={{
                        borderColor: Colors.GRAY_4,
                        marginBottom: DEFAULT_VERTICAL_SPACING
                    }}
                    />

                <InputSecure
                    invalid={!validPwdConfirm}
                    label={ts("password_confirmation")}
                    labelStyle={{ color: Colors.GRAY_1 }}
                    value={passwordMatch}
                    onChangeText={handlePasswordConfirm}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    wrapperStyle={{
                        borderColor: Colors.GRAY_4,
                        marginBottom: DEFAULT_VERTICAL_SPACING
                    }}
                    />

                <Button
                    onPress={handleSaveProfile}
                    disabled={!formFilled}
                    data={{
                        text: "Salvar",
                        textColor: Colors.WHITE,
                    }}
                    />

                </MarginBox>
            </ScrollViewForm>}
        </PrimaryLayout>
    )
}

const ProfilePhoto = styled.View`
    align-items: center;
    margin-top: 25px;
    height: 130px;
`

const ChangePhotoBtn = styled(BaseButton)`
    background-color: ${Colors.BLUES_1};
    border-radius: 17px;
    padding: 0 20px;
    height: 35px;
    transform: translateY(-15px);
`

const Camera = styled(Icon)`
    margin-right: 10px;
`

const Button = styled(InteractiveButton)`
    background-color: ${({ disabled }) => disabled ? Colors.GRAY_4 : Colors.BLUES_1};
    border-radius: 5px;
`