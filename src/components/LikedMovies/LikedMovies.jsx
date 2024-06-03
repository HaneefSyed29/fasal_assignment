import React from "react";
import Card from "./Card";

const LikedMovies = ({ movieList }) => {
  return (
    <div className="container" style={{ display: "flex" }}>
      {movieList.length > 0 ? (
        movieList.map((movie) => <Card key={movie.imdbID} movie={movie} />)
      ) : (
        <div className="empty">
          <h2>No liked movies</h2>
        </div>
      )}
    </div>
  );
};

export default LikedMovies;
