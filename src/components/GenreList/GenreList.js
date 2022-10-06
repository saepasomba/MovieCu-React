import React, { useEffect, useState } from 'react'
import './GenreList.scss'
import CustomButton from '../CustomButton/CustomButton'
import { apiGetGenre } from '../../api'
import { useNavigate } from 'react-router-dom'


export default function GenreList({ query }) {

const [genres, setGenres] = useState([])
  const navigate = useNavigate()

  const genreButtonClicked = (genre) => {
    navigate(`/genre/${genre}`)
  }

  useEffect(() => {
    const fetchData = async() => {
      const genresResponse = await apiGetGenre()
      setGenres(genresResponse.data.genres)

    }
    fetchData()
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
