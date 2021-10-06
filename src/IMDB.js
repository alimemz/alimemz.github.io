import { useEffect, useState } from 'react';
import { fetchLocal } from './mock';
import IMDB250 from './imdb250.json';

const Genres = [
  'Action',
  'Adventure',
  'Animnation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Music',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Short',
  'Sport',
  'Thriller',
  'War',
  'Western',
];

function GenreSingle(props) {
  const [isOn, setIsOn] = useState(true);

  function handleCheck() {
    setIsOn(!isOn);
  }

  return (
    <>
      <input
        type="checkbox"
        id={props.genre}
        checked={isOn}
        onChange={handleCheck}
      ></input>
      <label htmlFor={props.genre}>{props.genre}</label>
      <br></br>
    </>
  );
}

function GenreBox() {
  return (
    <fieldset className="genre-box">
      <legend style={{"font-weight": "700"}}>Genres</legend>
      {Genres.map((item) => {
        return <GenreSingle key={item} genre={item} />;
      })}
    </fieldset>
  );
}

function loadData(setStateCallback) {
  fetchLocal(JSON.stringify(IMDB250))
    .then((data) => data.json())
    .then((data) => {
      setStateCallback(
        data.items.map((v) => ({
          ...v,
          directors: v.crew.split(',').filter((c) => c.includes('dir.'))[0].slice(0,-6).trim(),
          stars: v.crew.split(',').filter((c)=>!c.includes('dir.')).toString().trim()
        }))
      );
    });
}

function MovieTable() {
  const [movies, setMovies] = useState([null]);
  useEffect(() => loadData(setMovies), []);

  if (movies[0] === null)
    return (
      <>
        <p>Loading</p>
      </>
    );
  else {
    return (
      <table className="movie-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Rate</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Stars</th>
            <th>Plot</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.rank}</td>
                <td>{item.title}</td>
                <td>{item.imDbRating}</td>
                <td>{item.year}</td>
                <td>{item.genres}</td>
                <td>{item.directors}</td>
                <td>{item.stars}</td>
                <td>---</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default function IMDB() {
  return (
    <div className="main-body">
      <GenreBox></GenreBox>
      <MovieTable></MovieTable>
    </div>
  );
}
