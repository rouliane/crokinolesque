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
import {Player} from "../hooks/useGame";

type Props = {
    notifyNextFirstPlayer: () => void;
}

export default function Ongoing({notifyNextFirstPlayer}: Props) {
    const {currentPlayer, players, endRoundWithADraw, endRoundWithAWinner} = useGameContext();
    const [roundWinner, setRoundWinner] = useState<null|string>(null);
    const [showHistory, setShowHistory] = useState(false);
    const {theme} = useAppThemeContext();

    const saveRound = (roundPoints: number) => {
        const winnerScore = endRoundWithAWinner(roundWinner as string, roundPoints as number);
        setRoundWinner(null);
        winnerScore < 100 && notifyNextFirstPlayer();
    }

    const draw = () => {
        endRoundWithADraw();
        setRoundWinner(null);
        notifyNextFirstPlayer();
    }

    return (
        <Container>

            <Box display="flex" gap="15px" alignItems="center">
                <Paper elevation={0} sx={{display: "flex", padding: "10px", backgroundColor: theme.palette.mode === PaletteMode.dark ? "#243647" : "grey.300"}} >
                    <ArrowForwardIcon/>
                </Paper>
                <Box>
                    <Typography fontWeight="500">Premier joueur</Typography>
                    <Box fontSize={theme => theme.typography.fontSize} color={theme => theme.palette.grey[theme.palette.mode === PaletteMode.dark ? 500 : 600]}>{currentPlayer}</Box>
                </Box>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                <Typography variant="h6">Score</Typography>
                <Box alignSelf="start">
                    <IconButton onClick={() => setShowHistory(!showHistory)} sx={{paddingRight: "0px"}}>
                        <HistoryIcon/>
                    </IconButton>
                </Box>
            </Box>

            <Box display="flex" gap="10px" alignItems="stretch" mt="5px">
                {Object.values(players).map((player: Player) => (
                    <Paper
                        key={`player-score-${player.name}`}
                        elevation={0}
                        sx={{textAlign: "center", padding: "5px 10px 10px 10px", width: "100%", border: theme.palette.mode === PaletteMode.dark ? '1px #344D65 solid' : '1px #D0DBE7 solid'}}
                    >
                        <div><Typography fontSize="xx-large" fontWeight="600" sx={{color: theme.palette.primary.main}} data-testid={`${player.name.toLowerCase().replace(' ', '')}Score`}>{player.score}</Typography></div>
                        <Typography fontSize={theme => theme.typography.fontSize}>{player.name}</Typography>
                    </Paper>
                ))}
            </Box>

            <Box mt={2}>
                <Typography variant="h6">Qui a gagné cette manche ?</Typography>

                <Box display="flex" justifyContent="space-between" gap={2} mt={1} flexDirection={Object.keys(players).length === 4 ? 'column' : 'row'}>
                    {Object.values(players).map((player: Player) => (
                        <Button key={`button-score-${player.name}`} variant="contained" size="medium" color={roundWinner === null ? 'primary' : roundWinner === player.name ? 'success' : 'inherit'} onClick={() => setRoundWinner(player.name)}>{player.name}</Button>
                    ))}
                    <Button variant="outlined" size="large" color="inherit" onClick={draw}>Egalité</Button>
                </Box>
            </Box>

            {roundWinner !== null &&
                <RoundScoreDialog
                    close={() => setRoundWinner(null)}
                    roundWinner={roundWinner || ''}
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
