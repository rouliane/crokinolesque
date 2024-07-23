import React, {ChangeEvent, useState} from "react";
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

type Props = {
    close: () => void;
    roundWinner: string;
    saveWinnerScore: (score: number) => void;
}

const RoundScoreDialog = ({close, roundWinner, saveWinnerScore}: Props) => {
    const [roundPoints, setRoundPoints] = useState<null | number>(null);

    const isRoundScoreValid = roundPoints !== null && roundPoints > 0 && roundPoints <= 240 && roundPoints % 5 === 0;

    const onClose = () => {
        setRoundPoints(null);
        close();
    }

    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRoundPoints(Number(event.target.value));
    }

    const validateRound = () => {
        setRoundPoints(null);
        saveWinnerScore(roundPoints as number);
        close();
    }

    const validateRoundWithEnterKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Enter" && isRoundScoreValid) {
            setRoundPoints(null);
            saveWinnerScore(roundPoints as number);
            close();
        }
    }

    return (
        <Dialog
            open={true}
            onClose={close}
            disableRestoreFocus={true}
        >
            <DialogTitle>Score de {roundWinner} ?</DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={input => input && input.focus()}
                    inputProps={{min: 0, max: 240, style: {textAlign: 'center', fontSize: '1.3rem'}}}
                    required
                    margin="dense"
                    name="score"
                    placeholder="Points"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => handleScoreChange(event)}
                    onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => validateRoundWithEnterKey(event)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Annuler</Button>
                <Button onClick={validateRound} disabled={!isRoundScoreValid}>Valider</Button>
            </DialogActions>
        </Dialog>
    );
}

export default RoundScoreDialog;
