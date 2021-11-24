import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../Gerenal Components/Header';
import SideMenu from './components/SideMenu';
import MovieCard, { Movie } from './components/MovieCard';
import mockFetch from '../../utility/mockFetch';
import imdb250 from './database/imdb100.json';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

export default function IMDB() {
  const [movie, setMovie] = useState<Movie[]>(null!); //Currently showing movies (considering filters)

  const allMovies = useRef<Movie[]>(null!); //All movies (regardless of filters)

  //   In fetched json data, all of the fields are string, whereas we need some of them in other formats (as in Movie type)
  //   this useEffect hook, convert the catched json to Movie type.
  useEffect(() => {
    mockFetch<typeof imdb250>(imdb250).then((res) => {
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
        genres: movie.genres.split(',').map((item) => item.trim()),
        stars: movie.crew
          .split(',')
          .filter((item) => !item.includes('dir.'))
          .map((item) => item.trim())
          .join(', '),
        story: movie.plot,
      }));
      allMovies.current = jsonToMovie;
      setMovie(jsonToMovie);
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
  if (!movie) return <p>Loading...</p>;
  return (
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
      <div style={{ display: 'block', flexGrow: 1 }}>
        {movie.map((item) => (
          <MovieCard movie={item}></MovieCard>
        ))}
      </div>
    </BodyContainer>
  );
}
