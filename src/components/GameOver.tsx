import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import RoundsHistory from "./RoundsHistory";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";
import {useGameContext} from "../contexts/gameContext";
import Box from "@mui/material/Box";

export default function GameOver() {
    const {rounds, player1Name, player2Name, launchNewGameWithSamePlayers} = useGameContext();

    const lastRound = rounds[rounds.length - 1];
    const winnerName = lastRound.player1Score > lastRound.player2Score ? player1Name : player2Name;
    const winnerScore = Math.max(lastRound.player1Score, lastRound.player2Score);
    const looserScore = Math.min(lastRound.player1Score, lastRound.player2Score);

    return (
        <Container sx={{textAlign: "center"}}>
            <Typography variant="h5" mb={4} color="success.main">
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                    <CelebrationIcon/>
                    {winnerName} a gagné {winnerScore} - {looserScore}
                </Stack>
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <Button variant="contained" size="large" onClick={() => launchNewGameWithSamePlayers()}>Nouvelle partie (mêmes joueurs)</Button>
                <Button variant="contained" size="large" onClick={() => window.location.reload()}>Nouvelle partie (nouveaux joueurs)</Button>
            </Box>

            <Typography variant="h6" mt={5}>Historique</Typography>

            <TableContainer sx={{marginTop: 2, marginBottom: 2}}>
                <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name}/>
            </TableContainer>
        </Container>
    );
}
