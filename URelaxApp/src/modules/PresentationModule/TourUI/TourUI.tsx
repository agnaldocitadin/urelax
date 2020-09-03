import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import { Image } from "react-native"
import styled from "styled-components/native"
import { BaseButton } from "../../../components/BaseButton"
import { FlatLayout } from "../../../components/Layout/FlatLayout"
import { animatedCallback } from "../../../core/Commons.hook"
import { Colors, Images, TypographyMedium } from "../../../theming"
import { Routes } from "../../NavigationModule/const"

interface TourUIProps {}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const TourUI: FC<TourUIProps> = () => {

    const navigation = useNavigation()
    const handleCreateAccount = animatedCallback(() => navigation.navigate(Routes.SIGN_UP))
    const handleSignin = animatedCallback(() => navigation.navigate(Routes.SIGN_IN))

    return (
        <FlatLayout
            bgStatusBar={Colors.BLUES_1}
            bgColor={Colors.BLUES_1}>
            <Content>
                <Logo source={Images.LOGO}/>
                <TypographyMedium color={Colors.WHITE} fontSize={18}>Invista, relaxe!</TypographyMedium>
            </Content>
            <Footer>
                <SigninBtn onPress={handleSignin}>
                    <TypographyMedium>Sign in</TypographyMedium>
                </SigninBtn>
                <SignupBtn onPress={handleCreateAccount}>
                    <TypographyMedium color={Colors.WHITE}>Create account</TypographyMedium>
                </SignupBtn>
            </Footer>
        </FlatLayout>
    )
}

const Logo = styled(Image)`
    transform: scale(.75);
    margin-bottom: 30px;
`

const Content = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`

const Footer = styled.View`
    justify-content: center;
    align-items: center;
    margin: 0 30px;
    flex: 1;
`

const SigninBtn = styled(BaseButton)`
    background-color: ${Colors.WHITE};
    border-radius: 25px;
    width: 100%;
`

const SignupBtn = styled(SigninBtn)`
    background-color: ${Colors.TRANSPARENT};
    border-color: ${Colors.WHITE};
    border-width: 1px;
    margin-top: 30px;
`
