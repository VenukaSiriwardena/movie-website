import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PopularPage from './pages/popular';
import MovieDetail from './pages/movieDetail';
import SearchResults from './pages/searchResults';
import Favourites from './pages/favourites';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;