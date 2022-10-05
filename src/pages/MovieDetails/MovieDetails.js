import React, { useEffect, useState } from 'react'
import './MovieDetails.scss'
import { useParams } from 'react-router-dom'
import { apiGetCredits, apiGetMovieDetails } from '../../api'
import CustomHeader from '../../components/CustomHeader/CustomHeader'
import defaultImage from '../../no-image.svg.png'

export default function MovieDetails() {
  const [movie, setMovie] = useState({})
  const [casts, setCasts] = useState([])
  const { movieID } = useParams()

  const replaceImage = (event) => {
    event.target.src = defaultImage
  }

  useEffect(() => {
    const fetchData = async () => {
      const detailResponse = await apiGetMovieDetails(movieID);
      const detailData = detailResponse.data
      setMovie(detailData)

      const creditsResponse = await apiGetCredits(movieID);
      const creditsData = creditsResponse.data.cast.slice(0, 20);
      setCasts(creditsData)
    }
    fetchData()
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
                    <div className='cast-img'>
                      <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} onError={replaceImage} alt='cast profile' />
                    </div>
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
