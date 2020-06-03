// import { Container, Text } from 'native-base'
import React, { FC } from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../../theming'
// import { ts } from '../../../../core/I18n'
// import { Colors, Icons, Theme } from '../../../../core/Theme'
// import { States } from '../../../../reducers/Reducer'
// import { TextIconDisplay } from '../../TextIconDisplay'

export interface FlatLayoutProps {
    bgColor?: string
    bgStatusBar?: string
    barStyle?: "light-content" | "dark-content" | "default"
    fail?: boolean
}

export const FlatLayout: FC<FlatLayoutProps> = ({ 
    children, 
    barStyle = "dark-content",
    bgColor = Colors.BG_1,
    bgStatusBar = Colors.WHITE,
    fail
}) => {
    return (
        <React.Fragment>
            <FlatContainer bgColor={bgColor}>
                <StatusBar barStyle={barStyle} backgroundColor={bgStatusBar} />
                <SafeAreaView style={{ flex: 1 }}>
                    { children }
                    { fail && <ErrorMessage>
                        {/* <Display
                            icon={Icons.HEART_BROKEN}
                            iconColor={Colors.RED_ERROR}
                            title={ts("oops")}
                            message={ts("server_error")}/> */}
                    </ErrorMessage> }
                </SafeAreaView>
                {/* { simulation && <SimulationFlag>{ts("active_simulation")}</SimulationFlag> } */}
            </FlatContainer>
        </React.Fragment>
    )
}

const FlatContainer: any = styled.View`
    background-color: ${(props: any) => props.bgColor};
    justify-content: flex-end;
    flex: 1;
`

// const SimulationFlag = styled.Text`
//     background-color: ${Colors.BLUES_3};
//     font-family: ${Theme.FONT_REGULAR};
//     color: ${Colors.WHITE};
//     font-size: 14px;
//     text-align: center;
//     padding: 7px 0;
// `

const ErrorMessage = styled(View)`
    justify-content: flex-end;
    flex: 1;
`

// const Display = styled(TextIconDisplay)`
//     background-color: ${Colors.WHITE};
//     border-top-color: ${Colors.BG_2};
//     border-top-width: 1px;
//     padding: 25px 50px 55px 50px;
// `