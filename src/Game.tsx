import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Initialization from './Initialization';
import GameOver from './GameOver';
import Ongoing from './Ongoing';
import Logo from './logo.png';

/**
 * game rules :
 * Crokinole is a board game that is played on a circular board with a hole in the middle.
 * 1. The game is played by 2 players
 * 2. The players take turns to play
 * 3. Each round players play all their discs and we calculate the points at the end of the round
 * 4. Each player can mark from 0 to 240 points (12*20) in each round
 * 5. The player who reaches 100 points first wins the game
 * 
 * the user interface will be in french
 */

enum GamePhase {
  Initialization,
  Ongoing,
  GameOver
}

export type Round = {
  player1: { name: string, score: number };
  player2: { name: string, score: number };
  winner: string | null;
}

function Game() {
  const [phase, setPhase] = useState(GamePhase.Initialization);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winnerName, setWinnerName] = useState('');
  const firstPlayer = Math.random() < 0.5 ? player1Name : player2Name;
  const [rounds, setRounds] = useState<Round[]>([]);

  const launchGame = (player1Name: string, player2Name: string) => {
    setPlayer1Name(player1Name);
    setPlayer2Name(player2Name);
    setPhase(GamePhase.Ongoing);
  }

  const saveRound = (round: Round) => {
    const newRounds = [...rounds, round];
    setRounds(newRounds);
  }

  const finishGame = (winner: string) => {
    setWinnerName(winner);
    setPhase(GamePhase.GameOver);
  }

  return (
    <Container disableGutters >
      {phase === GamePhase.Ongoing && 
        <Box display="flex" justifyContent="center" mt={2} mb={2}>
          <Box display="flex" alignContent="center">
            <img src={Logo} alt='Logo' width={50} />
            <Typography variant="h5" component="span" textAlign="center" textTransform="uppercase" m={1}>
              Crokinolesque
            </Typography>
          </Box>
        </Box>
        }

      {phase === GamePhase.Initialization &&
        <>
          <Typography variant="h4" textAlign="center" textTransform="uppercase" m={1}>
            Crokinolesque
          </Typography>

          <Box width={150} height={150} margin="20px auto 50px auto">
            <img src={Logo} alt='Logo' />
          </Box>
        </>
      }
      {phase === GamePhase.Initialization && <Initialization moveToNextPhase={launchGame} />}
      {phase === GamePhase.Ongoing && <Ongoing
        player1Name={player1Name}
        player2Name={player2Name}
        player1Score={player1Score}
        player2Score={player2Score}
        setPlayer1Score={setPlayer1Score}
        setPlayer2Score={setPlayer2Score}
        firstPlayer={firstPlayer}
        moveToNextPhase={finishGame}
        saveRound={saveRound}
      />}
      {phase === GamePhase.GameOver && <GameOver
        winnerName={winnerName}
        winnerScore={player1Name === winnerName ? player1Score : player2Score}
        looserScore={player1Name === winnerName ? player2Score : player1Score}
        rounds={rounds}
        player1Name={player1Name}
        player2Name={player2Name}
      />}
    </Container>
  );
}

export default Game;
