import TextInputMask from 'react-native-text-input-mask'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { BaseTypography } from '../components/BaseTypography'

export const SHIMMER_COLORS = ["#D1D6DA", "#919394", "#D1D6DA"]
export const DEFAULT_FONTSIZE = 13
export const DEFAULT_INPUT_FONTSIZE = 15
export const DEFAULT_ICON_SIZE = 23
export const DEFAULT_VERTICAL_SPACING = 20
export const DEFAULT_HORIZONTAL_SPACING = 20

export const Images = {
    LOGO: require("../assets/imgs/logo.png"),
    PROFILE: require("../assets/imgs/profile.jpg"),
    CLEAR: require("../assets/imgs/CLEAR.png")
}

export const SymbolsImg = {
    AZUL4 : require("../assets/imgs/AZUL4.png"),
    MGLU3 : require("../assets/imgs/MGLU3.png"),
    PETR4 : require("../assets/imgs/PETR4.png"),
    VALE3 : require("../assets/imgs/VALE3.png"),
    ITUB4 : require("../assets/imgs/ITUB4.png"),
    BBDC4 : require("../assets/imgs/BBDC4.png"),
    BBAS3 : require("../assets/imgs/BBAS3.png"),
    VVAR3 : require("../assets/imgs/VVAR3.png"),
    ABEV3 : require("../assets/imgs/ABEV3.png"),
    LREN3 : require("../assets/imgs/LREN3.png"),
    WEGE3 : require("../assets/imgs/WEGE3.png")
}

export enum Fonts {
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
    BG_4 = "#d3dfec",
    BG_5 = "#f2f5f5",
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
    BACK = "chevron-left",
    MENU = "menu",
    SETTINGS = "settings-outline",
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
    CLOCK = "clock-outline",
    HOME_VARIANT = "home-outline",
    ACCOUNT_CIRCLE = "account-circle-outline",
    WALLET = "wallet",
    CHART_LINE = "chart-line",
    CIRCLE_MEDIUM = "circle-medium",
    CASH = "cash",
    BROKER = "cash-refund",
    ACTIVITY = "timeline-outline",
    STATEMENTS = "timeline-text-outline",
    LOGOUT = "logout"
}

export const Typography = styled(BaseTypography)<{ color?: string, fontSize?: number }>`
    font-size: ${({ fontSize }) => fontSize}px;
    font-family: ${Fonts.FONT_REGULAR};
    color: ${({ color }) => color};
`

Typography.defaultProps = {
    color: Colors.BLACK_1,
    fontSize: DEFAULT_FONTSIZE,
    shimmerColor: SHIMMER_COLORS
}

export const TypographyMedium = styled(Typography)`
    font-family: ${Fonts.FONT_MEDIUM};
`

export const TypographySemibold = styled(Typography)`
    font-family: ${Fonts.FONT_SEMIBOLD};
`

export const InputTextBase = styled.TextInput`
    font-size: ${DEFAULT_INPUT_FONTSIZE}px;
    font-family: ${Fonts.FONT_REGULAR};
    color: ${Colors.BLACK_1};
    flex: 1;
`

export const InputMaskBase = styled(TextInputMask)`
    font-size: ${DEFAULT_INPUT_FONTSIZE}px;
    font-family: ${Fonts.FONT_REGULAR};
    color: ${Colors.BLACK_1};
    flex: 1;
`

export const BaseIcon = styled(Icon)<{ color?: string }>`
    color: ${({ color }) => color};
`

BaseIcon.defaultProps = {
    color: Colors.GRAY_1
}