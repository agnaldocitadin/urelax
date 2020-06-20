import React, { FC } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { ts } from '../../../core/I18n'
import { Colors, Icons, TypographyMedium } from '../../../theming'
import { TextIconDisplay } from '../../TextIconDisplay'

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
        <FlatContainer bgColor={bgColor}>
            <StatusBar barStyle={barStyle} backgroundColor={bgStatusBar} />
            <SafeAreaView style={{ flex: 1 }}>
                { children }
                { fail && <ErrorMessage>
                    <Display
                        icon={Icons.HEART_BROKEN}
                        iconColor={Colors.RED_ERROR}
                        title={ts("oops")}
                        message={ts("server_error")}/>
                </ErrorMessage> }
            </SafeAreaView>
            {/* <SimulationFlag textAlign="center" color={Colors.WHITE}>{ts("active_simulation")}</SimulationFlag> */}
        </FlatContainer>
    )
}

const FlatContainer = styled.View<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    justify-content: flex-end;
    border-color: ${Colors.BLUES_3};
    /* border-width: 3px; */
    flex: 1;
`

const SimulationFlag = styled(TypographyMedium)`
    background-color: ${Colors.BLUES_3};
    padding: 7px 0;
`

const ErrorMessage = styled.View`
    justify-content: flex-end;
    flex: 1;
`

const Display = styled(TextIconDisplay)`
    background-color: ${Colors.WHITE};
    border-top-color: ${Colors.BG_2};
    border-top-width: 1px;
    padding: 25px 50px 55px 50px;
`