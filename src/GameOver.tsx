import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
    winnerName: string;
    winnerScore: number;
    looserScore: number;
}

export default function GameOver({winnerName, winnerScore, looserScore}: Props) {
  return (
    <Container sx={{textAlign: "center"}}>
      <Typography variant="h5" mb={5}>{winnerName} a gagné {winnerScore} - {looserScore}</Typography>
      <Button variant="contained" size="large" onClick={() => window.location.reload()}>Rejouer</Button>
    </Container>
  );
}