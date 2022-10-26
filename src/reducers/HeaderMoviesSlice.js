import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetTrending } from '../api';

const initialState = {
    value: [],
    status: 'idle'
}

export const getHeaderMoviesAsync = createAsyncThunk(
  'headerMovies/getHeaderMovies',
  async () => {
    const response = await apiGetTrending()
    const data = response.data.results.slice(0, 5)

    return data;
  }
);

const headerMoviesSlice = createSlice({
  name: 'headerMovies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHeaderMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHeaderMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
  }
});

export const {} = headerMoviesSlice.actions

export const selectHeaderMovies = (state) => {
  return state.headerMovies.value;
}

export default headerMoviesSlice.reducer