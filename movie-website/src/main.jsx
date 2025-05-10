import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/themeContext';
import { SearchProvider } from './components/searchContext';
import { AuthProvider } from './components/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchProvider>
    </ThemeProvider>
  </React.StrictMode>
);