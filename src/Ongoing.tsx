import React, { ChangeEvent, useState } from "react";

type Props = {
    player1Name: string;
    player2Name: string;
    firstPlayer: string;
    player1Score: number;
    player2Score: number;
    setPlayer1Score: (score: number) => void;
    setPlayer2Score: (score: number) => void;
    moveToNextPhase: (winnerName: string) => void;
}

export default function Ongoing({ player1Name, player2Name, firstPlayer, player1Score, player2Score, setPlayer1Score, setPlayer2Score, moveToNextPhase}: Props) {
    const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
    const [roundPoints, setRoundPoints] = useState<null | number>(null);
    const [roundWinner, setRoundWinner] = useState<null|string>(null);

    const isCurrentPlayer = (player: string) => player === currentPlayer;

    const validateRound = () => {
        const player1NewScore = player1Score + Number(roundPoints);
        const player2NewScore = player2Score + Number(roundPoints);

        if (roundWinner === player1Name) {
            setPlayer1Score(player1NewScore);
        } else {
            setPlayer2Score(player2NewScore);
        }

        if (roundWinner !== null && (player1NewScore >= 100 || player2NewScore >= 100)) {
            moveToNextPhase(roundWinner);
            return;
        }
        

        setRoundWinner(null);
        setCurrentPlayer(currentPlayer === player1Name ? player2Name : player1Name);
        setRoundPoints(null);
    }

    return (
        <div>
            <p>
                {player1Name} {isCurrentPlayer(player1Name) ? '*' : ''} : {player1Score}

            </p>
            <p>
                {player2Name} {isCurrentPlayer(player2Name) ? '*' : ''} : {player2Score}
            </p>

            <div>
                <p>Qui a gagné cette manche ?</p>
                
                
                <label htmlFor="winnerIsPlayer1">{player1Name}</label>
                <input type="radio" name="roundWinner" id="winnerIsPlayer1" value="winnerIsPlayer1" checked={roundWinner === player1Name} onClick={() => setRoundWinner(player1Name)}/>
                
                <label htmlFor="winnerIsPlayer2">{player2Name}</label>
                <input type="radio" name="roundWinner" id="winnerIsPlayer2" value="winnerIsPlayer2" checked={roundWinner === player2Name} onClick={() => setRoundWinner(player2Name)}/>
                
                {roundWinner !== null && 
                    <>
                    <div>
                        <label htmlFor="winnerPoints">Points</label>
                        <input type="number" max={240} min={0} id="winnerPoints" value={roundPoints === null ? '' : roundPoints} onChange={(event: ChangeEvent<HTMLInputElement>) => setRoundPoints(Number(event.target.value))}/>
                    </div>

                    <button onClick={validateRound}>Valider</button>
                    </>
                }
            </div>
        </div>
    );
}