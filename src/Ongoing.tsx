import React, { ChangeEvent, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PinIcon from '@mui/icons-material/Pin';
import InputAdornment from '@mui/material/InputAdornment';

type Props = {
    player1Name: string;
    player2Name: string;
    firstPlayer: string;
    player1Score: number;
    player2Score: number;
    setPlayer1Score: (score: number) => void;
    setPlayer2Score: (score: number) => void;
    moveToNextPhase: (winnerName: string) => void;
}

export default function Ongoing({ player1Name, player2Name, firstPlayer, player1Score, player2Score, setPlayer1Score, setPlayer2Score, moveToNextPhase}: Props) {
    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
    const [roundPoints, setRoundPoints] = useState<null | number>(null);
    const [roundWinner, setRoundWinner] = useState<null|string>(null);

    const isCurrentPlayer = (player: string) => player === currentPlayer;

    const validateRound = () => {
        const player1NewScore = player1Score + Number(roundPoints);
        const player2NewScore = player2Score + Number(roundPoints);

        if (roundWinner === player1Name) {
            setPlayer1Score(player1NewScore);
        } else {
            setPlayer2Score(player2NewScore);
        }

        if (roundWinner !== null && (player1NewScore >= 100 || player2NewScore >= 100)) {
            moveToNextPhase(roundWinner);
            return;
        }
        

        setRoundWinner(null);
        setCurrentPlayer(currentPlayer === player1Name ? player2Name : player1Name);
        setRoundPoints(null);
    }

    return (
        <Container>
            <List>
                <ListItem disablePadding disableGutters>
                    <ListItemButton disableGutters>
                        <ListItemIcon>
                            {isCurrentPlayer(player1Name) && <ArrowForwardIcon />}
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h5">{player1Name} : {player1Score}</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding disableGutters>
                    <ListItemButton disableGutters>
                        <ListItemIcon>
                            {isCurrentPlayer(player2Name) && <ArrowForwardIcon />}
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="h5">{player2Name} : {player2Score}</Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

            <Box mt={3}>
                <Typography variant="h5" textAlign="center">Qui a gagné cette manche ?</Typography>
                
                <Box display="flex" justifyContent="space-around" mt={2}>
                    <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player1Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player1Name)}>{player1Name}</Button>
                    <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player2Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player2Name)}>{player2Name}</Button>
                </Box>
                
                {roundWinner !== null && 
                    <Box display="flex" flexDirection="column" alignItems="center" gap={5} mt={5}>
                        <TextField
                            type="number"
                            label="Points" 
                            variant="outlined" 
                            InputProps={{startAdornment: (<InputAdornment position="start"><PinIcon /></InputAdornment>)}} 
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setRoundPoints(Number(event.target.value))}
                            inputRef={input => input && input.focus()}
                        />
                        <Button variant="contained" size="large" onClick={validateRound}>Valider</Button>
                    </Box>
                }
            </Box>
        </Container>
    );
}