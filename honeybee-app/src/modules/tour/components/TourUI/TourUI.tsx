import { Button, Text, View } from "native-base"
import React, { FC } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import styled from "styled-components"
import { Colors, Theme } from "../../../../core/Theme"
import { animatedCallback } from "../../../../globals/Utils"
import { Routes } from "../../../../navigations/Navigator"
import { FlatLayout } from "../../../../ui/components/Layout/FlatLayout"

interface TourUIProps {
    navigation: NavigationStackProp    
}

/**
 *
 *
 * @param {*} { navigation }
 * @returns
 */
export const TourUI: FC<TourUIProps> = ({ navigation }) => {

    const handleCreateAccount = animatedCallback(() => navigation.navigate(Routes.SignUpUI))
    const handleSignin = animatedCallback(() => navigation.navigate(Routes.LogInUI))

    return (
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <SContent></SContent>
            <SFooter>
                <SButton onPress={handleCreateAccount}>
                    <SButtonLabel>Create account</SButtonLabel>
                </SButton>
                <SButtonSignin onPress={handleSignin}>
                    <SButtonSigninLabel>Sign in</SButtonSigninLabel>
                </SButtonSignin>
            </SFooter>
        </FlatLayout>
    )
}

const SContent = styled(View)`
    flex: 1;
`

const SFooter = styled(View)`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 120px;
`

const SButton = styled(Button)`
    width: 150px;
    justify-content: center;
    background-color: ${Colors.BLUES_1};
`

const SButtonSignin = styled(SButton)`
    background-color: ${Colors.WHITE};
    border-color: ${Colors.BLUES_1};
    border-width: 1px;
`

const SButtonLabel = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.WHITE};
`

const SButtonSigninLabel = styled(SButtonLabel)`
    color: ${Colors.BLUES_1};
`