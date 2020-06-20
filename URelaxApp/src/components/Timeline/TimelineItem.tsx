
import React, { FC, ReactElement } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors } from '../../theming'
import { TouchItem, TouchItemProps } from '../TouchItem'

interface TimelineItemProps extends TouchItemProps {
    index: number
    icon: string
    content: ReactElement
    color?: string
    contentDirection?: "row" | "column"
}

export const TimelineItem: FC<TimelineItemProps> = ({ 
    index, 
    icon, 
    content, 
    color = Colors.BLACK_1, 
    contentDirection = "column",
    ...others
}) => {
    return (
        <Touch {...others} noChevron containerBgColor={Colors.WHITE}>
            <IconContent>
                <LineBefore noBorder={index === 0}/>
                <Icon name={icon} size={25} color={color}/>
                <LineAfter/>
            </IconContent>
            <Content direction={contentDirection}>
                { content }
            </Content>
        </Touch>
    )
}

const Touch = styled(TouchItem)`
    padding: 0 20px;
`

const Line = styled.View`
    border-right-width: 1px;
    border-color: ${Colors.BG_2};
    width: 50%;
`

const LineAfter = styled(Line)`
    flex: 1;
`

const LineBefore = styled(Line)<{ noBorder: boolean }>`
    border-right-width: ${({ noBorder }) => noBorder ? 0 : "1px"};
    height: 20px;
`

const IconContent = styled.View`
    height: 100%;
`

const Content = styled.View<{ direction: string }>`
    padding: 20px 0;
    margin-left: 10px;
    flex-direction: ${({ direction }) => direction};
    flex: 1;
`