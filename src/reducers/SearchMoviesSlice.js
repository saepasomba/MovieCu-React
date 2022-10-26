import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetMovieByGenre, apiSearchMovie } from '../api';

const initialState = {
  movies: [],
  isLoading: true
}

export const searchmovieAsync = createAsyncThunk(
  'searchMovies/searchMoviesByQuery',
  async (query) => {
    const response = await apiSearchMovie(query)
    const data = response.data.results
    return data
  }
)

export const searchmovieByGenreAsync = createAsyncThunk(
  'searchMovies/searchMoviesByGenre',
  async (query) => {
    const response = await apiGetMovieByGenre(query)
    const data = response.data.results
    return data
  }
)

const SearchMoviesSlice = createSlice({
  name: 'searchMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchmovieAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchmovieAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = action.payload
      })

      .addCase(searchmovieByGenreAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchmovieByGenreAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = action.payload
      })
  }
});

export const {} = SearchMoviesSlice.actions

export const selectSearchMovies = (state) => {
  return state.searchmovies
}

export default SearchMoviesSlice.reducer