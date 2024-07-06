import React, { ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import StartIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import {useGameContext} from "../contexts/gameContext";
import Typography from "@mui/material/Typography";
import Logo from "./media/logo.png";

type Props = {
    notifyFirstPlayer: () => void;
}

export default function Initialization({notifyFirstPlayer}: Props) {
    const {player1Name, player2Name, setPlayer1Name, setPlayer2Name, launchGame} = useGameContext();

    const playerNamesAreValid = player1Name.trim() !== '' && player2Name.trim() !== '';

    const startGame = () => {
        launchGame();
        notifyFirstPlayer();
    }

    const startGameWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && playerNamesAreValid) {
            startGame();
        }
    }

    return (
        <>
            <Typography variant="h4" textAlign="center" textTransform="uppercase" m={1}>
                Crokinolesque
            </Typography>

            <Box width={100} height={100} margin="20px auto 50px auto">
                <img src={Logo} alt='Logo' width="100%"/>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
                <TextField
                    label="Joueur 1"
                    variant="outlined"
                    InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>)}}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer1Name(event.target.value)}
                    onKeyUp={startGameWithEnterKey}
                    tabIndex={1}
                />

                <TextField
                    label="Joueur 2"
                    variant="outlined"
                    InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>)}}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer2Name(event.target.value)}
                    onKeyUp={startGameWithEnterKey}
                    tabIndex={2}
                />

                <Button
                    disabled={!playerNamesAreValid}
                    variant='contained'
                    size='large'
                    onClick={startGame}
                    endIcon={<StartIcon />}
                >
                    Commencer
                </Button>
            </Box>
        </>
    );
}
