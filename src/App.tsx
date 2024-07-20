import React, {useState} from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Game from './components/Game';
import {GameProvider} from "./contexts/gameContext";
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ReplayIcon from '@mui/icons-material/Replay';

enum PaletteMode {
    light = 'light',
    dark = 'dark'
}

export default function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const colorModeChoice: string | null = localStorage.getItem('colorMode');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [colorMode, setColorMode] = useState<PaletteMode>(
        colorModeChoice !== null && Object.values(PaletteMode).includes(colorModeChoice as PaletteMode)
        ? colorModeChoice as PaletteMode
        : prefersDarkMode ? PaletteMode.dark : PaletteMode.light
    );
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = React.useMemo(
        () => createTheme({
            palette: {
                mode: colorMode,
                background: {
                    default: colorMode === PaletteMode.light ? '#F8FAFC' : '#111A22',
                    paper: colorMode === PaletteMode.light ? '#F8FAFC' : '#111A22',
                },
                // primary: {
                //     main: '#1980E6',
                // },
            },
            typography: {
                fontFamily: '"Manrope", sans-serif',
                fontWeightLight: 300,
                fontWeightRegular: 500,
                fontWeightMedium: 600,
                fontWeightBold: 700,
            }
        }),
        [colorMode],
    );

    const toggleColorMode = () => {
        const newMode = colorMode === PaletteMode.light ? PaletteMode.dark : PaletteMode.light;
        setColorMode(newMode);
        localStorage.setItem('colorMode', newMode);
    }

    const restartGame = () => {
        localStorage.removeItem('gameState');
        window.location.reload();
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <IconButton sx={{position: "fixed", top: "3px", left: "0px"}} onClick={handleClick} size="small">
                <MenuIcon fontSize="large"/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {handleClose(); toggleColorMode()}}>
                    <ListItemIcon>
                        {theme.palette.mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                    </ListItemIcon>
                    Thème {theme.palette.mode === 'dark' ? "clair" : "sombre"}
                </MenuItem>
                <MenuItem onClick={() => {handleClose(); restartGame()}}>
                    <ListItemIcon>
                        <ReplayIcon/>
                    </ListItemIcon>
                    Recommencer
                </MenuItem>
            </Menu>
            <GameProvider>
                <Game/>
            </GameProvider>
        </ThemeProvider>
    );
}
