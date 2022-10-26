import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetCredits, apiGetMovieDetails } from '../api';

const initialState = {
  movie: {},
  casts: [],
  status: 'idle'
}

export const getMovieDetailAsync = createAsyncThunk(
  'movieDetail/getMovieDetail',
  async (movieID) => {
    const response = await apiGetMovieDetails(movieID)
    const data = response.data
    return data
  }
)

export const getCastAsync = createAsyncThunk(
  'movieDetail/getCasts',
  async (movieID) => {
    const response = await apiGetCredits(movieID)
    const data = response.data.cast.slice(0,20)
    return data
  }
)

const MovieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieDetailAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getMovieDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.movie = action.payload
      })

      .addCase(getCastAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCastAsync.fulfilled, (state, action) => {
        state.casts = action.payload
        state.status = 'idle'
      })
  }
});

export const {} = MovieDetailSlice.actions

export const selectDetailMovie = (state) => {
  return state.movieDetail.movie
}

export const selectMovieCasts = (state) => {
  return state.movieDetail.casts
}

export default MovieDetailSlice.reducer