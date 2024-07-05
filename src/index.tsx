import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}> 
    <CssBaseline />
    <Game />
    </ThemeProvider>
  </React.StrictMode>
);