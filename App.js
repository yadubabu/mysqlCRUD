import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import MovieList from "./components/MovieList";

function App() {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [movies, setMovies] = useState([]);
  const [upbtn, setUpBtn] = useState(false);
  const [key, setKey] = useState("");

  const subMovie = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3300/sendmovie", {
      movieName: name,
      movieReview: review,
    });
  };
  const getMovies = async () => {
    await axios
      .get("http://localhost:3300/")
      .then((data) => setMovies(data.data))
      .catch((err) => console.log(err));
  };
  const updateMovie = (id) => {
    const check = movies.filter((movie) => movie.id === parseInt(id));
    if (check) {
      setName(check[0].movieName);
      setReview(check[0].movieReview);
      setUpBtn(true);
      setKey(id);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const editMovie = async (id) => {
    await axios
      .put(`http://localhost:3300/updatemovie/${id}`, {
        movieName: name,
        movieReview: review,
      })
      .then(() => console.log("User updated successfully"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className="form">
        <label>MovieName:</label>
        <br />
        <input
          type="text"
          value={name}
          placeholder="Enter Movie Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Review:</label>
        <br />
        <input
          type="text"
          value={review}
          placeholder="Enter Moview Review"
          onChange={(e) => setReview(e.target.value)}
        />
        <br />
        <center>
          <button
            style={{
              color: "tomato",
              background: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={subMovie}
          >
            Add Movie Review
          </button>
          {upbtn ? (
            <button id={key} onClick={(e) => editMovie(e.target.id)}>
              Update
            </button>
          ) : (
            ""
          )}
        </center>
        {movies.map((movie) => (
          <div>
            <MovieList movie={movie} updateMovie={updateMovie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
