import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { BaseButton } from '../../../components/BaseButton'
import { InputText } from '../../../components/Inputs/InputText'
import { InteractiveButton } from '../../../components/InteractiveButton'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ScrollViewForm } from '../../../components/Layout/ScrollViewForm'
import { ts } from '../../../core/I18n'
import { Colors, Icons, Typography } from '../../../theming'
import { useProfileUIHook } from './ProfileUIHook'

export const ProfileUI: FC = ({ children }) => {
    
    const {
        input,
        handleFullname,
        handleNickname,
        handlePassword,
        handleEmail,
        handleSaveProfile
    } = useProfileUIHook()

    return (
        <PrimaryLayout title={ts("profile")}>
            <ScrollViewForm>
                <ProfilePhoto>
                    {/* <Thumbnail large source={PROFILE} style={{ width: 120, height: 120, borderRadius: 60 }}/> */}
                    <ChangePhotoBtn>
                        <Camera name={Icons.CAMERA} size={20} color={Colors.WHITE}/>
                        <Typography color={Colors.WHITE}>Change</Typography>
                    </ChangePhotoBtn>
                </ProfilePhoto>

                <InputText
                    label={ts("full_name")}
                    value={input.name}
                    onChangeText={handleFullname}
                    textContentType="username"
                    autoCapitalize="words"
                    autoCorrect={false}
                    />

                <InputText
                    label={ts("nickname")}
                    value={input.nickname}
                    onChangeText={handleNickname}
                    textContentType="nickname"
                    autoCapitalize="words"
                    autoCorrect={false}
                    />
                    
                <InputText
                    label={ts("email")}
                    value={input.email}
                    onChangeText={handleEmail}
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    />

                <InputText
                    label={ts("password")}
                    value={input.password}
                    onChangeText={handlePassword}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    />

                <InputText
                    label={ts("password_confirmation")}
                    textContentType="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    />

                <InteractiveButton
                    onPress={handleSaveProfile}
                    data={{
                        text: "Salvar"
                    }}
                    />
                
            </ScrollViewForm>
        </PrimaryLayout>
    )
}

const ProfilePhoto = styled.View`
    align-items: center;
`

const ChangePhotoBtn = styled(BaseButton)`
    background-color: ${Colors.BLUES_1};
    border-radius: 17px;
    padding: 0 20px;
    height: 35px;
`

const Camera = styled(Icon)`
    margin-right: 10px;
`