import { TextStyle } from "react-native";

type ColorKey =
  | "shade01"
  | "shade02"
  | "shade02_5percent"
  | "shade02_30percent"
  | "neutral01"
  | "neutral02"
  | "neutral03"
  | "neutral04"
  | "neutral05"
  | "neutral06"
  | "neutral07"
  | "neutral08"
  | "primary01"
  | "primary02"
  | "error01"
  | "error02"
  | "accent01"
  | "accent02"
  | "success"
  | "secondary"
  | "warning";

type ColorValue = string;

type Colors = Record<ColorKey, ColorValue>;

const newColors: Colors = {
  shade01: "#ffffff",
  shade02: "#222222",
  shade02_5percent: "#2222220d",
  shade02_30percent: "#2222224d",
  neutral01: "#f7f7f7",
  neutral02: "#ebebeb",
  neutral03: "#dddddd",
  neutral04: "#d3d3d3",
  neutral05: "#c2c2c2",
  neutral06: "#b0b0b0",
  neutral07: "#717171",
  neutral08: "#5e5e5e",
  primary01: "#f6475f",
  primary02: "#ff385c",
  error01: "#fef8f6",
  error02: "#c13515",
  accent01: "#f6d7df",
  accent02: "#d03660",
  success: "#008a05",
  secondary: "#004cc4",
  warning: "#ffd700",
};

type FontWeight = "400" | "500" | "600";

interface FontStyle {
  fontSize: number;
  fontFamily: string;
  fontWeight: FontWeight;
  fontStyle: "normal";
  letterSpacing: number;
  lineHeight: number;
}

type FontCategory = "body" | "header" | "mirco text";

type FontKey =
  | "18pt_semibold"
  | "18pt_medium"
  | "18pt_regular"
  | "16pt_regular_underlined"
  | "16pt_semibold"
  | "16pt_regular"
  | "14pt_semibold"
  | "14pt_regular"
  | "13pt_semibold"
  | "13pt_regular"
  | "12pt_semibold"
  | "12pt_semibold_underlined"
  | "12pt_regular"
  | "10pt_semibold";

type HeaderFontKey = "22pt_semibold" | "22pt_regular";
interface Fonts {
  body: Record<FontKey, FontStyle>;
  header: Record<HeaderFontKey, FontStyle>;
}

const fonts: Fonts = {
  body: {
    "18pt_semibold": {
      fontSize: 18,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 21.6,
    },
    "18pt_medium": {
      fontSize: 18,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "500",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 24,
    },
    "18pt_regular": {
      fontSize: 18,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 24,
    },
    "16pt_regular_underlined": {
      fontSize: 16,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
    },
    "16pt_semibold": {
      fontSize: 16,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
    },
    "16pt_regular": {
      fontSize: 16,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
    },
    "14pt_semibold": {
      fontSize: 14,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 16.8,
    },
    "14pt_regular": {
      fontSize: 14,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 16.8,
    },
    "13pt_semibold": {
      fontSize: 13,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 15.6,
    },
    "13pt_regular": {
      fontSize: 13,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 15.6,
    },
    "12pt_semibold": {
      fontSize: 12,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
    },
    "12pt_semibold_underlined": {
      fontSize: 12,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
    },
    "12pt_regular": {
      fontSize: 12,
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
    },
    "10pt_semibold": {
      fontSize: 10,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
    },
  },
  header: {
    "22pt_semibold": {
      fontSize: 22,
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 26.4,
    },
    "22pt_regular": {
      fontSize: 22,
      fontFamily: "SF Pro Display Regular Regular",
      fontWeight: "400",
      fontStyle: "normal",
      letterSpacing: 0,
      lineHeight: 26.4,
    },
  },
};

export type Theme = {
  colors: Colors;
  spacing: {
    "2xs": number;
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  fonts: typeof fonts;
};

// type TextStyle = {
//   fontSize: number;
//   fontFamily: string;
//   fontWeight: string;
//   fontStyle: string;
//   letterSpacing: number;
//   lineHeight: number;
// };

type TextStyles = {
  large: TextStyle;
  medium: TextStyle;
  small: TextStyle;
};

type Typography = {
  display: TextStyles;
  headline: TextStyles;
  title: TextStyles;
  body: TextStyles;
  label: TextStyles;
};

export const DefaultTheme: Theme = {
  colors: newColors,
  spacing: {
    "2xs": 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 48,
    "4xl": 62,
  },
  borderRadius: {
    sm: 12,
    md: 24,
    lg: 50,
  },
  fonts,
};
