import React from 'react'
import { AiOutlineArrowRight, AiFillStar } from 'react-icons/ai'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper'
// import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

import './CardList.scss'
import MovieCard from '../MovieCard/MovieCard';

export default function CardList({ header, movies, cardOnClick, additionalHeader }) {
  return (
    <div className='card-list'>
      <div className='container'>
        <div className='card-list-header'>
          <h2>{header}</h2>
          <a><span>See all movies</span> {<AiOutlineArrowRight />}</a>
        </div>
        {
          additionalHeader &&
          additionalHeader
        }
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          // In case navigation needed, uncomment lines below! -sae
          // navigation={true}
          // modules={[Navigation]}
          loop={true}
          className="movie-swiper"
        >
          {
            movies.map(movie => {
              return (
                <SwiperSlide key={movie.id} className='movie-image-slide'>
                  <MovieCard movie={movie} cardOnClick={cardOnClick} />
                </SwiperSlide>
              )
            })
          }          
        </Swiper>
      </div>
    </div>
  )
}
