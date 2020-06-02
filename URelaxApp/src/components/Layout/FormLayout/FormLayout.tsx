import React, { FC } from 'react'
import { Colors, Icons } from '../../../../core/Theme'
import { BackHeader, BackHeaderProps } from '../../Header/BackHeader'
import { ButtonHeader } from '../../Header/ButtonHeader'
import { InteractiveButton, InteractiveButtonProps, InteractiveButtonStates } from '../../InteractiveButton'
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

    return (
        <FlatLayout 
            bgColor={bgColor}
            barStyle={barStyle}
            fail={fail}>

            <BackHeader 
                title={title}
                titleColor={titleColor}
                bgHeaderColor={bgHeaderColor}
                left={left}
                borderBottomWidth={borderBottomWidth}
                borderBottomColor={borderBottomColor}
                right={onClose && <ButtonHeader color={Colors.BLUES_1} icon={Icons.CLOSE} onPress={onClose}/>}/>
            
            { children }

            { !fail && <SFlatFooter>
                <InteractiveButton
                    {...buttonProps}
                    block
                    textColor={Colors.BLUES_1}
                    indicatorColor={Colors.BLUES_1}
                    successStatus={InteractiveButtonStates.NORMAL}
                    disabledBgColor={Colors.WHITE}
                    disabledTextColor={Colors.BG_2}
                    height={55}
                    onPress={onProcess}/>
            </SFlatFooter>}

        </FlatLayout>
    )
}