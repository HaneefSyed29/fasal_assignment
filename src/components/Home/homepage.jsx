import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import MovieCard from "./Moviecard";
import SearchIcon from "../../assets/search.svg";
import "./Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import LikedMovies from "../LikedMovies/LikedMovies";

const API_URL = import.meta.env.VITE_API_URL;

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { logout } = useAuth0();

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const addMovieToList = (movie) => {
    if (movieList.some((m) => m.Title === movie.Title)) {
      toast.error("Movie already exists!");
    } else {
      setMovieList((prevMovieList) => [...prevMovieList, movie]);
      toast.success("Movie Added Successfully!");
    }
  };

  return (
    <div className="app">
      <div className="navbar">
        <Link to="/" className="navbar-title">
          <h1>MovieLand</h1>
        </Link>
        <div className="function">
          <Link to="/liked-movies">
            <button>
              <svg
                height="24px"
                width="24px"
                color="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
            </button>
          </Link>
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <svg
              width="24px"
              height="24px"
              color="white"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
            </svg>
          </button>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="search">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for movies"
                />
                <img
                  src={SearchIcon}
                  alt="search"
                  onClick={() => searchMovies(searchTerm)}
                />
              </div>

              {movies?.length > 0 ? (
                <div className="container">
                  {movies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      addMovieToList={addMovieToList}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2>No movies found</h2>
                </div>
              )}
            </>
          }
        />
        <Route
          path="/liked-movies"
          element={<LikedMovies movieList={movieList} />}
        />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default Homepage;
