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
import RoundsHistory from "./RoundsHistory";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {useGameContext} from "../contexts/gameContext";
import Header from "./Header";

export default function Ongoing() {
    const {currentPlayer, player1Name, player2Name, rounds, endRoundWithADraw, endRoundWithAWinner, player1Score, player2Score} = useGameContext();
    const [roundPoints, setRoundPoints] = useState<null | number>(null);
    const [roundWinner, setRoundWinner] = useState<null|string>(null);

    const isCurrentPlayer = (player: string) => player === currentPlayer;

    const isRoundScoreValid = roundPoints !== null && roundPoints > 0 && roundPoints <= 240 && roundPoints % 5 === 0;

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRoundPoints(Number(event.target.value));
    }

    const validateRoundWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && isRoundScoreValid) {
            setRoundPoints(null);
            endRoundWithAWinner(roundWinner as string, roundPoints as number);
            setRoundWinner(null);
        }
    }

    const validateRound = () => {
        setRoundPoints(null);
        endRoundWithAWinner(roundWinner as string, roundPoints as number);
        setRoundWinner(null);
    }

    return (
        <Container>
            <Header />

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
                    <Button variant="contained" color="inherit" onClick={() => endRoundWithADraw()}>Egalité</Button>
                </Box>

                {roundWinner !== null &&
                    <Box display="flex" flexDirection="row" alignItems="center" gap={5} mt={5} justifyContent="center">
                        <TextField
                            sx={{width: 110}}
                            type="number"
                            label="Points"
                            variant="outlined"
                            inputProps={{min: 0, max: 240, style: {textAlign: 'center', fontSize: '1.5rem'}}}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => handleScoreChange(event)}
                            onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => validateRoundWithEnterKey(event)}
                            inputRef={input => input && input.focus()}
                        />
                        <Button
                            disabled={!isRoundScoreValid}
                            variant="contained"
                            size="large"
                            onClick={validateRound}
                        >
                            Valider
                        </Button>
                    </Box>
                }
            </Box>

            {rounds.length > 0 &&
                <Box textAlign="center">
                    <Typography variant="h6" mt={5}>Historique</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name} />
                    </TableContainer>
                </Box>
            }
        </Container>
    );
}
