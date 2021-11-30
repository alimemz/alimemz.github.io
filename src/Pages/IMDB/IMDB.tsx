import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import SideMenu from './components/SideMenu';
import MovieCard, { Movie } from './components/MovieCard';
import mockFetch from '../../utility/mockFetch';
import imdb250 from './database/imdb100.json';
import Loading from '../../Gerenal Components/Loading';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export default function IMDB() {
  const [movie, setMovie] = useState<Movie[]>(null!); //Currently showing movies (considering filters)

  const allMovies = useRef<Movie[]>(null!); //All movies (regardless of filters)

  //   In fetched json data, all of the fields are string, whereas we need some of them in other formats (as in Movie type)
  //   this useEffect hook, calls the loadData() function to convert the catched json to Movie type and then sets the state and ref.
  useEffect(() => {
    loadData().then((result) => {
      allMovies.current = result;
      setMovie(result);
    });
  }, []);

  //   Calculate and memoize total range of movie's production year
  const getTotalYearRange = useMemo<[number, number]>(() => {
    return [
      Math.min.apply(
        null,
        allMovies.current?.map((item) => item.year)
      ),
      Math.max.apply(
        null,
        allMovies.current?.map((item) => item.year)
      ),
    ];
  }, [allMovies.current]);

  //   Render LOADING before data catch
  if (!movie)
    return (
      <>
        <Header />
        <BodyContainer>
          <SideMenu
            filterByGenre={(_) => {}}
            filterByKeyword={(_) => {}}
            filterByYear={(_) => {}}
            yearRange={[1900, 2020]}
            numberOfMovies={0}
          />
          <Loading widthInPixel={300} />
        </BodyContainer>
      </>
    );

  return (
    <>
      <Header />
      <BodyContainer>
        {/* Side menu, containing filter option, etc. */}
        <SideMenu
          filterByGenre={(genreList) => {
            setMovie(
              allMovies.current.filter((item) =>
                item.genres.some((genre) => genreList.includes(genre.toString()))
              )
            );
          }}
          filterByYear={(range) => {
            setMovie(allMovies.current.filter((item) => item.year >= range[0] && item.year <= range[1]));
          }}
          filterByKeyword={(text) => {
            const regexpText = new RegExp(text, 'img');
            setMovie(
              allMovies.current.filter(
                (item) =>
                  item.title.search(regexpText) > -1 ||
                  item.director.search(regexpText) > -1 ||
                  item.stars.search(regexpText) > -1
              )
            );
          }}
          yearRange={getTotalYearRange}
          numberOfMovies={movie.length}
        />

        {/* Movies list */}
        <MovieContainer>
          <div>
            {movie.map((item) => (
              <MovieCard movie={item}></MovieCard>
            ))}
          </div>
        </MovieContainer>
      </BodyContainer>
    </>
  );
}

async function loadData() {
  const res = await mockFetch<typeof imdb250>(imdb250);
  const jsonToMovie = res.items.map<Movie>((movie) => ({
    title: movie.title,
    year: +movie.year,
    rank: +movie.rank,
    director: movie.crew
      .split(',')
      .filter((item) => item.includes('dir.'))
      .toString()
      .trim()
      .slice(0, -7),
    image_url: movie.image,
    genres: movie.genres.split(',').map((item_1) => item_1.trim()),
    stars: movie.crew
      .split(',')
      .filter((item_2) => !item_2.includes('dir.'))
      .map((item_3) => item_3.trim())
      .join(', '),
    story: movie.plot,
  }));
  return jsonToMovie;
}

const MovieContainer = styled.div`
  display: 'block';
  flex-grow: 1;
  overflow-x: auto;
  margin-top: 5px;
  transform: rotateX(180deg);
  & > div {
    transform: rotateX(-180deg);
    min-width: fit-content;
  }
  &::-webkit-scrollbar {
    height: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #03396d;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #acaaaa;
    border-radius: 10px;
  }
`;
