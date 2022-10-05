import React from 'react';

import { Carousel } from 'antd';
import { AiOutlinePlayCircle } from 'react-icons/ai';

import './CustomCarousel.scss';
import 'antd/dist/antd.css';
import CustomButton from '../CustomButton/CustomButton';


export default function CustomCarousel({ movies }) {
  console.log(movies)
  return (
    <div className='carousel'>
      <Carousel autoplay>
        {
          movies.map(movie => {
            return (
              <div key={movie.id} className='carousel-item'>
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt='movie backdrop' />
                <div className='container container-carousel-details'>
                  <div className='carousel-item-details'>
                    <h1>{movie.title ? movie.title : movie.name}</h1>
                    <p>{movie.overview}</p>
                    <CustomButton icon={<AiOutlinePlayCircle />} text={'WATCH TRAILER'} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  )
}
