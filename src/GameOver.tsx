import React from "react";

type Props = {
    winnerName: string;
    winnerScore: number;
    looserScore: number;
}

export default function GameOver({winnerName, winnerScore, looserScore}: Props) {
  return (
    <div>
      <h1>{winnerName} a gagné {winnerScore} - {looserScore}</h1>
      <button onClick={() => window.location.reload()}>Rejouer</button>
    </div>
  );
}