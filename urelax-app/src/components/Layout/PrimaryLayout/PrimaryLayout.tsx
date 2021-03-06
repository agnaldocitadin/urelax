import { DrawerActions, useNavigation } from "@react-navigation/native"
import React, { FC, ReactElement } from "react"
import { animatedCallback } from "../../../core/Commons.hook"
import { Colors, TypographyMedium } from "../../../theming"
import { BackHeader } from "../../Header/BackHeader"
import { ButtonHeader } from "../../Header/ButtonHeader"
import { FlatLayout, FlatLayoutProps } from "../FlatLayout"

interface PrimaryLayoutProps extends FlatLayoutProps {
    title?: string
    titleColor?: string
    right?: ReactElement | boolean
}

export const PrimaryLayout: FC<PrimaryLayoutProps> = ({
    title,
    titleColor = Colors.WHITE,
    right,
    children,
    ...others
}) => {
    const navigation = useNavigation()
    const toogleDrawer = animatedCallback(() => navigation.dispatch(DrawerActions.toggleDrawer()))
    return (
        <FlatLayout 
            {...others}
            barStyle="light-content"
            header={
                <BackHeader
                    bgHeaderColor={Colors.BLUES_1}
                    borderBottomWidth={0}
                    backColor={titleColor}
                    center={
                        <TypographyMedium
                            fontSize={15}
                            color={titleColor}>
                            {title}
                        </TypographyMedium>
                    }
                    right={
                        <React.Fragment>
                            { right }
                            <ButtonHeader
                                onPress={toogleDrawer}
                                icon={"dots-horizontal"}
                                color={Colors.WHITE}/>
                        </React.Fragment>
                    }/>
            }>
            { children }
        </FlatLayout>
    )
}