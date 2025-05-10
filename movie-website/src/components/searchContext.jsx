import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [lastSearch, setLastSearch] = useState(
    () => localStorage.getItem('lastSearch') || ''
  );

  const updateSearch = (query) => {
    localStorage.setItem('lastSearch', query);
    setLastSearch(query);
  };

  return (
    <SearchContext.Provider value={{ lastSearch, updateSearch }}>
      {children}
    </SearchContext.Provider>
  );
};