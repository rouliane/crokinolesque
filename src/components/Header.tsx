import React from 'react';
import Box from "@mui/material/Box";
import Logo from "./media/logo.png";
import Typography from "@mui/material/Typography";

export default function Header() {
    return (
        <Box display="flex" justifyContent="center" mt={1} mb={1}>
            <Box display="flex" alignContent="center" alignItems="center">
                <img src={Logo} alt='Logo' width={30} height={30}/>
                <Typography variant="h5" component="span" textAlign="center" textTransform="uppercase" m={1}>
                    Crokinolesque
                </Typography>
            </Box>
        </Box>
    )
}
