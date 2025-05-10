import React, { createContext, useState } from 'react';

// Create a context for search functionality
export const SearchContext = createContext();

// Provider component to manage and share search state
export const SearchProvider = ({ children }) => {
    // State to store the last search query, initialized from localStorage
    const [lastSearch, setLastSearch] = useState(
        () => localStorage.getItem('lastSearch') || ''
    );

    // Function to update the search query and save it to localStorage
    const updateSearch = (query) => {
        localStorage.setItem('lastSearch', query);
        setLastSearch(query);
    };

    // Provide the search state and updater function to child components
    return (
        <SearchContext.Provider value={{ lastSearch, updateSearch }}>
            {children}
        </SearchContext.Provider>
    );
};