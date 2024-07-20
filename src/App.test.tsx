import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";
import {GamePhase} from "./hooks/useGame";

beforeEach(() => {
    localStorage.clear();
});

test('the app is rendered', () => {
    render(<App />);
    expect(screen.getByText('Crokinolesque')).toBeInTheDocument();
});

test('happy path', async () => {
    render(<App />);

    await player1WillBeCalled('Player 1');
    await player2WillBeCalled('Player 2');

    await userEvent.click(screen.getByRole('button', {name: 'Commencer'}));

    expect(screen.getByText(/Le premier joueur sera Player [1,2]/i)).toBeInTheDocument();

    await userScoresPoints('Player 1', 20);
    gameScoreShouldNowBe(20, 0);

    await userScoresPoints('Player 2', 40);
    gameScoreShouldNowBe(20, 40);

    await userEvent.click(screen.getByRole('button', {name: 'Egalité'}));
    gameScoreShouldNowBe(20, 40);

    await userScoresPoints('Player 1', 80);

    expect(screen.getByText(/Player 1 a gagné 100 - 40/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Rejouer'})).toBeInTheDocument();
    expect(screen.getAllByTestId('roundHistoryEntry').length).toBe(4);

    displayedRoundHistoryShouldBe([
        '1 20 0',
        '2 20 40',
        '3 20 40',
        '4 100 40'
    ]);
});

test('A game can be resumed and the players will be notified', async () => {
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

    render(<App />);

    gameScoreShouldNowBe(50, 20);

    expect(screen.getByText(/Une partie non terminée a été chargée/i)).toBeInTheDocument();
});

async function player1WillBeCalled(playerName: string) {
    const player1Input = screen.getByLabelText('Joueur 1');
    await userEvent.click(player1Input);
    await userEvent.type(player1Input, playerName);
}

async function player2WillBeCalled(playerName: string) {
    const player2Input = screen.getByLabelText('Joueur 2');
    await userEvent.click(player2Input);
    await userEvent.type(player2Input, playerName);
}

async function userScoresPoints(playerName: string, points: number) {
    const playerButton = screen.getByRole('button', {name: playerName});
    await userEvent.click(playerButton);
    const scoreInput = screen.getByLabelText('Points');
    await userEvent.click(scoreInput);
    await userEvent.type(scoreInput, points.toString());
    await userEvent.click(screen.getByRole('button', {name: 'Valider'}));
}

function gameScoreShouldNowBe(player1Score: number, player2Score: number) {
    expect(screen.getByText(`Player 1 : ${player1Score}`)).toBeInTheDocument();
    expect(screen.getByText(`Player 2 : ${player2Score}`)).toBeInTheDocument();
}

function displayedRoundHistoryShouldBe(expected: string[]) {
    const roundHistoryFromDOM = screen.getAllByTestId('roundHistoryEntry').map(entry => entry.textContent as string);
    const expectedFormatted = expected.map(entry => entry.replace(/\s/g, ''));
    expect(roundHistoryFromDOM).toMatchObject(expectedFormatted);
}
