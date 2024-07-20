import React, {createContext, useContext} from 'react';
import {useGame, GamePhase, Round} from '../hooks/useGame';

interface GameContextType {
    phase: GamePhase;
    player1Name: string;
    player2Name: string;
    setPlayer1Name: (name: string) => void;
    setPlayer2Name: (name: string) => void;
    rounds: Round[];
    launchGame: () => void;
    endRoundWithAWinner: (winner: string, points: number) => void;
    endRoundWithADraw: () => void;
    currentPlayer: string;
    player1Score: number;
    player2Score: number;
    isResumingGame: boolean;
    setIsResumingGame: (isResumingGame: boolean) => void;
}

const GameContext = createContext<GameContextType>({
    phase: GamePhase.Initialization,
    player1Name: '',
    player2Name: '',
    rounds: [],
    setPlayer1Name: () => {},
    setPlayer2Name: () => {},
    launchGame: () => {},
    endRoundWithAWinner: () => {},
    endRoundWithADraw: () => {},
    currentPlayer: '',
    player1Score: 0,
    player2Score: 0,
    isResumingGame: false,
    setIsResumingGame: () => {},
});

const GameProvider = ({ children }: {children: any}) => {
    const game = useGame();

    return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};

export {GameProvider, useGameContext};
