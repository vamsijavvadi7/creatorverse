import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/global.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8e24aa', // Purple
    },
    secondary: {
      main: '#ffffff', // White for secondary actions
    },
    background: {
      default: '#000000', // Black background
      paper: '#222222', // Darker grey for card background
    },
    text: {
      primary: '#ffffff', // White text for primary
      secondary: '#e0e0e0', // Light grey text for secondary
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4, // Rounded corners for buttons
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
