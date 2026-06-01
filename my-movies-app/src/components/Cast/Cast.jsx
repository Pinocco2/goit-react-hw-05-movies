import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/tmdbApi';
import styles from './Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (err) {
        setError('Failed to load cast information.');
        console.error(err);
      }
    };
    getCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>We don't have any information about the cast for this movie.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.castItem}>
          <img
            src={profile_path ? `https://image.tmdb.org/t/p/w200${profile_path}` : 'https://via.placeholder.com/100x150?text=No+Photo'}
            alt={name}
            className={styles.avatar}
          />
          <div className={styles.meta}>
            <p className={styles.name}>{name}</p>
            <p className={styles.character}>Character: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Cast;