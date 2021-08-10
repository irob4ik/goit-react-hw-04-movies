import { useState, useEffect } from 'react';
import {
  useParams,
  useHistory,
  Route,
  NavLink,
  // Link,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import * as SearchApi from '../services/SearchApi';
import CastView from './CastView';
import ReviewView from './ReviewView';
import styles from '../components/MovieDetails/movieDetails.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsView() {
  const location = useLocation();
  const { url } = useRouteMatch();
  const { moviesId } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [genres, setGenres] = useState('');

  console.log(location)
  console.log(history)

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/movies');
  };

  useEffect(() => {
    SearchApi.fetchMovieById(moviesId).then(data => {
      setMovie(data);
      setUserScore(data.vote_average * 10);
      const getGenres = data.genres.map(genre => genre.name);
      setGenres(getGenres.join(' '));
    });
  }, [moviesId]);

  return (
    <>
      <button
        type="button"
        onClick={onGoBack}
        className={styles.Btn}
      >
        Go Back
      </button>

      {movie && (
        <>
          <div className={styles.movieContainer}>
            <img
              src={`${IMAGE_URL}${movie.backdrop_path}`}
              alt={movie.title ? movie.title : movie.name}
              className={styles.detailsImg}
            />
            <div className={styles.detailsContainer}>
              <h1>{movie.title ? movie.title : movie.name}</h1>
              <p>{`User score: ${userScore}%`}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{`${genres}`}</p>
            </div>
          </div>
        </>
      )}
      <nav className={styles.infoContainer}>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location?.state?.from },
          }}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Casts
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: { from: location?.state?.from },
          }}
          className={styles.link}
          activeClassName={styles.activeLink}
        >
          Reviews
        </NavLink>
      </nav>

      <Route path="/movies/:moviesId/cast">
        <CastView />
      </Route>

      <Route path="/movies/:moviesId/reviews">
        <ReviewView />
      </Route>
    </>
  );
}
