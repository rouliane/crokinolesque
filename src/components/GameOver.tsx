import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import RoundsHistory from "./RoundsHistory";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";
import {useGameContext} from "../contexts/gameContext";
import Header from "./Header";

export default function GameOver() {
    const {rounds, player1Name, player2Name} = useGameContext();

    const lastRound = rounds[rounds.length - 1];
    const winnerName = lastRound.player1Score > lastRound.player2Score ? player1Name : player2Name;
    const winnerScore = Math.max(lastRound.player1Score, lastRound.player2Score);
    const looserScore = Math.min(lastRound.player1Score, lastRound.player2Score);

    return (
        <Container sx={{textAlign: "center"}}>
            <Header />

            <Typography variant="h5" mb={4} color="success.main">
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                    <CelebrationIcon/>
                    {winnerName} a gagné {winnerScore} - {looserScore}
                </Stack>
            </Typography>
            <Button variant="contained" size="large" onClick={() => window.location.reload()}>Rejouer</Button>

            <Typography variant="h6" mt={5}>Historique</Typography>

            <TableContainer component={Paper} sx={{marginTop: 2, marginBottom: 2}}>
                <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name}/>
            </TableContainer>

        </Container>
    );
}
