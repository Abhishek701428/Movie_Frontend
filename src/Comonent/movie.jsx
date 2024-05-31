import React from 'react';

const Movie = ({ title, year, synopsis, poster }) => (
  <div className="movie">
    <img src={poster} alt={`${title} Poster`} className="movie-poster" />
    <div className="movie-details">
      <h3 className="movie-title">{title}</h3>
      <p className="movie-year">{year}</p>
      <p className="movie-synopsis">{synopsis}</p>
    </div>
  </div>
);

export default Movie;
