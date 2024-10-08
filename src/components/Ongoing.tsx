import React, {useState} from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import HistoryIcon from '@mui/icons-material/HistoryToggleOff';
import IconButton from "@mui/material/IconButton";
import HistoryModal from "./HistoryModal";
import {useGameContext} from "../contexts/gameContext";
import RoundScoreDialog from "./RoundScoreDialog";
import {useAppThemeContext} from "../contexts/AppThemeContext";
import {PaletteMode} from "../Palette";

export default function Ongoing() {
    const {currentPlayer, player1Name, player2Name, endRoundWithADraw, endRoundWithAWinner, player1Score, player2Score} = useGameContext();
    const [roundWinner, setRoundWinner] = useState<null|string>(null);
    const [showHistory, setShowHistory] = useState(false);
    const {theme} = useAppThemeContext();

    const saveRound = (roundPoints: number) => {
        endRoundWithAWinner(roundWinner as string, roundPoints as number);
        setRoundWinner(null);
    }

    const draw = () => {
        endRoundWithADraw();
        setRoundWinner(null);
    }

    return (
        <Container>

            <Box display="flex" gap="15px" alignItems="center">
                <Paper elevation={0} sx={{display: "flex", padding: "10px", backgroundColor: theme.palette.mode === PaletteMode.dark ? "#243647" : "grey.300"}} >
                    <ArrowForwardIcon/>
                </Paper>
                <Box flexGrow="1">
                    <Typography fontWeight="500">Premier joueur</Typography>
                    <Box fontSize={theme => theme.typography.fontSize} color={theme => theme.palette.grey[theme.palette.mode === PaletteMode.dark ? 500 : 600]}>{currentPlayer}</Box>
                </Box>
                <Box alignSelf="start">
                    <IconButton onClick={() => setShowHistory(!showHistory)}><HistoryIcon/></IconButton>
                </Box>
            </Box>

            <Typography variant="h6" mt={3}>Score</Typography>

            <Box display="flex" gap="10px" alignItems="stretch" mt="5px">
                <Paper
                    elevation={0}
                    sx={{textAlign: "center", padding: "5px 10px 10px 10px", width: "100%", border: theme.palette.mode === PaletteMode.dark ? '1px #344D65 solid' : '1px #D0DBE7 solid'}}
                >
                    <div><Typography fontSize="xx-large" fontWeight="600" color={theme => theme.palette.primary.main} data-testid="player1Score">{player1Score}</Typography></div>
                    <Typography fontSize={theme => theme.typography.fontSize}>{player1Name}</Typography>
                </Paper>

                <Paper
                    elevation={0}
                    sx={{textAlign: "center", padding: "5px 10px 10px 10px", width: "100%", border: theme.palette.mode === PaletteMode.dark ? '1px #344D65 solid' : '1px #D0DBE7 solid'}}
                >
                    <div><Typography fontSize="xx-large" fontWeight="600" color={theme => theme.palette.primary.main} data-testid="player2Score">{player2Score}</Typography></div>
                    <Typography fontSize={theme => theme.typography.fontSize}>{player2Name}</Typography>
                </Paper>
            </Box>

            <Box mt={3}>
                <Typography variant="h6">Qui a gagné cette manche ?</Typography>

                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Button variant="contained" size="large" color={roundWinner === null ? 'primary' : roundWinner === player1Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player1Name)}>{player1Name}</Button>
                    <Button variant="contained" size="large" color={roundWinner === null ? 'primary' : roundWinner === player2Name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player2Name)}>{player2Name}</Button>
                    <Button variant="contained" size="large" color="inherit" onClick={draw}>Egalité</Button>
                </Box>
            </Box>

            {roundWinner !== null &&
                <RoundScoreDialog
                    close={() => setRoundWinner(null)} roundWinner={roundWinner || ''}
                    saveWinnerScore={saveRound}
                />
            }

            <HistoryModal
                open={showHistory}
                close={() => setShowHistory(false)}
            />
        </Container>
    );
}
