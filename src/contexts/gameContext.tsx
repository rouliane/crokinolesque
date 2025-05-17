import React, {createContext, useContext} from 'react';
import {useGame, GamePhase, Round} from '../hooks/useGame';

interface GameContextType {
    phase: GamePhase;
    player1Name: string;
    player2Name: string;
    rounds: Round[];
    launchGame: (player1Name: string, player2Name: string) => void;
    endRoundWithAWinner: (winner: string, points: number) => number;
    endRoundWithADraw: () => void;
    currentPlayer: string;
    player1Score: number;
    player2Score: number;
    isResumingGame: boolean;
    setIsResumingGame: (isResumingGame: boolean) => void;
    launchNewGameWithSamePlayers: () => void;
}

const GameContext = createContext<GameContextType>({
    phase: GamePhase.Initialization,
    player1Name: '',
    player2Name: '',
    rounds: [],
    launchGame: (player1Name: string, player2Name: string) => {},
    endRoundWithAWinner: () => 0,
    endRoundWithADraw: () => {},
    currentPlayer: '',
    player1Score: 0,
    player2Score: 0,
    isResumingGame: false,
    setIsResumingGame: () => {},
    launchNewGameWithSamePlayers: () => {},
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
