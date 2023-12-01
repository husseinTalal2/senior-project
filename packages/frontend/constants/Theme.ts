import { TextStyle } from "react-native";

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    text: string;
    textOnColor: string;
    error: string;
    success: string;
    warning: string;
    disabled: string;
  };
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
  fonts: Typography;
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
  colors: {
    primary: "#001f3f",
    secondary: "#A2D039",
    tertiary: "#A863EB",
    text: "#020202",
    textOnColor: "#EEEEEE",
    error: "#FF3B30",
    success: "#28A745",
    warning: "#FFC107",
    disabled: "#909090",
  },
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
  fonts: {
    display: {
      large: {
        fontSize: 57,
        textDecorationLine: "none",
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 64,
      },
      medium: {
        fontSize: 45,
        textDecorationLine: "none",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 52,
      },
      small: {
        fontSize: 36,
        textDecorationLine: "none",
        fontWeight: "400",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 44,
      },
    },
    headline: {
      large: {
        fontSize: 32,
        textDecorationLine: "none",
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 40,
      },
      medium: {
        fontSize: 28,
        textDecorationLine: "none",
        fontWeight: "800",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 36,
      },
      small: {
        fontSize: 24,
        textDecorationLine: "none",
        fontWeight: "700",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 32,
      },
    },
    title: {
      large: {
        fontSize: 22,
        textDecorationLine: "none",
        fontWeight: "700",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 28,
      },
      medium: {
        fontSize: 16,
        textDecorationLine: "none",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 24,
      },
      small: {
        fontSize: 14,
        textDecorationLine: "none",
        fontWeight: "400",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 20,
      },
    },
    body: {
      large: {
        fontSize: 16,
        textDecorationLine: "none",
        fontWeight: "400",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 24,
      },
      medium: {
        fontSize: 14,
        textDecorationLine: "none",
        fontWeight: "400",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 20,
      },
      small: {
        fontSize: 12,
        textDecorationLine: "none",
        fontWeight: "400",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 16,
      },
    },
    label: {
      large: {
        fontSize: 14,
        textDecorationLine: "none",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 20,
      },
      medium: {
        fontSize: 12,
        textDecorationLine: "none",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 16,
      },
      small: {
        fontSize: 11,
        textDecorationLine: "none",
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0,
        lineHeight: 16,
      },
    },
  },
};
