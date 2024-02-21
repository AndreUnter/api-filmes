import { useState, useEffect } from "react";
import * as React from 'react';

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const moviesURL =
  "https://api.themoviedb.org/3/discover/movie?api_key=de5d55f69d4b40810f1a29827da26318";
const Search = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const image = "https://image.tmdb.org/t/p/w500";

  const getTopMovies = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovies(data.results as IMovie[]);
  };

  useEffect(() => {
    const topUrl = moviesURL;
    getTopMovies(topUrl);
  }, []);

  const [busca, setBusca] = useState("");

  const movieFilter = movies.filter((movie) => movie.title.toLowerCase().includes(busca.toLowerCase()))
    
  return (
    <div className="App">
      <h1>API Filmes</h1>
      <input
        type="text"
        id="inputStyle"
        placeholder="Digite o nome do filme:"
        value={busca}
        onChange={(ev) => setBusca(ev.target.value)}
      />
      <div>
        <ul>
          {movieFilter.map((movie) => {
            return (
              <li key={movie.id}>
                <a href="">
                  <img src={`${image}${movie.poster_path}`} alt={movie.title} />
                </a>
                <span>{movie.title}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Search;
