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
import { Round } from "./Game";

type Props = {
    player1Name: string;
    player2Name: string;
    firstPlayer: string;
    player1Score: number;
    player2Score: number;
    setPlayer1Score: (score: number) => void;
    setPlayer2Score: (score: number) => void;
    moveToNextPhase: (winnerName: string) => void;
    saveRound: (round: Round) => void;
}

export default function Ongoing({ player1Name, player2Name, firstPlayer, player1Score, player2Score, setPlayer1Score, setPlayer2Score, moveToNextPhase, saveRound}: Props) {
    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
    const [roundPoints, setRoundPoints] = useState<null | number>(null);
    const [roundWinner, setRoundWinner] = useState<null|string>(null);

    const isCurrentPlayer = (player: string) => player === currentPlayer;

    const togglePlayer = () => setCurrentPlayer(currentPlayer === player1Name ? player2Name : player1Name);

    const addRound = (player1Score: number, player2Score: number) => {
        const newRound: Round = {
            player1: {name: player1Name, score: player1Score},
            player2: {name: player2Name, score: player2Score},
            winner: roundWinner
        };
        saveRound(newRound);
    }

    const validateRound = () => {
        if (roundWinner === player1Name) {
            const player1NewScore = player1Score + Number(roundPoints);
            setPlayer1Score(player1NewScore);
            addRound(player1NewScore, player2Score);
            if (player1NewScore >= 100) {
                moveToNextPhase(player1Name);
                return;
            }
        } else {
            const player2NewScore = player2Score + Number(roundPoints);
            setPlayer2Score(player2NewScore);
            addRound(player1Score, player2NewScore);
            if (player2NewScore >= 100) {
                moveToNextPhase(player2Name);
                return;
            }
        }        

        setRoundWinner(null);
        togglePlayer();
        setRoundPoints(null);
    }

    const setRoundAsDraw = () => {
        setRoundWinner(null);
        togglePlayer();
        setRoundPoints(null);
        addRound(player1Score, player2Score);
    }

    const isRoundScoreValid = roundPoints !== null && roundPoints > 0 && roundPoints <= 240 && roundPoints % 5 === 0;

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

            <Box mt={2}>
                <Typography variant="h6" textAlign="center">Qui a gagné cette manche ?</Typography>
                
                <Box display="flex" justifyContent="space-around" mt={1}>
                    <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player1Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player1Name)}>{player1Name}</Button>
                    <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player2Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player2Name)}>{player2Name}</Button>
                    <Button variant="contained" color="inherit" onClick={() => setRoundAsDraw()}>Egalité</Button>
                </Box>
                
                {roundWinner !== null && 
                    <Box display="flex" flexDirection="row" alignItems="center" gap={5} mt={5} justifyContent="center">
                        <TextField
                            sx={{width: 110}}
                            type="number"
                            label="Points" 
                            variant="outlined"
                            inputProps={{min: 0, max: 240, style: {textAlign: 'center', fontSize: '1.8rem'}}}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setRoundPoints(Number(event.target.value))}
                            inputRef={input => input && input.focus()}
                        />
                        <Button disabled={!isRoundScoreValid} variant="contained" size="large" onClick={validateRound}>Valider</Button>
                    </Box>
                }
            </Box>
        </Container>
    );
}