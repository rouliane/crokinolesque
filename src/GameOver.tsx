import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Round } from "./Game";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <Typography variant="h5" mb={5}>{winnerName} a gagné {winnerScore} - {looserScore}</Typography>
      <Button variant="contained" size="large" onClick={() => window.location.reload()}>Rejouer</Button>

      <Typography variant="h6" mt={5}>Historique</Typography>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width={20}>Manche</TableCell>
              <TableCell align="center">{player1Name}</TableCell>
              <TableCell align="center">{player2Name}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map((round, index) => (
              <TableRow key={index} sx={index %2 !== 0 ? {backgroundColor: 'action.hover'} : {}}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{round.player1.score}</TableCell>
                <TableCell align="center">{round.player2.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
}