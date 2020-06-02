import { Form, Text, View } from "native-base"
import styled from "styled-components"
import { Colors, Theme } from "../../../core/Theme"
import { TextIconDisplay } from "../TextIconDisplay"

export const CORNER_RADIUS = "10px"
export const FORM_PADDING = "20px"
export const SHIMMER_COLORS = ["#D1D6DA", "#919394", "#D1D6DA"]

export const SRoundedBox: any = styled(View)`
    background-color: ${(props: any) => props.bgColor ? props.bgColor : Colors.WHITE};
    border-top-left-radius: ${CORNER_RADIUS};
    border-top-right-radius: ${CORNER_RADIUS};
    margin-left: 0;
    margin-right: 0;
    padding-top: 12px;
    width: 100%;
`

export const SFlatFooter = styled(View)`
    align-items: center;
    border-top-color: ${Colors.BG_3};
    border-top-width: 1px;
    margin-left: 0;
    margin-right: 0;
`

export const SForm: any = styled(Form)`
    padding-bottom: ${(props: any) => props.verticalPadding ? props.verticalPadding : FORM_PADDING };
    padding-top: ${(props: any) => props.verticalPadding ? props.verticalPadding : FORM_PADDING };
    padding-left: ${(props: any) => props.horizontalPadding ? props.horizontalPadding : FORM_PADDING };
    padding-right: ${(props: any) => props.horizontalPadding ? props.horizontalPadding : FORM_PADDING };
    justify-content: space-between;
`

export const SFormTitle = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.BLACK_2};
    font-size: 18px;
    margin-bottom: 20px;
`

export const SFormDescription = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    color: ${Colors.GRAY_1};
    font-size: 15px;
    margin-bottom: 25px;
`

export const SHeaderDivider = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${Colors.BLUES_4};
    font-size: 14px;
    margin-top: 30px;
`

export const GenericTextIcon = styled(TextIconDisplay)`
    margin: 0 25px;
    justify-content: center;
    flex: 1;
`

export const FormView = styled(View)`
    margin-top: ${FORM_PADDING};
    margin-left: ${FORM_PADDING};
    margin-right: ${FORM_PADDING};
`