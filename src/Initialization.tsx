import React, { ChangeEvent } from 'react';

type Props = {
    moveToNextPhase: () => void;
    setPlayer1Name: (name: string) => void;
    setPlayer2Name: (name: string) => void;
}

export default function Initialization({ moveToNextPhase, setPlayer1Name, setPlayer2Name }: Props) {
    return (
        <div>
            <label>Joueur 1</label>
            <input type="text" autoFocus onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer1Name(event.target.value)}/>
            <label>Joueur 2</label>
            <input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer2Name(event.target.value)}/>
            <button onClick={moveToNextPhase}>Commencer</button>
        </div>
    );
}