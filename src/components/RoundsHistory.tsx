import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Players, Round} from "../hooks/useGame";

type Props = {
    rounds: Round[];
    players: Players;
}

export default function RoundsHistory({ rounds, players }: Props) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell width={20} align="center">#</TableCell>
                    {Object.values(players).map((player, index) => (
                        <TableCell key={index} align="center" width={50}>
                            {player.name}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rounds.map((round, index) => (
                    <TableRow key={index} sx={index % 2 !== 0 ? { backgroundColor: 'action.hover' } : {}} data-testid="roundHistoryEntry">
                        <TableCell align="center">{index + 1}</TableCell>
                        {Object.values(players).map((player, index) => {
                            const playerName = player.name;
                            return (
                                <TableCell key={index} align="center" sx={{fontWeight : round.winner === playerName ? 'bold' : 'normal'}}>
                                    {round.scores[playerName]}
                                </TableCell>
                            )
                        })}
                        {/*<TableCell align="center" sx={{fontWeight : round.winner === player1Name ? 'bold' : 'normal'}}>*/}
                        {/*    {round.player1Score}*/}
                        {/*</TableCell>*/}
                        {/*<TableCell align="center" sx={{fontWeight : round.winner === player2Name ? 'bold' : 'normal'}}>*/}
                        {/*    {round.player2Score}*/}
                        {/*</TableCell>*/}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
