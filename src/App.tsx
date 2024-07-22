import React, {useState} from "react";
import {ThemeProvider} from '@mui/material/styles';
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
import {useAppThemeContext} from "./contexts/AppThemeContext";

export default function App() {
    const {theme, toggleColorMode} = useAppThemeContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={() => {handleClose(); toggleColorMode()}}>
                    <ListItemIcon>
                        {theme.palette.mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                    </ListItemIcon>
                    Thème {theme.palette.mode === 'dark' ? "clair" : "sombre"}
                </MenuItem>
                <MenuItem onClick={() => {restartGame(); handleClose()}}>
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
