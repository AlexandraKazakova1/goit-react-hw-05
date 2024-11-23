import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';

const defaultImg =
  'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div>
      <Link to={backLink.current}>Go back</Link>
      <div>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
          width={250}
        />
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
