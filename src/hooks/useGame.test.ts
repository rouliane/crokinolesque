import {act, renderHook} from "@testing-library/react";
import {GamePhase, GameState, useGame} from "./useGame";

beforeEach(() => {
    localStorage.clear();
});

test('it returns the default application state', () => {
    const {result} = renderHook(() => useGame());
    expect(result.current.phase).toBe(GamePhase.Initialization);
    expect(result.current.players).toStrictEqual({});
    expect(result.current.currentPlayer).toBe('');
    expect(result.current.rounds).toEqual([]);
});

test('it launches the game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    expect(result.current.phase).toBe(GamePhase.Ongoing);
    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 0},
            'Player 2': {name: 'Player 2', score: 0},
        }
    );
    expect(result.current.currentPlayer).toMatch(/Player [12]/);
    expect(result.current.rounds).toEqual([]);
});

test('it ends a round with a winner', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    const currentPlayer = result.current.currentPlayer;

    act(() => result.current.endRoundWithAWinner('Player 1', 50));

    expect(result.current.rounds).toEqual([{scores: {'Player 1': 50, 'Player 2': 0}, winner: 'Player 1'}]);
    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 50},
            'Player 2': {name: 'Player 2', score: 0},
        }
    );
    expect(result.current.currentPlayer).not.toBe(currentPlayer);
});

test('it ends a round with a draw', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    const currentPlayer = result.current.currentPlayer;

    act(() => result.current.endRoundWithADraw());

    expect(result.current.rounds).toEqual([{scores: {'Player 1': 0, 'Player 2': 0}, winner: null}]);
    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 0},
            'Player 2': {name: 'Player 2', score: 0},
        }
    );
    expect(result.current.currentPlayer).not.toBe(currentPlayer);
});

test('it finishes the game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    act(() => result.current.endRoundWithAWinner('Player 1', 100));

    expect(result.current.phase).toBe(GamePhase.GameOver);
});

test('it correctly saves multiple rounds', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    act(() => result.current.endRoundWithAWinner('Player 1', 50));
    act(() => result.current.endRoundWithADraw());
    act(() => result.current.endRoundWithAWinner('Player 2', 20));
    act(() => result.current.endRoundWithAWinner('Player 1', 40));
    act(() => result.current.endRoundWithAWinner('Player 1', 30));

    expect(result.current.rounds).toEqual([
        {scores: {'Player 1': 50, 'Player 2': 0}, winner: 'Player 1'},
        {scores: {'Player 1': 50, 'Player 2': 0}, winner: null},
        {scores: {'Player 1': 50, 'Player 2': 20}, winner: 'Player 2'},
        {scores: {'Player 1': 90, 'Player 2': 20}, winner: 'Player 1'},
        {scores: {'Player 1': 120, 'Player 2': 20}, winner: 'Player 1'},
    ]);
    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 120},
            'Player 2': {name: 'Player 2', score: 20},
        }
    );
});

test('it saves the game state in local storage when starting a new game', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        players: {
            'Player 1': {name: 'Player 1', score: 0},
            'Player 2': {name: 'Player 2', score: 0},
        },
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [],
    });
});

test('it saves the game state in local storage when someone wins a round', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));
    act(() => result.current.endRoundWithAWinner('Player 1', 50));

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        players: {
            'Player 1': {name: 'Player 1', score: 50},
            'Player 2': {name: 'Player 2', score: 0},
        },
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [
            {scores: {'Player 1': 50, 'Player 2': 0}, winner: 'Player 1'}
        ],
    });
});

test('it saves the game state in local storage when a round ends with a draw', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));
    act(() => result.current.endRoundWithADraw());

    const gameState: GameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    expect(gameState).toMatchObject({
        phase: GamePhase.Ongoing,
        players: {
            'Player 1': {name: 'Player 1', score: 0},
            'Player 2': {name: 'Player 2', score: 0},
        },
        currentPlayer: expect.stringMatching(/Player [12]/),
        rounds: [
            {scores: {'Player 1': 0, 'Player 2': 0}, winner: null}
        ],
    });
});

test('it clears the game state in local storage when the game is finished', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    act(() => result.current.endRoundWithAWinner('Player 1', 50));
    act(() => result.current.endRoundWithAWinner('Player 2', 100));

    expect(localStorage.getItem('gameState')).toBeNull();
});

test('it loads the previous game state when starting the application', () => {
    localStorage.setItem('gameState', JSON.stringify({
        phase: GamePhase.Ongoing,
        players: {
            'Player 1': {name: 'Player 1', score: 50},
            'Player 2': {name: 'Player 2', score: 20},
        },
        currentPlayer: 'Player 2',
        rounds: [
            {scores: {'Player 1': 50, 'Player 2': 0}, winner: 'Player 1'},
            {scores: {'Player 1': 50, 'Player 2': 0}, winner: null},
            {scores: {'Player 1': 50, 'Player 2': 20}, winner: 'Player 2'},
        ],
    }));

    const {result} = renderHook(() => useGame());

    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 50},
            'Player 2': {name: 'Player 2', score: 20},
        }
    );
    expect(result.current.phase).toBe(GamePhase.Ongoing);
    expect(result.current.rounds).toEqual([
        {scores: {'Player 1': 50, 'Player 2': 0}, winner: 'Player 1'},
        {scores: {'Player 1': 50, 'Player 2': 0}, winner: null},
        {scores: {'Player 1': 50, 'Player 2': 20}, winner: 'Player 2'},
    ]);
    expect(result.current.currentPlayer).toBe('Player 2');
});

test('it allows a game to be restarted with the same players after a game over', () => {
    const {result} = renderHook(() => useGame());
    act(() => result.current.launchGame(['Player 1', 'Player 2']));

    act(() => result.current.endRoundWithAWinner('Player 1', 100));

    expect(result.current.phase).toBe(GamePhase.GameOver);

    act(() => result.current.launchNewGameWithSamePlayers());

    expect(result.current.phase).toBe(GamePhase.Ongoing);
    expect(result.current.players).toStrictEqual(
        {
            'Player 1': {name: 'Player 1', score: 0},
            'Player 2': {name: 'Player 2', score: 0},
        }
    );
    expect(result.current.rounds).toEqual([]);
});
