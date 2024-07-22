import React from "react";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Game from './components/Game';
import {GameProvider} from "./contexts/gameContext";
import {useAppThemeContext} from "./contexts/AppThemeContext";

export default function App() {
    const {theme} = useAppThemeContext();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <GameProvider>
                <Game/>
            </GameProvider>
        </ThemeProvider>
    );
}
