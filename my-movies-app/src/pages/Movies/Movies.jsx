import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/tmdbApi';
import { MovieList } from '../../components/MovieList/MovieList';
import styles from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setError(null);
        const results = await fetchMoviesByQuery(query);
        setMovies(results);
      } catch (err) {
        setError('Something went wrong during search.');
        console.error(err);
      }
    };
    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchVal = form.elements.search.value.trim();
    
    if (searchVal === '') {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: searchVal });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 ? <MovieList movies={movies} /> : query && !error && <p>No movies found.</p>}
    </div>
  );
};

export default Movies;