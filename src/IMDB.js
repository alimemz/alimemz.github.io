import { useEffect, useState } from 'react';
import { fetchLocal } from './mock';
import IMDB250 from './imdb250.json';

const Genres = [
  'Select All',
  'Unselect All',
  'Action',
  'Adventure',
  'Animation',
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

function FilterCollapsed(props) {
  function handleFilterToggle() {
    props.handleFilterToggle();
  }
  return (
    <div className="filter-by">
      <span>{props.filterBy}</span>
      <button onClick={handleFilterToggle}>&#9776;</button>
    </div>
  );
}

//----------------------------GENRE COMPONENT-------------------------------
function GenreSingle(props) {
  function handleChange(e) {
    props.handleChange(e.target.value);
  }

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={props.genre}
        checked={
          props.genreStateArray[Genres.findIndex((x) => x === props.genre)]
        }
        value={props.genre}
        onChange={handleChange}
      ></input>
      <label htmlFor={props.genre}>{props.genre}</label>
      <br></br>
    </div>
  );
}

function GenreBox(props) {
  return (
    <fieldset
      className="genre-box"
      style={{ transform: `scaleY(${props.scaleY})`, position: props.position }}
    >
      {Genres.map((item) => {
        return (
          <GenreSingle
            key={item}
            genre={item}
            genreStateArray={props.genreStateArray}
            handleChange={props.handleChange}
          />
        );
      })}
    </fieldset>
  );
}

//----------------------------------KEYWORD FILTER COMPONENT--------------------------------
function SearchBox(props) {
  function handleChange(e) {
    props.handleChange(e.target.value);
  }

  const hint =
    'The search will be carried out only on <Title>,<Directors> and <Stars>';
  return (
    <div
      className="search-box"
      style={{ transform: `scaleY(${props.scaleY})`, position: props.position }}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        title={hint}
      ></input>
    </div>
  );
}

//---------------------------------YEAR FILTER COMPONENT------------------------------------
function YearBox(props) {
  function handleChange(e) {
    props.handleChange(e.target.value, e.target.className);
  }

  return (
    <div
      className="year-box"
      style={{ transform: `scaleY(${props.scaleY})`, position: props.position }}
    >
      <input
        className="slider1"
        type="range"
        min={props.minT}
        max={props.maxT}
        value={props.value1}
        onChange={handleChange}
      ></input>
      <input
        className="slider2"
        type="range"
        min={props.minT}
        max={props.maxT}
        value={props.value2}
        onChange={handleChange}
      ></input>
      <p>{`From ${Math.min(props.value1, props.value2)} to ${Math.max(
        props.value1,
        props.value2
      )}`}</p>
    </div>
  );
}

