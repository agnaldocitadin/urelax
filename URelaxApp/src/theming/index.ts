import styled from 'styled-components/native'
import { BaseButton } from '../components/BaseButton'

export const Images = {
    LOGO: require("../assets/imgs/logo.png")
}

export enum Fontsa {
    FONT_REGULAR = "Montserrat-Regular",
    FONT_MEDIUM = "Montserrat-Medium",
    FONT_SEMIBOLD = "Montserrat-SemiBold",
    ICON_PACK = "MaterialCommunityIcons"
}

export enum Colors {
    WHITE = "white",
    RED_ERROR = "#e73232",
    GREEN_SUCCESS = "#11a911",
    YELLOW_WARN = "#D3D322",
    TRANSPARENT = "transparent",
    BG_1 = "#e5ebf0",
    BG_2 = "#afb4b9",
    BG_3 = "#dde7f2",
    BLUES_1 = "#1099f5",
    BLUES_2 = "#0ea2ff",
    BLUES_3 = "#3497d4",
    BLUES_4 = "#7956c9",
    BLACK_1 = "#181818",
    BLACK_2 = "#1a1a1a",
    GRAY_1 = "#5a646c",
    GRAY_2 = "#6d7681",
    GRAY_3 = "#767d84",
    GRAY_4 = "#ededee"
}

export enum Icons {
    BACK = "arrow-left",
    MENU = "menu",
    SETTINGS = "settings",
    CLOSE = "window-close",
    EYE_OFF_OUTLINE = "eye-off-outline",
    EYE_OUTLINE = "eye-outline",
    CALENDAR = "calendar",
    MENU_UP = "menu-up",
    MENU_DOWN = "menu-down",
    EMAIL = "email-outline",
    USER = "account-outline",
    PASSWD = "lock-outline",
    MAGNIFY = "magnify",
    PLUS_CIRCLE = "plus",
    ACCOUNT_EDIT = "account-edit",
    CAMERA = "camera",
    ARROW_UP = "arrow-up",
    ARROW_DOWN = "arrow-down",
    ARROW_RIGHT = "arrow-right",
    CHEVRON_RIGHT = "chevron-right",
    ALERT_CIRCLE = "alert-circle",
    CHECK_CIRCLE = "check-circle",
    COMMENT_QUESTION = "comment-question",
    HEART_BROKEN = "heart-broken",
    PLAY = "play",
    PAUSE = "pause",
    CLOCK = "clock",
    HOME_VARIANT = "home-variant",
    ACCOUNT_CIRCLE = "account-circle",
    WALLET = "wallet",
    CHART_LINE_VARIANT = "chart-line-variant",
}

export const Typography = styled.Text<{ color?: string, fontSize?: number }>`
    color: ${({ color }) => color || Colors.BLACK_1};
    font-family: ${Fontsa.FONT_REGULAR};
    font-size: ${({ fontSize }) => `${fontSize || 13}px`};
`

export const TypographyMedium = styled(Typography)`
    font-family: ${Fontsa.FONT_MEDIUM};
`

export const TypographySemibold = styled(Typography)`
    font-family: ${Fontsa.FONT_SEMIBOLD};
`

export const InputTextBase = styled.TextInput`
    font-family: ${Fontsa.FONT_REGULAR};
    color: ${Colors.BLACK_1};
    font-size: 15px;
    flex: 1;
`

export const Button = styled(BaseButton)`
    border-radius: 5px;
`