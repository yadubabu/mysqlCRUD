const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mohini",
  database: "cruddatabase",
});

app.get("/", (req, res) => {
  const sqlInsert = "SELECT * FROM cruddatabase.movie_reviews;";
  db.query(sqlInsert, (err, result) => {
    res.json(result);
  });
});

app.post("/sendmovie", (req, res) => {
  const { movieName, movieReview } = req.body;
  const sqlPost =
    "INSERT INTO cruddatabase.movie_reviews (movieName,movieReview) VALUES(?,?);";
  db.query(sqlPost, [movieName, movieReview], (err, result) => {
    res.send("Movie Inserted Successfully");
  });
});

app.delete("/deletemovie/:id", (req, res) => {
  const sqldel = "DELETE FROM cruddatabase.movie_reviews WHERE id=?";
  db.query(sqldel, [req.params.id], (err, result) => {
    console.log("Delete successfully");
  });
});

app.put("/updatemovie/:id", (req, res) => {
  const { movieName, movieReview } = req.body;
  const sqledit =
    "UPDATE cruddatabase.movie_reviews SET movieName=?,movieReview=? WHERE id=?;";
  db.query(sqledit, [movieName, movieReview, req.params.id], (err, result) => {
    console.log("Updated successfully" + result);
  });
});

app.listen(3300, () => console.log("Server Run on the Port 3300"));
