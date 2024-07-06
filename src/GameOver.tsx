import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Round } from "./Game";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import RoundsHistory from "./RoundsHistory";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";

type Props = {
    winnerName: string;
    winnerScore: number;
    looserScore: number;
    rounds: Round[];
    player1Name: string;
    player2Name: string;
}

export default function GameOver({winnerName, winnerScore, looserScore, rounds, player1Name, player2Name}: Props) {
  return (
    <Container sx={{textAlign: "center"}}>
      <Typography variant="h5" mb={5} color="success.main">
      <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
        <CelebrationIcon />
        {winnerName} a gagné {winnerScore} - {looserScore}
        </Stack>
      </Typography>
      <Button variant="contained" size="large" onClick={() => window.location.reload()}>Rejouer</Button>

      <Typography variant="h6" mt={5}>Historique</Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name} />
      </TableContainer>

    </Container>
  );
}