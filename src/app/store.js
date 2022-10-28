import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../reducers/AuthSlice';
import GenreReducer from '../reducers/GenreSlice';
import headerMoviesReducer from '../reducers/HeaderMoviesSlice';
import HomepageSupportMoviesReducer from '../reducers/HomepageSupportMoviesSlice';
import MovieDetailReducer from '../reducers/MovieDetailSlice';
import SearchMoviesReducer from '../reducers/SearchMoviesSlice';

export const store = configureStore({
  reducer: {
    headerMovies: headerMoviesReducer,
    movieDetail: MovieDetailReducer,
    homepageSupport: HomepageSupportMoviesReducer,
    searchmovies: SearchMoviesReducer,
    genres: GenreReducer,
    authInfo: AuthReducer
  },
});

