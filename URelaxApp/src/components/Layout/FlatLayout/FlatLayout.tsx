import React, { FC, ReactElement } from 'react'
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { ts } from '../../../core/I18n'
import { Colors, Icons, TypographyMedium } from '../../../theming'
import { TextIconDisplay } from '../../TextIconDisplay'

export interface FlatLayoutProps {
    bgColor?: string
    bgStatusBar?: string
    barStyle?: "light-content" | "dark-content" | "default"
    fail?: boolean
    loading?: boolean
    indicatorColor?: string
    header?: ReactElement
}

export const FlatLayout: FC<FlatLayoutProps> = ({ 
    children,
    header,
    barStyle = "dark-content",
    bgColor = Colors.BG_5,
    bgStatusBar = Colors.WHITE,
    indicatorColor = Colors.BLUES_1,
    loading,
    fail
}) => {
    return (
        <FlatContainer bgColor={bgColor}>
            <StatusBar barStyle={barStyle} backgroundColor={bgStatusBar} />
            <SafeAreaView style={{ flex: 1 }}>
                { header }
                { !loading && children }
                { fail && <ErrorMessage>
                    <Display
                        icon={Icons.HEART_BROKEN}
                        iconColor={Colors.RED_ERROR}
                        title={ts("oops")}
                        message={ts("server_error")}/>
                </ErrorMessage> }
                { loading && <LoadContainer>
                    <ActivityIndicator
                        color={indicatorColor}
                        size="large"/>
                </LoadContainer> }
            </SafeAreaView>
        </FlatContainer>
    )
}

const FlatContainer = styled.View<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    justify-content: flex-end;
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

const LoadContainer = styled.View`
    justify-content: center;
    flex: 1;

`