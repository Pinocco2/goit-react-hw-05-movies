import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/tmdbApi';
import { MovieList } from '../../components/MovieList/MovieList';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError('Failed to fetch trending movies.');
        console.error(err);
      }
    };
    getTrending();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Trending today</h1>
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default Home;