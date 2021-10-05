import { useEffect, useState } from 'react';
import { fetch } from './mock';

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
      {Genres.map((item) => {
        return <GenreSingle key={item} genre={item} />;
      })}
    </fieldset>
  );
}

function loadData(setStateCallback) {
  fetch('https://imdb-api.com/en/API/Top250Movies/k_h4d6gr2w')
    .then((data) => data.json())
    .then((data) => {
      data.items.forEach((item, x) => {
        fetch('https://imdb-api.com/en/API/Title/k_h4d6gr2w/' + item.id)
          .then((data) => data.json())
          .then((data) => {
            setStateCallback((prevMovies) =>
              prevMovies.map((movie, mIndex) => {
                if (mIndex !== x) return movie;
                return {
                  ...movie,
                  directors: data.directors,
                  stars: data.stars,
                  genres: data.genres,
                  plot: data.plot,
                };
              })
            );
          });
      });
      setStateCallback(data.items);
    })
    .catch((err) => console.log("counldn't fetch data...error: " + err));
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
