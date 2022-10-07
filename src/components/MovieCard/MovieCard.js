import React, { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import './MovieCard.scss'
import noImage from '../../assets/no-image.svg.png'
import loadingGif from '../../assets/loading.gif'

export default function MovieCard({ movie, cardOnClick }) {

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState('')

  const handleImageLoaded = () => {
    setImageLoaded(true)
  }

  const handleError = (event) => {
    event.target.src = noImage
    setImageError('error-image')
  }

  return (
    <div className={`movie-image-card`} onClick={() => cardOnClick(movie.id)}>
      { !imageLoaded &&
        <img className='loading-spinner' src={loadingGif} alt='loading spinner' />
      }
      <img 
      className={`${imageLoaded ? 'loaded' : 'loading'} ${imageError}`} 
      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' 
      onLoad={handleImageLoaded} 
      onError={handleError} 
      />
      <div className='movie-card-details'>
        <p>{movie.title ? movie.title : movie.name}</p>
        <div className='card-movie-rating'>
          <AiFillStar className='star-icon' />
          <p>{movie.vote_average}/10</p>
        </div>
      </div>
    </div>
  )
}
