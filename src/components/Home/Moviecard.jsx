import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Moviecard = ({
  movie: { Year, Poster, Title, Type },
  addMovieToList,
}) => {
  const handleAddMovie = () => {
    addMovieToList({ Year, Poster, Title, Type });
  };

  return (
    <div className="movie">
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
        <button onClick={handleAddMovie}>Add to List</button>
      </div>
    </div>
  );
};

export default Moviecard;
