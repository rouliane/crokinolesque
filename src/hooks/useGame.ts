import {useCallback, useMemo, useState} from "react";

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

const useGame = () => {
    const [phase, setPhase] = useState(GamePhase.Initialization);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(player1Name);
    const [rounds, setRounds] = useState<Round[]>([]);

    const launchGame = () => {
        setCurrentPlayer(Math.random() < 0.5 ? player1Name : player2Name);
        setPhase(GamePhase.Ongoing);
    }

    const endRoundWithAWinner = (winner: string, points: number) => {
        const lastRound = getLastRound();

        const previousPlayer1Score = lastRound?.player1Score ?? 0;
        const previousPlayer2Score = lastRound?.player2Score ?? 0;

        const player1NewScore = winner === player1Name ? previousPlayer1Score + points : previousPlayer1Score;
        const player2NewScore = winner === player2Name ? previousPlayer2Score + points : previousPlayer2Score;

        const newRound = {
            player1Score: player1NewScore,
            player2Score: player2NewScore,
            winner
        }
        const newRounds = [...rounds, newRound];
        setRounds(newRounds);
        togglePlayer();

        if (player1NewScore >= 100 || player2NewScore >= 100) {
            finishGame();
        }
    }

    const endRoundWithADraw = () => {
        const lastRound = getLastRound();
        const newRound = {
            player1Score: lastRound === null ? 0 : lastRound.player1Score,
            player2Score: lastRound === null ? 0 : lastRound.player2Score,
            winner: null
        }
        setRounds([...rounds, newRound]);

        togglePlayer();
    }

    const getLastRound = useCallback((): null | Round => rounds.length > 0 ? rounds[rounds.length - 1] : null, [rounds]);

    const finishGame = () => setPhase(GamePhase.GameOver);

    const togglePlayer = () => setCurrentPlayer(currentPlayer === player1Name ? player2Name : player1Name);

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
    }
}

export type {Round};
export {useGame, GamePhase}
