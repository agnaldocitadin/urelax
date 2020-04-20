import { Text } from "native-base"
import React, { FC } from "react"
import { NavigationStackProp } from "react-navigation-stack"

interface TemplateProps {
    navigation: NavigationStackProp    
}

export const Template: FC<TemplateProps> = ({ navigation }) => {
    return (
        <Text>Template</Text>
    )
}
