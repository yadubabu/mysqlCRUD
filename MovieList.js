import React from "react";
import "./movie.css";
import axios from "axios";

const MovieList = ({ movie, updateMovie }) => {
  const delMovie = async (id) => {
    await axios
      .delete(`http://localhost:3300/deletemovie/${id}`)
      .then(() => console.log("Movie Deleted successfully"))
      .catch((err) => console.log(err));
  };
  const editMovie = async (id) => {
    updateMovie(id);
  };
  return (
    <center>
      <div className="movieCard" key={movie.id}>
        <h2>{movie.movieName}</h2>
        <h3 style={{ margin: "10px" }}>{movie.movieReview}</h3>
        <button
          className="del"
          id={movie.id}
          onClick={(e) => delMovie(e.target.id)}
        >
          X
        </button>
        <button
          className="edit"
          id={movie.id}
          onClick={(e) => editMovie(e.target.id)}
        >
          Edit
        </button>
      </div>
    </center>
  );
};

export default MovieList;
