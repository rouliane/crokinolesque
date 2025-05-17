import React, {createContext, useContext} from 'react';
import {useGame, GamePhase, Round, Player} from '../hooks/useGame';

interface GameContextType {
    phase: GamePhase;
    players: {[playerName: string]: Player};
    rounds: Round[];
    launchGame: (playerNames: string[]) => void;
    endRoundWithAWinner: (winner: string, points: number) => number;
    endRoundWithADraw: () => void;
    currentPlayer: string;
    isResumingGame: boolean;
    setIsResumingGame: (isResumingGame: boolean) => void;
    launchNewGameWithSamePlayers: () => void;
}

const GameContext = createContext<GameContextType>({
    phase: GamePhase.Initialization,
    players: {},
    rounds: [],
    launchGame: (playerNames: string[]) => {},
    endRoundWithAWinner: () => 0,
    endRoundWithADraw: () => {},
    currentPlayer: '',
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
