import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to provide authentication context to children components
export const AuthProvider = ({ children }) => {
    // State to store the current user
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    
    // State to store the list of favourite movies
    const [favourites, setFavourites] = useState(() => JSON.parse(localStorage.getItem('favourites')) || []);

    // Sync user and favourites state with localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [user, favourites]);

    // Function to log in a user
    const login = (username, password) => {
        setUser({ username });
    };

    // Function to sign up a user
    const signup = (username, password) => {
        setUser({ username });
    };

    // Function to log out the user
    const logout = () => {
        setUser(null);
    };

    // Function to add a movie to favourites
    const addFavourite = (movie) => {
        if (!favourites.some((fav) => fav.id === movie.id)) {
            setFavourites([...favourites, movie]);
        }
    };

    // Function to remove a movie from favourites
    const removeFavourite = (id) => {
        setFavourites(favourites.filter((movie) => movie.id !== id));
    };

    // Function to check if a movie is in favourites
    const isFavourite = (id) => favourites.some((movie) => movie.id === id);

    // Provide the context values to children components
    return (
        <AuthContext.Provider value={{ user, login, signup, logout, favourites, addFavourite, removeFavourite, isFavourite }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);