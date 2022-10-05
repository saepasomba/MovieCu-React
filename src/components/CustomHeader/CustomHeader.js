import React from 'react'
import './CustomHeader.scss'
import { AiOutlinePlayCircle } from 'react-icons/ai';
import CustomButton from '../CustomButton/CustomButton'

export default function CustomHeader({ movie }) {
  return (
    <>
      <div key={movie.id} className='header-item'>
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='movie backdrop' />
        <div className='container container-carousel-details'>
          <div className='carousel-item-details'>
          <h1>{movie.title ? movie.title : movie.name}</h1>
          <p>{movie.overview}</p>
          <CustomButton icon={<AiOutlinePlayCircle />} text={'WATCH TRAILER'} />
          </div>
        </div>
      </div>
    </>
  )
}
