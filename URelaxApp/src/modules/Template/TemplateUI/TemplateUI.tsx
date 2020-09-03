import React, { FC } from 'react'
import { Text } from 'react-native'

export const TemplateUI: FC = ({ children }) => {
    
    return (
        <React.Fragment>
            <Text>Opa!</Text>
            {children}
        </React.Fragment>
    )
}