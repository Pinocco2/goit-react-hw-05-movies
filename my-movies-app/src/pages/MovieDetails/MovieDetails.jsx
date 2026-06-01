import { useState, useEffect, Suspense } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdbApi';
import styles from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  
    const [backLink] = useState(() => location.state?.from ?? '/movies');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        setError('Movie details not found.');
        console.error(err);
      }
    };
    getDetails();
  }, [movieId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div>Loading...</div>;

  const { title, release_date, vote_average, overview, genres, poster_path } = movie;
  const userScore = Math.round(vote_average * 10);
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'Unknown';
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backBtn}>← Go back</Link>
      
      <div className={styles.movieCard}>
        <img src={posterUrl} alt={title} className={styles.poster} />
        <div className={styles.info}>
          <h2 className={styles.title}>{title} ({releaseYear})</h2>
          <p className={styles.score}>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p className={styles.overview}>{overview}</p>
          <h3>Genres</h3>
          <p className={styles.genres}>{genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={styles.additional}>
        <h4>Additional information</h4>
        <ul className={styles.linksList}>
          <li>
            <Link to="cast" className={styles.subLink}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" className={styles.subLink}>Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;