import React, {ChangeEvent} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import {useGameContext} from "../contexts/gameContext";
import Typography from "@mui/material/Typography";

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
            <Typography variant="h5" align="center">Nouvelle partie</Typography>

            <Box display="flex" flexDirection="column" ml={3} mt={2} mr={3} gap={3}>
                <div>
                    <Typography fontWeight="bold">Joueur 1</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>)}}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer1Name(event.target.value)}
                        onKeyUp={startGameWithEnterKey}
                        tabIndex={1}
                        placeholder="Nom du joueur 1"
                        fullWidth
                    />
                </div>

                <div>
                    <Typography fontWeight="bold">Joueur 2</Typography>
                    <TextField
                        variant="outlined"
                        InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>)}}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer2Name(event.target.value)}
                        onKeyUp={startGameWithEnterKey}
                        tabIndex={2}
                        placeholder="Nom du joueur 2"
                        fullWidth
                    />
                </div>

                <Button
                    disabled={!playerNamesAreValid}
                    variant='contained'
                    size='large'
                    onClick={startGame}
                >
                    Commencer
                </Button>
            </Box>
        </>
    );
}
