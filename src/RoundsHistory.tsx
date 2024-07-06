import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Round } from "./Game";

type Props = {
    rounds: Round[];
    player1Name: string;
    player2Name: string;
}

export default function RoundsHistory({ rounds, player1Name, player2Name }: Props) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell width={20}>Manche</TableCell>
                    <TableCell align="center">{player1Name}</TableCell>
                    <TableCell align="center">{player2Name}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rounds.map((round, index) => (
                    <TableRow key={index} sx={index % 2 !== 0 ? { backgroundColor: 'action.hover' } : {}}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{round.player1.score}</TableCell>
                        <TableCell align="center">{round.player2.score}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}