import React from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Game from './Game';
import {GameProvider} from "../contexts/gameContext";

type PaletteMode = 'light' | 'dark';

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [colorMode, setColorMode] = React.useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');

    const theme = React.useMemo(
        () => createTheme({palette: {mode: colorMode}}),
        [colorMode],
    );

    const toggleColorMode = () => {
        setColorMode((previousMode) => (previousMode === 'light' ? 'dark' : 'light'));
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <IconButton sx={{position: "fixed", bottom: "0px", left: "0px"}} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
            </IconButton>
            <GameProvider>
                <Game/>
            </GameProvider>
        </ThemeProvider>
    );
}
