import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetMovieDetails } from '../../api'
import CustomHeader from '../../components/CustomHeader/CustomHeader'

export default function MovieDetails() {
  const [movie, setMovie] = useState({})
  const { movieID } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const detailResponse = await apiGetMovieDetails(movieID);
      const data = detailResponse.data
      setMovie(data)
    }
    fetchData()
  }, [])

  return (
    <>
      <CustomHeader movie={movie} detailed />
    </>
  )
}
