import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetGenre } from '../api';

const initialState = {
  status: 'idle',
  genres: []
}

export const getGenresAsync = createAsyncThunk(
  'genres/getGenres',
  async () => {
    const response = await apiGetGenre()
    const data = response.data.genres
    return data
  }
)

const GenreSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenresAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getGenresAsync.fulfilled, (state, action) => {
        console.log('genre fetched')
        state.status = 'idle'
        state.genres = action.payload
      })
  }
});

export const {} = GenreSlice.actions

export const selectGenres = (state) => {
  return state.genres.genres
}

export default GenreSlice.reducer