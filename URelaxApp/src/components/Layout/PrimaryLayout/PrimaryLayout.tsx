import { DrawerActions, useNavigation } from "@react-navigation/native"
import React, { FC, ReactElement } from "react"
import { Colors, TypographyMedium } from "../../../theming"
import { ButtonHeader } from "../../Header/ButtonHeader"
import { FlatHeader } from "../../Header/FlatHeader"
import { FlatLayout, FlatLayoutProps } from "../FlatLayout"
import { BackHeader } from "../../Header/BackHeader"

interface PrimaryLayoutProps extends FlatLayoutProps {
    title?: string
    titleColor?: string
    right?: ReactElement
}

export const PrimaryLayout: FC<PrimaryLayoutProps> = ({
    title,
    titleColor = Colors.WHITE,
    right,
    children,
    ...others
}) => {
    const navigation = useNavigation()
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
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                                icon={"dots-horizontal"}
                                color={Colors.WHITE}/>
                        </React.Fragment>
                    }/>
            }>
            { children }
        </FlatLayout>
    )
}