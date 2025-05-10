import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context to manage theme-related state and actions
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    // State to manage the current theme mode ('light' or 'dark')
    const [mode, setMode] = useState('light');

    // Function to toggle between light and dark modes
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Memoize the theme object to optimize performance
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode, // Set the palette mode based on the current state
                },
            }),
        [mode] // Recompute the theme only when the mode changes
    );

    return (
        // Provide the toggle function and current mode to the context
        <ThemeContext.Provider value={{ toggleColorMode, mode }}>
            {/* Apply the Material-UI theme and reset CSS styles */}
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children} {/* Render child components */}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;