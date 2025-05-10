# 🎥 Movie Website

A React-based movie discovery app powered by the **TMDB API**. Browse trending and popular movies, search by title or keyword, and manage your favourite picks — all with a clean, responsive UI.

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine:

1. **Clone the repository to your local machine**:
    ```bash
    git clone https://github.com/VenukaSiriwardena/movie-website
    ```

2. **Navigate to the project directory**:
    ```bash
    cd movie-website
    ```

3. **Install the required dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

---

## 🔐 API Setup (TMDB)

This project uses the [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) to fetch movie data.

### 🧾 Steps to Set Up the API:

1. **Create a TMDB account**:
   Go to [TMDB](https://www.themoviedb.org/) and create a free account.

2. **Generate an API key**:
   Navigate to your TMDB dashboard, create an app, and obtain your API key.

3. **Create a `.env` file in the root directory** and add your key:
    ```
    REACT_APP_TMDB_API_KEY=your_api_key_here
    ```

4. **Restart your development server** after saving the `.env` file.

---

## 📡 API Endpoints Used

| Description            | Method | Endpoint                                                              |
|------------------------|--------|-----------------------------------------------------------------------|
| Discover Movies        | GET    | `https://api.themoviedb.org/3/discover/movie`                         |
| Popular Movies         | GET    | `https://api.themoviedb.org/3/movie/popular`                          |
| Movie Details          | GET    | `https://api.themoviedb.org/3/movie/{movie_id}`                       |
| Search by Keyword      | GET    | `https://api.themoviedb.org/3/search/keyword?query=pirates&page=1`   |
| Trending Movies        | GET    | `https://api.themoviedb.org/3/trending/movie/{time_window}`          |

All requests use your API key from the `.env` file via Axios headers.

---

## 🎯 Features Implemented

- 🔍 **Movie Search**: Search movies by title using the TMDB API.
- 🔥 **Popular & Trending Movies**: View currently trending and popular movies.
- 🎞️ **Movie Details Page**: Detailed view of a selected movie including:
  - Title
  - Overview
  - Release date
  - Rating
  - Poster image
- ❤️ **Favourites**: Add movies to your favourites list (saved using React Context).
- 🔐 **Sign In / Sign Up UI**: Basic login and signup form layout (authentication not integrated).
- 📱 **Responsive Design**: Optimized for both desktop and mobile using MUI's responsive tools.
- 📁 **Reusable Components**: Includes `Navbar`, `Footer`, and `MovieCard` components.

---

## 🛠 Tech Stack

- **React + Vite**
- **React Router DOM**
- **Axios**
- **Material UI (MUI)**
- **React Context API**
- **TMDB API**

---

## 👨‍💻 Author

Built with ❤️ using React and TMDB API.