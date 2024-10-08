import {act, renderHook} from "@testing-library/react";
import {GamePhase, GameState, useGame} from "./useGame";

beforeEach(() => {
    localStorage.clear();
});

test('it returns the default application state', () => {
    const {result} = renderHook(() => useGame());
    expect(result.current.phase).toBe(GamePhase.Initialization);
    expect(result.current.player1Name).toBe('');
    expect(result.current.player2Name).toBe('');
    expect(result.current.currentPlayer).toBe('');
    expect(result.current.rounds).toEqual([]);
});

test('it launches the game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    expect(result.current.phase).toBe(GamePhase.Ongoing);
    expect(result.current.player1Name).toBe('Player 1');
    expect(result.current.player2Name).toBe('Player 2');
    expect(result.current.currentPlayer).toMatch(/Player [12]/);
    expect(result.current.rounds).toEqual([]);
    expect(result.current.player1Score).toBe(0);
    expect(result.current.player2Score).toBe(0);
});

test('it ends a round with a winner', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    const currentPlayer = result.current.currentPlayer;

    act(() => result.current.endRoundWithAWinner('Player 1', 50));

    expect(result.current.rounds).toEqual([{player1Score: 50, player2Score: 0, winner: 'Player 1'}]);
    expect(result.current.player1Score).toBe(50);
    expect(result.current.player2Score).toBe(0);
    expect(result.current.currentPlayer).not.toBe(currentPlayer);
});

test('it ends a round with a draw', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    const currentPlayer = result.current.currentPlayer;

    act(() => result.current.endRoundWithADraw());

    expect(result.current.rounds).toEqual([{player1Score: 0, player2Score: 0, winner: null}]);
    expect(result.current.player1Score).toBe(0);
    expect(result.current.player2Score).toBe(0);
    expect(result.current.currentPlayer).not.toBe(currentPlayer);
});

test('it finishes the game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    act(() => result.current.endRoundWithAWinner('Player 1', 100));

    expect(result.current.phase).toBe(GamePhase.GameOver);
});

test('it correctly saves multiple rounds', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    act(() => result.current.endRoundWithAWinner('Player 1', 50));
    act(() => result.current.endRoundWithADraw());
    act(() => result.current.endRoundWithAWinner('Player 2', 20));
    act(() => result.current.endRoundWithAWinner('Player 1', 40));
    act(() => result.current.endRoundWithAWinner('Player 1', 30));

    expect(result.current.rounds).toEqual([
        {player1Score: 50, player2Score: 0, winner: 'Player 1'},
        {player1Score: 50, player2Score: 0, winner: null},
        {player1Score: 50, player2Score: 20, winner: 'Player 2'},
        {player1Score: 90, player2Score: 20, winner: 'Player 1'},
        {player1Score: 120, player2Score: 20, winner: 'Player 1'},
    ]);
    expect(result.current.player1Score).toBe(120);
    expect(result.current.player2Score).toBe(20);
});

test('it saves the game state in local storage when starting a new game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [],
    });
});

test('it saves the game state in local storage when someones wins a round', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());
    act(() => result.current.endRoundWithAWinner('Player 1', 50));

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [{player1Score: 50, player2Score: 0, winner: 'Player 1'},],
    });
});

test('it saves the game state in local storage when drawing a round', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());
    act(() => result.current.endRoundWithADraw());

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [{player1Score: 0, player2Score: 0, winner: null},],
    });
});

test('it clears the game state in local storage when the game is finished', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.setPlayer1Name('Player 1'));
    act(() => result.current.setPlayer2Name('Player 2'));
    act(() => result.current.launchGame());

    act(() => result.current.endRoundWithAWinner('Player 1', 50));
    act(() => result.current.endRoundWithAWinner('Player 2', 100));

    expect(localStorage.getItem('gameState')).toBeNull();
});

test('it loads the previous game state when starting the application', () => {
    localStorage.setItem('gameState', JSON.stringify({
        phase: GamePhase.Ongoing,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        currentPlayer: 'Player 2',
        rounds: [
            {player1Score: 50, player2Score: 0, winner: 'Player 1'},
            {player1Score: 50, player2Score: 0, winner: null},
            {player1Score: 50, player2Score: 20, winner: 'Player 2'},
        ],
    }));

    const {result} = renderHook(() => useGame());

    expect(result.current.player1Name).toBe('Player 1');
    expect(result.current.player2Name).toBe('Player 2');
    expect(result.current.phase).toBe(GamePhase.Ongoing);
    expect(result.current.rounds).toEqual([
        {player1Score: 50, player2Score: 0, winner: 'Player 1'},
        {player1Score: 50, player2Score: 0, winner: null},
        {player1Score: 50, player2Score: 20, winner: 'Player 2'},
    ]);
    expect(result.current.player1Score).toBe(50);
    expect(result.current.player2Score).toBe(20);
    expect(result.current.currentPlayer).toBe('Player 2');

    act(() => result.current.launchGame());

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        player1Name: 'Player 1',
        player2Name: 'Player 2',
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [],
    });
});
