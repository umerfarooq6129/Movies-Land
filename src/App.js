import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './svg/searchicon.png'
import MovieCard from './topics/MovieCard'
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=8ac5e7ae'


const App = () => {
  const [movies, setMovies] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const reponse = await fetch(`${API_URL}&s=${title}`);
    const data = await reponse.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('Spiderman')
  }, []);

  return (
    <>
      <div className="app">
        <h1>MoviesLand</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies"
          />
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />

        </div>

        {
          movies?.length > 0
            ? (
              <div className="container">
                {movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No Movies Found</h2>
              </div>
            )
        }
      </div>
    </>
  )
};

export default App
