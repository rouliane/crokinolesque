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

type Props = {
    notifyFirstPlayer: () => void;
}

export default function GameOver({notifyFirstPlayer}: Props) {
    const {rounds, players, launchNewGameWithSamePlayers} = useGameContext();

    const lastRound = rounds[rounds.length - 1];
    const winnerScore = Math.max(...Object.values(lastRound.scores));
    const looserScore = Math.min(...Object.values(lastRound.scores));

    const launchANewGameWithTheSamePlayers = () => {
        launchNewGameWithSamePlayers();
        notifyFirstPlayer();
    }

    return (
        <Container sx={{textAlign: "center"}}>
            <Typography variant="h5" mb={4} color="success.main">
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                    <CelebrationIcon/>
                    {lastRound.winner} a gagné {winnerScore} - {looserScore}
                </Stack>
            </Typography>

            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <Button variant="contained" size="large" onClick={() => launchANewGameWithTheSamePlayers()}>Nouvelle partie (mêmes joueurs)</Button>
                <Button variant="contained" size="large" onClick={() => window.location.reload()}>Nouvelle partie (nouveaux joueurs)</Button>
            </Box>

            <Typography variant="h6" mt={5}>Historique</Typography>

            <TableContainer sx={{marginTop: 2, marginBottom: 2}}>
                <RoundsHistory rounds={rounds} players={players}/>
            </TableContainer>
        </Container>
    );
}
