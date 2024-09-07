import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import RoundsHistory from "./RoundsHistory";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";
import {useGameContext} from "../contexts/gameContext";
import Box from "@mui/material/Box";

export default function GameOver() {
    const {rounds, player1Name, player2Name} = useGameContext();

    const lastRound = rounds[rounds.length - 1];
    const winnerName = lastRound.player1Score > lastRound.player2Score ? player1Name : player2Name;
    const winnerScore = Math.max(lastRound.player1Score, lastRound.player2Score);
    const looserScore = Math.min(lastRound.player1Score, lastRound.player2Score);

    function createAsciiTable(data: any) {
        const headers = Object.keys(data[0]);

        const columnWidths = headers.map((header) =>
            Math.max(
                ...data.map((row: any) => row[header].toString().length),
                header.length,
            ),
        );

        const divider =
            "+" +
            headers.map((_, i) => "-".repeat(columnWidths[i] + 2)).join("+") +
            "+";

        const rows = data.map(
            (row: any) =>
                "|" +
                headers
                    .map(
                        (header, i) => ` ${row[header].toString().padEnd(columnWidths[i])} `,
                    )
                    .join("|") +
                "|",
        );

        return [divider, ...rows, divider].join("\n");
    }

    const copyGameHistoryToClipboard = () => {
        const table = [["Manche", player1Name, player2Name]];
        rounds.forEach((round, index) => {
            // @ts-ignore
            table.push([index + 1, round.player1Score, round.player2Score]);
        });

        const asciiTable = createAsciiTable(table);

        const type = "text/html";
        const blobText = new Blob([asciiTable], { type: "text/plain" });
        const blobHtml = new Blob([`:tada: ${winnerName} a gagné ${winnerScore} - ${looserScore} au crokinole\n<pre>${asciiTable}</pre>`], { type });
        const data = [
            new ClipboardItem({
                "text/plain": blobText,
                [type]: blobHtml
            })
        ];
        navigator.clipboard.write(data);
    }

    return (
        <Container sx={{textAlign: "center"}}>
            <Typography variant="h5" mb={4} color="success.main">
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                    <CelebrationIcon/>
                    {winnerName} a gagné {winnerScore} - {looserScore}
                </Stack>
            </Typography>

            <Box display="flex" gap="10px" justifyContent="center">
                <Button variant="contained" size="large" onClick={() => window.location.reload()}>Rejouer</Button>
                <Button variant="text" size="large" onClick={copyGameHistoryToClipboard}>Partager</Button>
            </Box>

            <Typography variant="h6" mt={5}>Historique</Typography>

            <TableContainer sx={{marginTop: 2, marginBottom: 2}}>
                <RoundsHistory rounds={rounds} player1Name={player1Name} player2Name={player2Name}/>
            </TableContainer>
        </Container>
    );
}
