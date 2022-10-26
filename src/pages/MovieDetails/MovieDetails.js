import React, { useEffect, useState } from 'react'
import './MovieDetails.scss'
import { useParams } from 'react-router-dom'
import { apiGetCredits, apiGetMovieDetails } from '../../api'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import CastCard from '../../components/CastCard/CastCard'
import { useDispatch, useSelector } from 'react-redux'
import { getCastAsync, getMovieDetailAsync, selectDetailMovie, selectMovieCasts } from '../../reducers/MovieDetailSlice'

export default function MovieDetails() {
  // const [movie, setMovie] = useState({})
  // const [casts, setCasts] = useState([])
  const movie = useSelector(selectDetailMovie)
  const casts = useSelector(selectMovieCasts)
  const { movieID } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMovieDetailAsync(movieID))
    dispatch(getCastAsync(movieID))
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <CustomHeader movie={movie} detailed />
      <section className='cast'>
        <div className='container container-cast'>
          <h2>Casts</h2>
          <div className='cast-grid'>
            {
              casts.map(cast => {
                return (
                  <div className='cast-card' key={cast.id}>
                    <CastCard src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} />
                    <div className='card-detail'>
                      <p className='cast-name'>{cast.name}</p>
                      <p className='cast-character'>{cast.character}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}
