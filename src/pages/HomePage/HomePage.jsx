import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await getTrendingMovies();
      setMovies(trendingMovies.results);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
