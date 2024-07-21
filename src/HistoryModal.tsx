import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import RoundsHistory from "./components/RoundsHistory";
import Box from "@mui/material/Box";
import React from "react";
import {useGameContext} from "./contexts/gameContext";
import Modal from '@mui/material/Modal';

export interface SimpleDialogProps {
    open: boolean;
    close: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const HistoryModal = (props: SimpleDialogProps) => {
    const {player1Name, player2Name, rounds} = useGameContext();
    const { close, open } = props;

    return (
        <Modal onClose={close} open={open}>
            <Box sx={style}>
                <Typography variant="h6" textAlign="center">Historique</Typography>
                <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                    <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name} />
                </TableContainer>
            </Box>
        </Modal>
    )
};

export default HistoryModal;
