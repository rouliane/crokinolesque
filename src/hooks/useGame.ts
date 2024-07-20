import {useCallback, useEffect, useMemo, useState} from "react";

enum GamePhase {
    Initialization,
    Ongoing,
    GameOver
}

type Round = {
    player1Score: number;
    player2Score: number;
    winner: string | null;
}

type GameState = {
    phase: GamePhase;
    player1Name: string;
    player2Name: string;
    currentPlayer: string;
    rounds: Round[];
}

const useGame = () => {
    const [isResumingGame, setIsResumingGame] = useState(false);
    const [phase, setPhase] = useState(GamePhase.Initialization);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(player1Name);
    const [rounds, setRounds] = useState<Round[]>([]);

    useEffect(() => {
        const previousGameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
        if (previousGameState.phase === GamePhase.Ongoing) {
            setIsResumingGame(true);
            setPhase(GamePhase.Ongoing);
            setPlayer1Name(previousGameState.player1Name);
            setPlayer2Name(previousGameState.player2Name);
            setCurrentPlayer(previousGameState.currentPlayer);
            setRounds(previousGameState.rounds);
        }
    }, []);

    const saveGameState = (phase: GamePhase, currentPlayer: string, rounds: Round[]) => {
        const gameState = {phase, player1Name, player2Name, currentPlayer, rounds};
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

    const launchGame = () => {
        const currentPlayer = Math.random() < 0.5 ? player1Name : player2Name;
        setCurrentPlayer(currentPlayer);
        setPhase(GamePhase.Ongoing);
        saveGameState(GamePhase.Ongoing, currentPlayer, []);
    }

    const endRoundWithAWinner = (winner: string, points: number) => {
        const lastRound = getLastRound();

        const previousPlayer1Score = lastRound?.player1Score ?? 0;
        const previousPlayer2Score = lastRound?.player2Score ?? 0;

        const player1NewScore = winner === player1Name ? previousPlayer1Score + points : previousPlayer1Score;
        const player2NewScore = winner === player2Name ? previousPlayer2Score + points : previousPlayer2Score;

        const newRounds = [...rounds, {
            player1Score: player1NewScore,
            player2Score: player2NewScore,
            winner
        }];
        setRounds(newRounds);
        const currentPlayer = togglePlayer();

        saveGameState(phase, currentPlayer, newRounds);

        if (player1NewScore >= 100 || player2NewScore >= 100) {
            finishGame();
        }
    }

    const endRoundWithADraw = () => {
        const lastRound = getLastRound();
        const newRounds = [...rounds, {
            player1Score: lastRound === null ? 0 : lastRound.player1Score,
            player2Score: lastRound === null ? 0 : lastRound.player2Score,
            winner: null
        }];
        setRounds(newRounds);

        const currentPlayer = togglePlayer();

        saveGameState(phase, currentPlayer, newRounds);
    }

    const getLastRound = useCallback((): null | Round => rounds.length > 0 ? rounds[rounds.length - 1] : null, [rounds]);

    const finishGame = () => {
        setPhase(GamePhase.GameOver);
        localStorage.removeItem('gameState');
    }

    const togglePlayer = (): string => {
        const newPlayer = currentPlayer === player1Name ? player2Name : player1Name;
        setCurrentPlayer(newPlayer);

        return newPlayer;
    }

    const player1Score = useMemo(() => getLastRound()?.player1Score ?? 0, [getLastRound]);
    const player2Score = useMemo(() => getLastRound()?.player2Score ?? 0, [getLastRound]);

    return {
        phase,
        player1Name,
        player2Name,
        setPlayer1Name,
        setPlayer2Name,
        rounds,
        launchGame,
        endRoundWithAWinner,
        endRoundWithADraw,
        currentPlayer,
        player1Score,
        player2Score,
        isResumingGame,
        setIsResumingGame,
    }
}

export type {Round, GameState};
export {useGame, GamePhase}
