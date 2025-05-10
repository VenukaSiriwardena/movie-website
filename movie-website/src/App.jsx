import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import PopularPage from './pages/popular';
import MovieDetail from './pages/movieDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;