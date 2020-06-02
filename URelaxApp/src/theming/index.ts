import styled from 'styled-components/native'

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

export const defaultTheme = {
    color: Colors.BLACK_1,
    fontFamily: Fontsa.FONT_REGULAR,
    fontSize: "14px"
}

type ThemeType = typeof defaultTheme

export const Typography = styled.Text`
    color: ${({ theme }) => (<ThemeType>theme).color};
    font-family: ${({ theme }) => (<ThemeType>theme).fontFamily};
    color: ${({ theme }) => (<ThemeType>theme).color};
`

Typography.defaultProps = {
    theme: {
        ...defaultTheme
    }
}

export const TypographyMedium = styled(Typography)``

TypographyMedium.defaultProps = {
    theme: {
        ...defaultTheme,
        fontFamily: Fontsa.FONT_MEDIUM   
    }
}

export const TypographySemibold = styled(Typography)``

TypographySemibold.defaultProps = {
    theme: {
        ...defaultTheme,
        fontFamily: Fontsa.FONT_SEMIBOLD
    }
}