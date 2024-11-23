import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const searchResults = await searchMovies(query);
      setMovies(searchResults.results);
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.target.elements.query.value);
        }}
      >
        <input name="query" type="text" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
