import { Link } from 'react-router-dom';
import s from './MovieList.module.css';
const MovieList = ({ movies }) => {
  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li className={s.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
