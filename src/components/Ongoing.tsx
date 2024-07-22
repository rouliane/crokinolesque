import React, {ChangeEvent, useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import HistoryIcon from '@mui/icons-material/HistoryToggleOff';
import IconButton from "@mui/material/IconButton";
import HistoryModal from "./HistoryModal";
import Header from "./Header";
import {useGameContext} from "../contexts/gameContext";

export default function Ongoing() {
    const {currentPlayer, player1Name, player2Name, endRoundWithADraw, endRoundWithAWinner, player1Score, player2Score} = useGameContext();
    const [roundPoints, setRoundPoints] = useState<null | number>(null);
    const [roundWinner, setRoundWinner] = useState<null|string>(null);
    const [showHistory, setShowHistory] = useState(false);

    const isRoundScoreValid = roundPoints !== null && roundPoints > 0 && roundPoints <= 240 && roundPoints % 5 === 0;

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRoundPoints(Number(event.target.value));
    }

    const validateRoundWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && isRoundScoreValid) {
            setRoundPoints(null);
            endRoundWithAWinner(roundWinner as string, roundPoints as number);
            setRoundWinner(null);
        }
    }

    const validateRound = () => {
        setRoundPoints(null);
        endRoundWithAWinner(roundWinner as string, roundPoints as number);
        setRoundWinner(null);
    }

    const draw = () => {
        endRoundWithADraw();
        setRoundWinner(null);
        setRoundPoints(null);
    }

    return (
        <>
            <Header />
            <Container>

                <Box display="flex" gap="15px" alignItems="center">
                    <Paper sx={{display: "flex", padding: "10px", backgroundColor: "#243647", backgroundImage: "none"}}>
                        <ArrowForwardIcon/>
                    </Paper>
                    <Box flexGrow="1">
                        <Typography fontWeight="500">Premier joueur</Typography>
                        <Box fontSize="small" color="#93ADC9">{currentPlayer}</Box>
                    </Box>
                    <Box alignSelf="start">
                        <IconButton onClick={() => setShowHistory(!showHistory)}><HistoryIcon/></IconButton>
                    </Box>
                </Box>

                <Typography variant="h6" mt="16px">Score</Typography>

                <Box display="flex" gap="10px" alignItems="stretch" mt="5px">
                    <Paper sx={{textAlign: "center", padding: "5px 10px 10px 10px", backgroundImage: "none", border: "1px #344D65 solid", width: "100%"}}>
                        <div><Typography fontSize="xx-large" fontWeight="600" color={theme => theme.palette.primary.main} data-testid="player1Score">{player1Score}</Typography></div>
                        <Typography fontSize={theme => theme.typography.fontSize}>{player1Name}</Typography>
                    </Paper>

                    <Paper sx={{textAlign: "center", padding: "5px 10px 10px 10px", backgroundImage: "none", border: "1px #344D65 solid", width: "100%"}}>
                        <div><Typography fontSize="xx-large" fontWeight="600" color={theme => theme.palette.primary.main} data-testid="player2Score">{player2Score}</Typography></div>
                        <Typography fontSize={theme => theme.typography.fontSize}>{player2Name}</Typography>
                    </Paper>
                </Box>

                <Box mt={2}>
                    <Typography variant="h6">Qui a gagné cette manche ?</Typography>

                    <Box display="flex" justifyContent="space-between" mt={1}>
                        <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player1Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player1Name)}>{player1Name}</Button>
                        <Button variant="contained" color={roundWinner === null ? 'primary' : roundWinner === player2Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player2Name)}>{player2Name}</Button>
                        <Button variant="contained" color="inherit" onClick={draw}>Egalité</Button>
                    </Box>

                    {roundWinner !== null &&
                        <Box display="flex" flexDirection="row" alignItems="center" gap={5} mt={5} justifyContent="center">
                            <TextField
                                sx={{width: 110}}
                                type="number"
                                label="Points"
                                variant="outlined"
                                inputProps={{min: 0, max: 240, style: {textAlign: 'center', fontSize: '1.5rem'}}}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => handleScoreChange(event)}
                                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => validateRoundWithEnterKey(event)}
                                inputRef={input => input && input.focus()}
                            />
                            <Button
                                disabled={!isRoundScoreValid}
                                variant="contained"
                                size="large"
                                onClick={validateRound}
                            >
                                Valider
                            </Button>
                        </Box>
                    }
                </Box>

                <HistoryModal
                    open={showHistory}
                    close={() => setShowHistory(false)}
                />
            </Container>
        </>
    );
}
