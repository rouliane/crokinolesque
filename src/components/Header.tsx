import React from 'react';
import Typography from "@mui/material/Typography";
import HeaderImage from "./media/header-2.jpeg";

export default function Header() {
    return (
        <>
            <Typography fontSize="x-large" mt={1} ml={6}>
                Crokinole
            </Typography>
            <img
                src={HeaderImage}
                width="100%"
                height="160px"
                style={{margin: "10px auto 16px auto", objectFit: "cover"}}
                alt='Header'
            />
        </>
    )
}
