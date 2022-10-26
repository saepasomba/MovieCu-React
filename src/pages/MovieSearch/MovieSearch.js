import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGetMovieByGenre, apiSearchMovie } from '../../api'
import GenreList from '../../components/GenreList/GenreList'
import MovieCard from '../../components/MovieCard/MovieCard'
import { searchmovieAsync, searchmovieByGenreAsync, selectSearchMovies } from '../../reducers/SearchMoviesSlice'
import './MovieSearch.scss'

export default function MovieSearch({ action }) {
  const dispatch = useDispatch()
  const movies = useSelector(selectSearchMovies).movies
  const isLoading = useSelector(selectSearchMovies).isLoading

  const { query } = useParams()
  const navigate = useNavigate()

  const navigateToDetails = (movieID) => {
    navigate(`/details/${movieID}`)
  }

  useEffect(() => {
    if (action === 'search') {
      dispatch(searchmovieAsync(query))
    } else if (action === 'genre') {
      dispatch(searchmovieByGenreAsync(query))
    }
    window.scrollTo(0,0)
  }, [query])

  return (
    <div className='search-view'>
        <div className='container'>
          <h2>
            {
            action === 'search' ? 
            `Search result for "${query}"`
            :
            `Showing movies with "${query}" genre`
            }
          </h2>
          { action === 'genre' &&
            <GenreList query={query} />
          }
          {isLoading ? 
            <h1>Loading...</h1>
            :
            <div className='movies-grid'>
              {
                movies.map(movie => {
                  return (
                    <MovieCard movie={movie} cardOnClick={navigateToDetails} />
                  )
                })
              }
            </div>
          }

        </div>
    </div>
  )
}
