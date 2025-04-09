import { useMemo } from "react";
import { useColorScheme, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen'); 
interface DefaultConfigProps {
  typography: {
    fontFamily: {
      light: Font.PlusJakartaSansLight,
      medium: Font.PlusJakartaSansMedium,
      regular: Font.PlusJakartaSansRegular,
      semiBold: Font.PlusJakartaSansSemiBold,
      bold: Font.PlusJakartaSansBold,
      extraBold: Font.PlusJakartaSansExtraBold,
    },
    fontSize: {
      xxxLarge: {
        size: 26,
        lineHeight: 24 | 28
      },
      xxLarge: {
        size: 22,
        lineHeight: 24 | 28
      },
      xLarge: {
        size: 18,
        lineHeight: 26
      },
      large: {
        size: 20 | 16,
        lineHeight: 22 | 18
      },
      regular: {
        size: 18 | 14,
        lineHeight: 26 | 16
      },
      small: {
        size: 16 | 12,
        lineHeight: 18 | 16
      },
      xSmall: {
        size: 14 | 10,
        lineHeight: 16 | 12
      },
      xxSmall: {
        size: 12 | 8,
        lineHeight: 12 | 10
      },
    },
  }
}

export interface ThemeProps extends DefaultConfigProps {
  dark: boolean,
  colors: {
    primary: '#2d2656' | '#FFFFFF',
    secondary: '#808080' | '#B3B3B3',
    text: '#2d2656' | '#FFFFFF',
    secondaryText: '#808080' | '#B3B3B3',
    background: '#FFFFFF' | '#000000',
    overlay: '#212528' | '#F2F2F3',
    secondaryBackground: '#FFFFFF' | '#212528',
    lightPalette: string,
    darkPalette: string,
    messageBackground: {
      text: '#5D9DF414',
      whatsapp: '#48D36621',
      template: '#6FCA7129',
      note: '#FFC43B33',
      rcs: '#F1F6F633',
      facebook: '#5D9DF433'
    },
    border: '#B3B3B3',
    shadow: '#4D4D4D',
    /**
     * Only to be used for elements which have fixed colours across themes
     * 
     * @returns Fixed Colors across themes.
     */
    solids: {                 // Only to be used for elements which have fixed colours across themes
      white: '#FFFFFF',
      black: '#000000',
      red: {
        dark: '#FF0000',
        medium: '#FF000080'
        light: '#FF000020'
      },
      cyan: '#307368',
      green: {
        light: '#C0EDD2',
        medium: '#E8F7E8',
        dark: '#25D366'
        darkest: '#008000'
      },
      blue: {
        light: '#C6DBF7',
        fbLight: '#B7CCF7',
        dark: '#5D9DF4',
        fbDark: '#4267B2',
        darkest: '#0000FF'
      },
      yellow: {
        light: '#F7E4C1',
        dark: '#E49D19'
      },
      grey: {
        lightest: '#F9F9F9',
        light: '#EDEDED',
        medium: '#CCCCCC33',
        dark: '#999999',
        darkest: '#666666',
      }
    }
  },

}

const lightPalette : ThemeProps['colors']['lightPalette'] = '#F2CA5533';

const darkPalette : ThemeProps['colors']['darkPalette'] = '#F2CA55';

const messageBackground : ThemeProps['colors']['messageBackground'] = {
  text: '#5D9DF414',
  whatsapp: '#48D36621',
  template: '#6FCA7129',
  note: '#FFC43B33',
  rcs: '#F1F6F633',
  facebook: '#5D9DF433'
}

const solids : ThemeProps['colors']['solids'] = {
  white: '#FFFFFF',
  black: '#000000',
  red: {
    dark: '#FF0000',
    medium: '#FF000080',
    light: '#FF000020'
  },
  cyan: '#307368',
  green: {
    light: '#C0EDD2',
    medium: '#E8F7E8',
    dark: '#25D366',
    darkest: '#008000'
  },
  blue: {
    light: '#C6DBF7',
    fbLight: '#B7CCF7',
    dark: '#5D9DF4',
    fbDark: '#4267B2',
    darkest: '#0000FF'
  },
  yellow: {
    light: '#F7E4C1',
    dark: '#E49D19'
  },
  grey: {
    lightest: '#F9F9F9',
    light: '#EDEDED',
    medium: '#CCCCCC33',
    dark: '#999999',
    darkest: '#666666',
  }
}

export enum Font {
  PlusJakartaSansLight = "PlusJakartaSans-Light",
  PlusJakartaSansMedium = "PlusJakartaSans-Medium",
  PlusJakartaSansBold = "PlusJakartaSans-Bold",
  PlusJakartaSansSemiBold = "PlusJakartaSans-SemiBold",
  PlusJakartaSansExtraBold = "PlusJakartaSans-ExtraBold",
  PlusJakartaSansRegular = "PlusJakartaSans-Regular",
}

export const DefaultConfigs: DefaultConfigProps = {
  typography: {
    fontFamily: {
      light: Font.PlusJakartaSansLight,
      medium: Font.PlusJakartaSansMedium,
      regular: Font.PlusJakartaSansRegular,
      semiBold: Font.PlusJakartaSansSemiBold,
      bold: Font.PlusJakartaSansBold,
      extraBold: Font.PlusJakartaSansExtraBold,
    },
    fontSize: {
      xxxLarge: {
        size: 26,
        lineHeight: 28
      },
      xxLarge: {
        size: 22,
        lineHeight: 24
      },
      xLarge: {
        size: 18,
        lineHeight: 26
      },
      large: {
        size: height > 1024 ? 20 : 16,
        lineHeight: height > 1024 ? 22 : 18
      },
      regular: {
        size: height > 1024 ? 18 : 14,
        lineHeight: height > 1024 ? 26 : 16
      },
      small: {
        size: height > 1024 ? 16 : 12,
        lineHeight: height > 1024 ? 18 : 16
      },
      xSmall: {
        size: height > 1024 ? 14 : 10,
        lineHeight: height > 1024 ? 16 : 12
      },
      xxSmall: {
        size: height > 1024 ? 12 : 8,
        lineHeight: height > 1024 ? 12 : 10
      },
      // xxxLarge: 26,        |
      // xxLarge: 22,         |
      // xLarge: 18,          |
      // large: 16,           |----> Mobile Font Sizes        
      // regular: 14,         |
      // small: 12,           |
      // xSmall: 10,          |
      // xxSmall: 8           |
    },
  },
};

const DarkTheme: ThemeProps = {
  ...DefaultConfigs,
  dark: true,
  colors: {
    primary: '#FFFFFF',
    secondary: '#B3B3B3',
    text: '#FFFFFF',
    secondaryText: '#B3B3B3',
    background: '#000000',
    secondaryBackground: '#212528',
    overlay: '#212528',
    border: '#B3B3B3',
    shadow: '#4D4D4D',
    lightPalette: lightPalette,
    darkPalette: darkPalette,
    messageBackground: messageBackground,
    solids: solids                            // Only to be used for elements which have fixed colours across themes
     
  },
};

const LightTheme: ThemeProps = {
  ...DefaultConfigs,
  dark: false,
  colors: {
    primary: '#2d2656',
    secondary: '#808080',
    text: '#2d2656',
    secondaryText: '#808080',
    background: '#FFFFFF',
    secondaryBackground: '#FFFFFF',
    overlay: '#F2F2F3',
    border: '#B3B3B3',
    shadow: '#4D4D4D',
    lightPalette: lightPalette,
    darkPalette: darkPalette,
    messageBackground: messageBackground,
    solids: solids                            // Only to be used for elements which have fixed colours across themes
  },
};

export const DefaultTheme = LightTheme;

/**
 * Hook to access theme object and styles prop according to device theme.
 *
 * @returns theme object and styles object (if a function with return type Stylesheet is passed).
 */
const useCustomTheme = <T extends {}>(
  getStyles?: (theme: ThemeProps) => T
)  => {
  const colorScheme = useColorScheme();

  const theme = useMemo(() => {
    if (!colorScheme) return DefaultTheme;
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);

  // return theme;
  let styles;
  if (typeof getStyles === "function") {
    styles = useMemo(() => getStyles(theme), [colorScheme]);
    return { theme, styles } as { theme: ThemeProps; styles: T };
  }
  return { theme, styles } as { theme: ThemeProps; styles: T };
}

export default useCustomTheme;





















// const useCustomTheme = () => {
//   const colorScheme = useColorScheme();

//   const theme = useMemo(() => {
//     if (!colorScheme) return DefaultTheme;
//     return colorScheme === "dark" ? DarkTheme : LightTheme;
//   }, [colorScheme]);

//   return theme;
// }


// const useCustomTheme = (getStyles) => {
//   const colorScheme = useColorScheme();

//   const theme = useMemo(() => {
//     if (!colorScheme) return DefaultTheme;
//     return colorScheme === "dark" ? DarkTheme : LightTheme;
//   }, [colorScheme]);

//   // return theme;
//   if (typeof getStyles === "function") {
//   const styles = useMemo(() => getStyles(theme), [colorScheme]);
//   return { theme, styles };
//   }
//   return { theme };
// }
