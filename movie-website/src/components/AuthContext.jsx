import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [user, favourites]);

  const login = (username, password) => {
    setUser({ username }); // simple login simulation
  };

  const signup = (username, password) => {
    setUser({ username }); // simple signup simulation
  };

  const logout = () => {
    setUser(null);
  };

  const addFavourite = (movie) => {
    if (!favourites.some((fav) => fav.id === movie.id)) {
      setFavourites([...favourites, movie]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((movie) => movie.id !== id));
  };

  const isFavourite = (id) => favourites.some((movie) => movie.id === id);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);