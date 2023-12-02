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
  shade01: "#ffffffff",
  shade02: "#222222ff",
  shade02_5percent: "#2222220d",
  shade02_30percent: "#2222224d",
  neutral01: "#f7f7f7ff",
  neutral02: "#ebebebff",
  neutral03: "#ddddddff",
  neutral04: "#d3d3d3ff",
  neutral05: "#c2c2c2ff",
  neutral06: "#b0b0b0ff",
  neutral07: "#717171ff",
  neutral08: "#5e5e5eff",
  primary01: "#f6475fff",
  primary02: "#ff385cff",
  error01: "#fef8f6ff",
  error02: "#c13515ff",
  accent01: "#f6d7dfff",
  accent02: "#d03660ff",
  success: "#008a05ff",
  secondary: "#004cc4ff",
  warning: "#ffd700ff",
};

type FontWeight = "400" | "500" | "600";

interface FontStyle {
  fontSize: number;
  textDecoration: "none" | "underline";
  fontFamily: string;
  fontWeight: FontWeight;
  fontStyle: "normal";
  fontStretch: "normal";
  letterSpacing: number;
  lineHeight: number;
  paragraphIndent: number;
  paragraphSpacing: number;
  textCase: "none";
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
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 21.6,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "18pt_medium": {
      fontSize: 18,
      textDecoration: "underline",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "500",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 24,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "18pt_regular": {
      fontSize: 18,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 24,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "16pt_regular_underlined": {
      fontSize: 16,
      textDecoration: "underline",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "16pt_semibold": {
      fontSize: 16,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "16pt_regular": {
      fontSize: 16,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 19.2,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "14pt_semibold": {
      fontSize: 14,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 16.8,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "14pt_regular": {
      fontSize: 14,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 16.8,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "13pt_semibold": {
      fontSize: 13,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 15.6,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "13pt_regular": {
      fontSize: 13,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 15.6,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "12pt_semibold": {
      fontSize: 12,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "12pt_semibold_underlined": {
      fontSize: 12,
      textDecoration: "underline",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "12pt_regular": {
      fontSize: 12,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "10pt_semibold": {
      fontSize: 10,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 14.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
  },
  header: {
    "22pt_semibold": {
      fontSize: 22,
      textDecoration: "none",
      fontFamily: "SF Pro Display SemiBold",
      fontWeight: "600",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 26.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
    },
    "22pt_regular": {
      fontSize: 22,
      textDecoration: "none",
      fontFamily: "SF Pro Display Regular Regular",
      fontWeight: "400",
      fontStyle: "normal",
      fontStretch: "normal",
      letterSpacing: 0,
      lineHeight: 26.4,
      paragraphIndent: 0,
      paragraphSpacing: 0,
      textCase: "none",
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
//   textDecorationLine: string;
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
