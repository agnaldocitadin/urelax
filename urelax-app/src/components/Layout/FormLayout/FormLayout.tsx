import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, Icons } from '../../../theming'
import { BackHeader, BackHeaderProps } from '../../Header/BackHeader'
import { ButtonHeader } from '../../Header/ButtonHeader'
import { InteractiveButton, InteractiveButtonData, InteractiveButtonProps } from '../../InteractiveButton'
import { FlatLayout, FlatLayoutProps } from '../FlatLayout'
import { SFlatFooter } from '../Layout.style'

interface Props extends FlatLayoutProps, BackHeaderProps, InteractiveButtonProps {
    onProcess?(): Promise<any>
    onClose?(): void
}

export const FormLayout: FC<Props> = (props) => {
    
    const {
        // layout
        bgColor = Colors.WHITE,
        barStyle,
        fail,
        children,
        
        // header
        title,
        titleColor,
        bgHeaderColor,
        left,
        borderBottomWidth,
        borderBottomColor,
        onClose,
        
        // button
        onProcess,
        ...buttonProps
    } = props

    const btnData = {...buttonProps.data, ...{ 
        textColor: Colors.BLUES_2,
        disabledTextColor: Colors.GRAY_3
    } as InteractiveButtonData}

    return (
        <FlatLayout 
            bgColor={bgColor}
            barStyle={barStyle}
            fail={fail}
            header={
                <BackHeader 
                    title={title}
                    titleColor={titleColor}
                    bgHeaderColor={bgHeaderColor}
                    left={left}
                    borderBottomWidth={borderBottomWidth}
                    borderBottomColor={borderBottomColor}
                    right={onClose && <ButtonHeader color={Colors.BLUES_3} icon={Icons.CLOSE} onPress={onClose}/>}/>
            }>

            
            { children }

            { !fail && <SFlatFooter>
                <Button
                    {...buttonProps}
                    data={btnData}
                    onPress={onProcess}/>
            </SFlatFooter>}

        </FlatLayout>
    )
}

const Button = styled(InteractiveButton)`
    width: 100%;
`