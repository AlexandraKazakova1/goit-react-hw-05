import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../services/api';

const defaultImg =
  'https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+photo';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                width="100"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
