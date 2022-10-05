import React, { useEffect, useState } from 'react'

import { apiGetTrending } from '../../api'

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel'

export default function Homepage() {

  const [headerMovies, setHeaderMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let trendingResponse = await apiGetTrending()
      let cutTrending = trendingResponse.data.results.slice(0, 5)
      setHeaderMovies(cutTrending)
    }
    fetchData()
  }, [])

  return (
    <>
        <CustomCarousel movies={headerMovies} />
        <h1>Other sections</h1>
    </>
  )
}
