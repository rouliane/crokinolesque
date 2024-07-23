import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import HeaderImage from "./media/header-2.jpeg";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ReplayIcon from "@mui/icons-material/Replay";
import {useAppThemeContext} from "../contexts/AppThemeContext";
import Box from "@mui/material/Box";

export default function Header() {
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
        <>
            <Box display="flex" alignItems="center" gap="5px">
                <IconButton sx={{marginTop: "2px"}} onClick={handleClick} size="small">
                    <MenuIcon fontSize="large"/>
                </IconButton>
                <Typography fontSize="x-large">
                    Crokinole
                </Typography>
            </Box>
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
            <img
                src={HeaderImage}
                width="100%"
                height="170px"
                style={{margin: "2px auto 16px auto", objectFit: "cover"}}
                alt='Header'
            />
        </>
    )
}
