import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiFillStar } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { apiSearchMovie } from '../../api'
import CardList from '../../components/CardList/CardList'
import './MovieSearch.scss'

export default function MovieSearch() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { query } = useParams()
  const navigate = useNavigate()

  const navigateToDetails = (movieID) => {
    navigate(`/details/${movieID}`)
  }

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async() => {
      const searchResponse = await apiSearchMovie(query)
      setMovies(searchResponse.data.results)
      setIsLoading(false)
    }
    fetchData()
  }, [query])

  return (
    <div className='search-view'>
        <div className='container'>
          <h2>{`Search result for "${query}"`}</h2>
          {isLoading ? 
            <h1>Loading...</h1>
            :
            <div className='movies-grid'>
              {
                movies.map(movie => {
                  return (
                    <div className='movie-image-card' onClick={() => navigateToDetails(movie.id)}>
                      <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                      <div className='movie-card-details'>
                        <p>{movie.title ? movie.title : movie.name}</p>
                        <div className='card-movie-rating'>
                          <AiFillStar className='star-icon' />
                          <p>{movie.vote_average}/10</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          }

        </div>
    </div>
  )
}
