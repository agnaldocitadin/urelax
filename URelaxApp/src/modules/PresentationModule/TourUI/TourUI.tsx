import { useNavigation } from "@react-navigation/native"
import React, { FC } from "react"
import styled from "styled-components/native"
import { BaseButton } from "../../../components/BaseButton"
import { FlatLayout } from "../../../components/Layout/FlatLayout"
import { animatedCallback } from "../../../core/Commons.hook"
import { Colors, TypographyMedium } from "../../../theming"
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
        <FlatLayout bgStatusBar={Colors.BG_1}>
            <SContent></SContent>
            <SFooter>
                <SButton onPress={handleCreateAccount}>
                    <TypographyMedium>Create account</TypographyMedium>
                </SButton>
                <SButtonSignin onPress={handleSignin}>
                    <TypographyMedium>Sign in</TypographyMedium>
                </SButtonSignin>
            </SFooter>
        </FlatLayout>
    )
}

const SContent = styled.View`
    flex: 1;
`

const SFooter = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 120px;
`

const SButton = styled(BaseButton)`
    width: 150px;
    background-color: ${Colors.BLUES_1};
`

const SButtonSignin = styled(SButton)`
    background-color: ${Colors.WHITE};
    border-color: ${Colors.BLUES_1};
    border-width: 1px;
`