import React from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/css';

import './CardList.scss'

export default function CardList({ header, movies }) {
  return (
    <div className='card-list'>
      <div className='container'>
        <div className='card-list-header'>
          <h2>{header}</h2>
          <a>See all movies {<AiOutlineArrowRight />}</a>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="movie-swiper"
        >
          {
            movies.map(movie => {
              return (
                <SwiperSlide className='movie-image-card'>
                  <div className='movie-image-card'>
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie poster' />
                  </div>
                </SwiperSlide>
              )
            })
          }          
        </Swiper>
      </div>
    </div>
  )
}
