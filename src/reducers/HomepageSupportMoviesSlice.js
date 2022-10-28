import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetPopular, apiGetUpcoming } from '../api';

const initialState = {
  status: 'idle',
  popularMovies: [],
  upcomingMovies: []
}

export const getPopularMoviesAsync = createAsyncThunk(
  'homepageMovies/popularMovies',
  async () => {
    const response = await apiGetPopular()
    const data = response.data.results
    return data
  }
)

export const getUpcomingMoviesAsync = createAsyncThunk(
  'homepageMovies/upcomingMovies',
  async () => {
    const response = await apiGetUpcoming()
    const data = response.data.results
    return data
  }
)

const HomepageSupportMoviesSlice = createSlice({
  name: 'homepageSupportMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMoviesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getPopularMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.popularMovies = action.payload
      })

      .addCase(getUpcomingMoviesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUpcomingMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.upcomingMovies = action.payload
      })
  }
});

export const {} = HomepageSupportMoviesSlice.actions

export const selectHomepageMovies = (state) => {
  return state.homepageSupport
}

export default HomepageSupportMoviesSlice.reducer