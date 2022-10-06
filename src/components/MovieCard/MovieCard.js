import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import './MovieCard.scss'

export default function MovieCard({ movie, cardOnClick }) {
  return (
    <div className='movie-image-card' onClick={() => cardOnClick(movie.id)}>
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
}
