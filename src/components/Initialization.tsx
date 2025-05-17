import React, {ChangeEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import {useGameContext} from "../contexts/gameContext";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type Props = {
    notifyFirstPlayer: () => void;
}

export default function Initialization({notifyFirstPlayer}: Props) {
    const [playersNumber, setPlayersNumber] = useState<number>(2);
    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [player3Name, setPlayer3Name] = useState('');
    const [player4Name, setPlayer4Name] = useState('');
    const {launchGame} = useGameContext();

    const playerNames = [player1Name, player2Name, player3Name, player4Name].slice(0, playersNumber).map(playerName => playerName.trim());
    const playerNamesAreValid = playerNames.every(name => name.trim() !== '');

    const startGame = () => {
        launchGame(playerNames);
        notifyFirstPlayer();
    }

    const startGameWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && playerNamesAreValid) {
            startGame();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayersNumber(parseInt((event.target as HTMLInputElement).value));
    };

    return (
        <>
            <Typography variant="h5" align="center">Nouvelle partie</Typography>

            <Box display="flex" flexDirection="column" ml={1} mt={2} mr={1} gap={2}>

                <FormControl sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: 2}}>
                    <Typography fontWeight="bold">Nombre de joueurs</Typography>
                    <RadioGroup value={playersNumber} onChange={handleChange} row>
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                    </RadioGroup>
                </FormControl>

                <div>
                    <Typography fontWeight="bold">Joueur 1</Typography>
                    <TextField
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>),
                            },
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer1Name(event.target.value)}
                        onKeyUp={startGameWithEnterKey}
                        tabIndex={1}
                        placeholder="Nom du joueur 1"
                        fullWidth
                    />
                </div>

                <div>
                    <Typography fontWeight="bold">Joueur 2</Typography>
                    <TextField
                        variant="outlined"
                        slotProps={{
                            input: {
                                startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>),
                            },
                        }}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer2Name(event.target.value)}
                        onKeyUp={startGameWithEnterKey}
                        tabIndex={2}
                        placeholder="Nom du joueur 2"
                        fullWidth
                    />
                </div>

                {playersNumber >= 3 &&
                    <div>
                        <Typography fontWeight="bold">Joueur 3</Typography>
                        <TextField
                            variant="outlined"
                            slotProps={{
                                input: {
                                    startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>),
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer3Name(event.target.value)}
                            onKeyUp={startGameWithEnterKey}
                            tabIndex={3}
                            placeholder="Nom du joueur 3"
                            fullWidth
                        />
                    </div>
                }

                {playersNumber === 4 &&
                    <div>
                        <Typography fontWeight="bold">Joueur 4</Typography>
                        <TextField
                            variant="outlined"
                            slotProps={{
                                input: {
                                    startAdornment: (<InputAdornment position="start"><PersonIcon/></InputAdornment>),
                                },
                            }}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPlayer4Name(event.target.value)}
                            onKeyUp={startGameWithEnterKey}
                            tabIndex={4}
                            placeholder="Nom du joueur 4"
                            fullWidth
                        />
                    </div>
                }

                <Button
                    disabled={!playerNamesAreValid}
                    variant='contained'
                    size='large'
                    onClick={startGame}
                >
                    Commencer
                </Button>
            </Box>
        </>
    );
}
