import React from 'react'
import { AiOutlineArrowRight, AiFillStar } from 'react-icons/ai'
// import Swiper JS
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper'
// import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

import './CardList.scss'

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
                </SwiperSlide>
              )
            })
          }          
        </Swiper>
      </div>
    </div>
  )
}
