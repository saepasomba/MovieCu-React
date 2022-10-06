import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGetGenre, apiGetMovieByGenre, apiSearchMovie } from '../../api'
import CustomButton from '../../components/CustomButton/CustomButton'
import GenreList from '../../components/GenreList/GenreList'
import MovieCard from '../../components/MovieCard/MovieCard'
import './MovieSearch.scss'

export default function MovieSearch({ action }) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [genres, setGenres] = useState([])

  const { query } = useParams()
  const navigate = useNavigate()

  const navigateToDetails = (movieID) => {
    navigate(`/details/${movieID}`)
  }

  const genreButtonClicked = (genre) => {
    navigate(`/genre/${genre}`)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async() => {
      if (action === 'search') {
        const searchResponse = await apiSearchMovie(query)
        setMovies(searchResponse.data.results)
      } else if (action === 'genre') {
        const genreResponse = await apiGetMovieByGenre(query)
        setMovies(genreResponse.data.results)
        const genresResponse = await apiGetGenre()
        console.log('data', genresResponse.data)
        setGenres(genresResponse.data.genres)
      }
      setIsLoading(false)
    }
    fetchData()
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
