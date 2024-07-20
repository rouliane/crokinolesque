import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Initialization from './Initialization';
import GameOver from './GameOver';
import Ongoing from './Ongoing';
import {GamePhase} from "../hooks/useGame";
import {useGameContext} from "../contexts/gameContext";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";

/**
 * game rules :
 * Crokinole is a board game that is played on a circular board with a hole in the middle.
 * 1. The game is played by 2 players
 * 2. The players take turns to play
 * 3. Each round players play all their discs and we calculate the points at the end of the round
 * 4. Each player can mark from 0 to 240 points (12*20) in each round
 * 5. The player who reaches 100 points first wins the game
 * 6. When the game is over, the user will be able to restart the game.
 *
 * the user interface will be in french
 *
 * The game state will be stored in local storage. If the page is reload, the game will continue where it was left if there was a game in progress.
 * When the game is over, the state will be reset in the local storage.
 */

export default function Game() {
    const {phase, currentPlayer, isResumingGame, setIsResumingGame} = useGameContext();
    const [showFirstPlayerAlert, setFirstPlayerAlert] = useState(false);

    const handleCloseFirstPlayerAlert = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setFirstPlayerAlert(false);
    }

    const notifyFirstPlayer = () => {
        setFirstPlayerAlert(true);
    }

    const restartGame = () => {
        localStorage.removeItem('gameState');
        window.location.reload()
    }

    return (
        <Container disableGutters>
            {phase === GamePhase.Initialization && <Initialization notifyFirstPlayer={notifyFirstPlayer} />}
            {phase === GamePhase.Ongoing && <Ongoing />}
            {phase === GamePhase.GameOver && <GameOver />}

            <Snackbar
                open={showFirstPlayerAlert}
                autoHideDuration={5000}
                onClose={handleCloseFirstPlayerAlert}
                message={`Le premier joueur sera ${currentPlayer}`}
            />

            <Snackbar
                open={isResumingGame}
                autoHideDuration={10000}
                onClose={() => setIsResumingGame(false)}
                message="Une partie non terminée a été chargée"
                action={<Button onClick={restartGame} color="secondary" size="small">Recommencer</Button>}
            />
        </Container>
    );
}
