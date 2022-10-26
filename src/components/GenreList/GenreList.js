import React, { useEffect, useState } from 'react'
import './GenreList.scss'
import CustomButton from '../CustomButton/CustomButton'
import { apiGetGenre } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGenresAsync, selectGenres } from '../../reducers/GenreSlice'


export default function GenreList({ query }) {
  const dispatch = useDispatch()
  const genres = useSelector(selectGenres)

  const navigate = useNavigate()

  const genreButtonClicked = (genre) => {
    navigate(`/genre/${genre}`)
  }

  useEffect(() => {
    dispatch(getGenresAsync())
  }, [])

  return (
    <div className='genre-list'>
      { genres?.map(genre => {
          return (
          <div className='genre-btn' key={genre.id}>
              <CustomButton text={genre.name} type={genre.name.toLowerCase() === (query ? query : '').toLowerCase() ? 'btn-transparent' : ''} onClick={() => genreButtonClicked(genre.name.toLowerCase())} />
          </div>
          )
      })
    }
    </div>
  )
}
