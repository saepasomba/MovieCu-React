import React, { useState } from 'react'
import './CustomHeader.scss'
import { AiOutlinePlayCircle } from 'react-icons/ai';
import CustomButton from '../CustomButton/CustomButton'

export default function CustomHeader({ movie, detailed }) {

  const [headerLoaded, setHeaderLoaded] = useState(false)

  const handleHeaderLoaded = (event) => {
    setHeaderLoaded(true)
  }

  return (
    <>
      <div key={movie.id} className='header-item'>
        { !headerLoaded &&
          <div className='secondary-backdrop'></div>
        }
        <img className={`${headerLoaded ? 'loaded' : 'loading'}`} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='movie backdrop' onLoad={handleHeaderLoaded} />
        <div className='container container-carousel-details'>
          <div className='carousel-item-details'>
          <h1>{movie.title ? movie.title : movie.name}</h1>
          {detailed &&
            <p>
              {
                movie?.genres?.map(genre => genre.name).join(', ')
              }
            </p>
          }
          <p>{movie.overview}</p>
          <a href={`https://www.youtube.com/results?search_query=${movie.title ? movie.title : movie.name} trailer`}><CustomButton icon={<AiOutlinePlayCircle />} text={'WATCH TRAILER'} /></a>
          </div>
        </div>
      </div>
    </>
  )
}
