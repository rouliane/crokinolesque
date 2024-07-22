import React, {createContext, useContext, useMemo, useState} from 'react';
import {PaletteMode} from "../Palette";
import useMediaQuery from "@mui/material/useMediaQuery";
import {createTheme, Theme} from "@mui/material/styles";

interface AppThemeContextType {
    toggleColorMode: () => void;
    theme: Theme;
}

const GameContext = createContext<AppThemeContextType>({
    toggleColorMode: () => {},
    theme: {} as Theme,
});

const AppThemeProvider = ({ children }: {children: any}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const colorModeChoice: string | null = localStorage.getItem('colorMode');
    const [colorMode, setColorMode] = useState<PaletteMode>(
        colorModeChoice !== null && Object.values(PaletteMode).includes(colorModeChoice as PaletteMode)
            ? colorModeChoice as PaletteMode
            : prefersDarkMode ? PaletteMode.dark : PaletteMode.light
    );

    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: colorMode,
                background: {
                    default: colorMode === PaletteMode.light ? '#F8FAFC' : '#111A22',
                    paper: colorMode === PaletteMode.light ? '#F8FAFC' : '#1A2632',
                },
            },
            typography: {
                fontFamily: '"Manrope", sans-serif',
                fontWeightLight: 300,
                fontWeightRegular: 400,
                fontWeightMedium: 500,
                fontWeightBold: 700,
            },
            shape: {
                borderRadius: 6,
            },
        }),
        [colorMode],
    );

    const toggleColorMode = () => {
        const newMode = colorMode === PaletteMode.light ? PaletteMode.dark : PaletteMode.light;
        setColorMode(newMode);
        localStorage.setItem('colorMode', newMode);
    }

    return <GameContext.Provider value={{toggleColorMode, theme}}>{children}</GameContext.Provider>;
};

const useAppThemeContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useAppThemeContext must be used within a GameProvider');
    }
    return context;
};

export {AppThemeProvider, useAppThemeContext};
