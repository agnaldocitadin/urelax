import styled from "styled-components/native"
import { Colors, Typography, TypographyMedium } from "../../theming"
import { TextIconDisplay } from "../TextIconDisplay"

export const CORNER_RADIUS = "10px"
export const FORM_PADDING = "20px"

export const SRoundedBox: any = styled.View`
    background-color: ${(props: any) => props.bgColor ? props.bgColor : Colors.WHITE};
    border-top-left-radius: ${CORNER_RADIUS};
    border-top-right-radius: ${CORNER_RADIUS};
    margin-left: 0;
    margin-right: 0;
    padding-top: 12px;
    width: 100%;
`

export const SFlatFooter = styled.View`
    align-items: center;
    border-top-color: ${Colors.BG_3};
    border-top-width: 1px;
    margin-left: 0;
    margin-right: 0;
`

export const SForm: any = styled.View`
    padding-bottom: ${(props: any) => props.verticalPadding ? props.verticalPadding : FORM_PADDING };
    padding-top: ${(props: any) => props.verticalPadding ? props.verticalPadding : FORM_PADDING };
    padding-left: ${(props: any) => props.horizontalPadding ? props.horizontalPadding : FORM_PADDING };
    padding-right: ${(props: any) => props.horizontalPadding ? props.horizontalPadding : FORM_PADDING };
    justify-content: space-between;
`

export const SFormTitle = styled(TypographyMedium)`
    color: ${Colors.BLACK_2};
    font-size: 18px;
    margin-bottom: 20px;
`

export const SFormDescription = styled(Typography)`
    color: ${Colors.GRAY_1};
    margin-bottom: 25px;
    font-size: 15px;
`

export const SHeaderDivider = styled(TypographyMedium)`
    color: ${Colors.BLUES_4};
    font-size: 14px;
    margin-top: 30px;
`

export const GenericTextIcon = styled(TextIconDisplay)`
    margin: 0 25px;
    justify-content: center;
    flex: 1;
`

export const FormView = styled.View`
    margin-top: ${FORM_PADDING};
    margin-left: ${FORM_PADDING};
    margin-right: ${FORM_PADDING};
`