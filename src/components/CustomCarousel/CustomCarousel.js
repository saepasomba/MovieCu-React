import React from 'react';

import { Carousel } from 'antd';

import './CustomCarousel.scss';
import 'antd/dist/antd.css';
import CustomHeader from '../CustomHeader/CustomHeader';


export default function CustomCarousel({ movies }) {
  console.log(movies)
  return (
    <div className='carousel'>
      <Carousel autoplay>
        {
          movies.map(movie => {
            return (
              <CustomHeader movie={movie} />
            )
          })
        }
      </Carousel>
    </div>
  )
}
