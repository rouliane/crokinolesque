import {useCallback, useEffect, useState} from "react";

enum GamePhase {
    Initialization,
    Ongoing,
    GameOver
}

type Player = {
    name: string;
    score: number;
}

type Players = {[playerName: string]: Player};

type RoundScores = {[playerName: string]: number};

type Round = {
    scores: RoundScores;
    winner: string | null;
}

type GameState = {
    phase: GamePhase;
    players: Players;
    currentPlayer: string;
    rounds: Round[];
}

const useGame = () => {
    const [isResumingGame, setIsResumingGame] = useState(false);
    const [phase, setPhase] = useState(GamePhase.Initialization);
    const [players, setPlayers] = useState<Players>({});
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [rounds, setRounds] = useState<Round[]>([]);

    useEffect(() => {
        const previousGameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
        if (previousGameState.phase === GamePhase.Ongoing) {
            setIsResumingGame(true);
            setPhase(GamePhase.Ongoing);
            setPlayers(previousGameState.players);
            setCurrentPlayer(previousGameState.currentPlayer);
            setRounds(previousGameState.rounds);
        }
    }, []);

    const persistGameState = (phase: GamePhase, players: Players, currentPlayer: string, rounds: Round[]) => {
        const gameState = {phase, players, currentPlayer, rounds};
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }

    const launchGame = (playerNames: string[]) => {
        const players = playerNames.reduce((acc, playerName) => {
            acc[playerName] = { name: playerName, score: 0 };
            return acc;
        }, {} as Players);
        setPlayers(players);
        const currentPlayer = playerNames[Math.floor(Math.random() * playerNames.length)];
        setCurrentPlayer(currentPlayer);
        setPhase(GamePhase.Ongoing);
        persistGameState(GamePhase.Ongoing, players, currentPlayer, []);
    }

    const launchNewGameWithSamePlayers = () => {
        setRounds([]);
        setPhase(GamePhase.Ongoing);
        const currentPlayer = Object.keys(players)[Math.floor(Math.random() * Object.keys(players).length)];
        setCurrentPlayer(currentPlayer);
        setPlayers((prevPlayers) => {
            const newPlayers = {...prevPlayers};
            Object.keys(newPlayers).forEach((playerName) => {
                newPlayers[playerName].score = 0;
            });
            return newPlayers;
        });
        persistGameState(GamePhase.Ongoing, players, currentPlayer, []);
    }

    const endRoundWithAWinner = (winner: string, points: number) => {
        const lastRound = getLastRound();

        let newRound: Round;
        let winnerNewScore: number;
        if (lastRound === null) {
            winnerNewScore = points;
            newRound = {
                scores: {...(generateRoundDefaultScores()), [winner]: points},
                winner,
            }
        }
        else {
            winnerNewScore = lastRound.scores[winner] + points;
            newRound = {
                scores: {...lastRound.scores, [winner]: winnerNewScore},
                winner,
            }
        }

        const newRounds = [...rounds, newRound];
        setRounds(newRounds);

        const newPlayers = {
            ...players,
            [winner]: {
                ...players[winner],
                score: winnerNewScore,
            },
        };
        setPlayers(newPlayers);

        const currentPlayer = togglePlayer();

        persistGameState(phase, newPlayers, currentPlayer, newRounds);

        if (winnerNewScore >= 100) {
            finishGame();
        }

        return winnerNewScore;
    }

    const endRoundWithADraw = () => {
        const lastRound = getLastRound();

        let newRound: Round;
        if (lastRound === null) {
            newRound = {
                scores: generateRoundDefaultScores(),
                winner: null,
            }
        }
        else {
            newRound = {
                scores: lastRound.scores,
                winner: null,
            }
        }

        const newRounds = [...rounds, newRound];
        setRounds(newRounds);

        const currentPlayer = togglePlayer();

        persistGameState(phase, players, currentPlayer, newRounds);
    }

    function generateRoundDefaultScores() {
        const playersDefaultScores: RoundScores = Object.entries(players).reduce((acc, [playerName]) => {
            acc[playerName] = 0;
            return acc;
        }, {} as RoundScores);
        return playersDefaultScores;
    }

    const getLastRound = useCallback((): null | Round => rounds.length > 0 ? rounds[rounds.length - 1] : null, [rounds]);

    const finishGame = () => {
        setPhase(GamePhase.GameOver);
        localStorage.removeItem('gameState');
    }

    const togglePlayer = (): string => {
        const playerNames = Object.keys(players);
        const currentPlayerIndex = playerNames.indexOf(currentPlayer);
        const nextPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
        const newPlayer = playerNames[nextPlayerIndex];
        setCurrentPlayer(newPlayer);

        return newPlayer;
    }

    // const player1Score = useMemo(() => getLastRound()?.player1Score ?? 0, [getLastRound]);
    // const player2Score = useMemo(() => getLastRound()?.player2Score ?? 0, [getLastRound]);

    return {
        phase,
        players,
        rounds,
        launchGame,
        endRoundWithAWinner,
        endRoundWithADraw,
        currentPlayer,
        isResumingGame,
        setIsResumingGame,
        launchNewGameWithSamePlayers,
    }
}

export type {Round, GameState, Players, Player};
export {useGame, GamePhase}
