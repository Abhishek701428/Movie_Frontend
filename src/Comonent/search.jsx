import React, { useState } from 'react';
import axios from 'axios';
import Movie from './movie';

const SearchPage = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/movie/search', {
        params: { title: title || '', genre: genre || '' }
      });
      const moviesData = response.data.map(movie => ({
        title: movie.title,
        year: movie.year,
        synopsis: movie.synopsis,
        poster: movie.poster
      }));
      setMovies(moviesData);
      setError(null);  // Clear any previous error
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.');
    }
  };

  return (
    <div className="search-page">
      <h1 className="title">Movie Explorer</h1>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Search by genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="movie-list">
        {movies.map((movie, index) => (
          <Movie key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