//---------------------------------MOVIE TABLE COMPONENT------------------------------------
function MovieTable(props) {
  const movies = props.movies;

  if (movies[0] === null)
    return (
      <>
        <p>Loading</p>
      </>
    );
  else {
    return (
      <table className="movie-table">
        <caption>{props.caption}</caption>
        <thead>
          <tr className="header-row">
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
                <td>
                  <a href={item.image}>
                    <img src={item.image} alt={'<image>'}></img>
                  </a>
                  <div className="movie-title">{item.title}</div>
                </td>
                <td>{item.imDbRating}</td>
                <td>{item.year}</td>
                <td>{item.genres}</td>
                <td>{item.directors}</td>
                <td>{item.stars}</td>
                <td>
                  <p id={`story-${item.id}`} style={{ opacity: '0' }}>
                    {item.plot}
                  </p>
                  <button
                    id={`btn-${item.id}`}
                    onMouseOver={props.showStory}
                    onMouseOut={props.hideStory}
                  >
                    show
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

//------------------------------------DATA LOADING FUNCTION------------------------
function loadData(setStateCallback) {
  let output;
  fetchLocal(JSON.stringify(IMDB250))
    .then((data) => data.json())
    .then((data) => {
      output = data.items.map((v) => ({
        ...v,
        directors: v.crew
          .split(',')
          .filter((c) => c.includes('dir.'))[0]
          .slice(0, -6)
          .trim(),
        stars: v.crew
          .split(',')
          .filter((c) => !c.includes('dir.'))
          .toString()
          .trim(),
      }));
      setStateCallback(output);
    });
}

//-------------------------------MAIN IMDB COMPONENT---------------------------------
export default function IMDB() {
  //-------HOOKS
  const [genres, setGenres] = useState(
    Array(Genres.length)
      .fill(true)
      .map((_, i) => (i === 1 ? false : true))
  );
  const [movies, setMovies] = useState([null]);
  const [genreToggle, setGenreToggle] = useState(false);
  const [keywordToggle, setKeywordToggle] = useState(false);
  const [Keyword, setKeyword] = useState('');
  const [yearToggle, setYearToggle] = useState(false);
  const [year, setYear] = useState([1000, 2021]);
  useEffect(() => loadData(setMovies), []);

  //-------AUXILARY VARIABLES
  let MAX = 2030,
    MIN = 1900;
  if (MAX === 2030 && movies[0] !== null) {
    const years = movies.map((item) => item.year);
    MAX = Math.max.apply(null, years);
    MIN = Math.min.apply(null, years);
  }
  if (movies[0] !== null && year[0] === 1000) setYear([MIN, MAX]);
  const startYear = Math.min(year[0], year[1]);
  const endYear = Math.max(year[0], year[1]);

  const word = new RegExp(Keyword, 'i');

  //-----------FILTER MOVIES BEFORE RENDER
  let selectedMovies = [];
  if (movies[0] !== null) {
    selectedMovies = movies.filter(
      (item) =>
        //filter genres
        item.genres
          .split(',')
          .every((g) => genres[Genres.findIndex((x) => x === g)]) &&
        //filter keywords
        (item.title.search(word) !== -1 ||
          item.directors.search(word) !== -1 ||
          item.stars.search(word) !== -1) &&
        //filter years
        item.year >= startYear &&
        item.year <= endYear
    );
  }

  //-------EVENT HANDLING FUNCTIONS
  function handleGenre(name) {
    if (name === 'Select All' && !genres[0]) {
      setGenres(genres.fill(true).map((_, i) => (i === 1 ? false : true)));
    } else if (name === 'Unselect All' && !genres[1]) {
      setGenres(genres.fill(false).map((_, i) => (i === 1 ? true : false)));
    } else {
      setGenres(
        genres.map((state, i) => {
          return i === 0
            ? false
            : i === 1
            ? false
            : Genres[i] === name
            ? !state
            : state;
        })
      );
    }
  }

  function handleSearch(text) {
    setKeyword(text);
  }

  function handleYear(value, sliderName) {
    if (sliderName === 'slider1') setYear([value, year[1]]);
    else {
      setYear([year[0], value]);
    }
  }

  function showStory(e) {
    const ID = e.target.id.slice(4);
    document.getElementById(`story-${ID}`).style.opacity = '1';
  }

  function hideStory(e) {
    const ID = e.target.id.slice(4);
    document.getElementById(`story-${ID}`).style.opacity = '0';
  }

  return (
    <div className="main-body">
      <div className="filter-box">
        <FilterCollapsed
          filterBy="Genre"
          handleFilterToggle={() => setGenreToggle(!genreToggle)}
        ></FilterCollapsed>
        <GenreBox
          handleChange={handleGenre}
          genreStateArray={genres}
          scaleY={genreToggle ? 1 : 0}
          position={genreToggle ? 'relative' : 'absolute'}
        ></GenreBox>

        <FilterCollapsed
          filterBy="Keyword"
          handleFilterToggle={() => setKeywordToggle(!keywordToggle)}
        ></FilterCollapsed>
        <SearchBox
          handleChange={handleSearch}
          scaleY={keywordToggle ? 1 : 0}
          position={keywordToggle ? 'relative' : 'absolute'}
        ></SearchBox>

        <FilterCollapsed
          filterBy="Year"
          handleFilterToggle={() => setYearToggle(!yearToggle)}
        ></FilterCollapsed>
        <YearBox
          handleChange={handleYear}
          minT={MIN}
          maxT={MAX}
          value1={year[0]}
          value2={year[1]}
          scaleY={yearToggle ? 1 : 0}
          position={yearToggle ? 'relative' : 'absolute'}
        ></YearBox>
      </div>
      <MovieTable
        movies={selectedMovies}
        caption={`Total Selected Movies: ${selectedMovies.length}`}
        showStory={showStory}
        hideStory={hideStory}
      ></MovieTable>
    </div>
  );
}
