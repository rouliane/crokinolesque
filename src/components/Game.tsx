import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Initialization from './Initialization';
import GameOver from './GameOver';
import Ongoing from './Ongoing';
import {GamePhase} from "../hooks/useGame";
import {useGameContext} from "../contexts/gameContext";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Header from "./Header";
import {requestWakeLock} from '../wakeLock';

export default function Game() {
    const {phase, currentPlayer, isResumingGame, setIsResumingGame} = useGameContext();
    const [showFirstPlayerAlert, setFirstPlayerAlert] = useState(false);
    const [wakeLock, setWakeLock] = useState<any>(null);

    useEffect(() => {
        let wakeLockInstance: any = null;

        if (phase === GamePhase.Ongoing) {
            requestWakeLock().then(lock => {
                wakeLockInstance = lock;
                setWakeLock(lock);
            });
        } else if (phase === GamePhase.GameOver && wakeLock) {
            wakeLock.release();
            setWakeLock(null);
        }

        return () => {
            if (wakeLockInstance) {
                wakeLockInstance.release();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

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
            <Header />

            {phase === GamePhase.Initialization && <Initialization notifyFirstPlayer={notifyFirstPlayer} />}
            {phase === GamePhase.Ongoing && <Ongoing />}
            {phase === GamePhase.GameOver && <GameOver />}

            <Snackbar
                open={showFirstPlayerAlert}
                autoHideDuration={5000}
                onClose={handleCloseFirstPlayerAlert}
                message={`Le premier joueur sera ${currentPlayer}`}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            />

            <Snackbar
                open={isResumingGame}
                autoHideDuration={10000}
                onClose={() => setIsResumingGame(false)}
                message="Une partie non terminée a été chargée"
                action={<Button onClick={restartGame} color="secondary" size="small">Recommencer</Button>}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            />
        </Container>
    );
}
