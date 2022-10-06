import React, { useState } from 'react'
import './CastCard.scss'

import noImage from '../../no-image.svg.png'
import loadingGif from '../../loading.gif'

export default function CastCard({ src }) {

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
    <div className='cast-img'>
      { !imageLoaded &&
        <img className='loading-spinner' src={loadingGif} alt='loading spinner' />
      }
      <img className={`${imageLoaded ? 'loaded' : 'loading'} ${imageError}`} src={src} onError={handleError} alt='cast profile' onLoad={handleImageLoaded} />
    </div>
  )
}
