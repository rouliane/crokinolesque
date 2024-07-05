import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import StartIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';

type Props = {
    moveToNextPhase: (player1Name: string, player2Name: string) => void;
}

export default function Initialization({ moveToNextPhase }: Props) {
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    
    return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
            <TextField
                label="Joueur 1" 
                variant="outlined" 
                InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>)}} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer1Name(event.target.value)}
                tabIndex={1}
            />

            <TextField 
                label="Joueur 2" 
                variant="outlined" 
                InputProps={{startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>)}} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer2Name(event.target.value)}
                tabIndex={2}
            />

            <Button disabled={player1Name.trim() === '' || player2Name.trim() === ''} variant='contained' size='large' onClick={() => moveToNextPhase(player1Name, player2Name)} endIcon={<StartIcon />}>Commencer</Button>
        </Box>
    );
}