import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { apiGetUpcoming, apiGetPopular, apiGetTrending } from '../../api'
import CardList from '../../components/CardList/CardList'

import CustomCarousel from '../../components/CustomCarousel/CustomCarousel'
import GenreList from '../../components/GenreList/GenreList'

import { useSelector, useDispatch } from 'react-redux';
import { getHeaderMoviesAsync, selectHeaderMovies } from '../../reducers/HeaderMoviesSlice'
import { getPopularMoviesAsync, getUpcomingMoviesAsync, selectHomepageMovies } from '../../reducers/HomepageSupportMoviesSlice'


export default function Homepage() {
  const headerMovies = useSelector(selectHeaderMovies)
  const popularMovies = useSelector(selectHomepageMovies).popularMovies
  const upcomingMovies = useSelector(selectHomepageMovies).upcomingMovies

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToDetails = (movieID) => {
    navigate(`/details/${movieID}`)
  }

  useEffect(() => {
    dispatch(getHeaderMoviesAsync())
    dispatch(getPopularMoviesAsync())
    dispatch(getUpcomingMoviesAsync())
  }, [])

  return (
    <>
      <CustomCarousel movies={headerMovies} />
      <CardList header={'Popular Movies'} movies={popularMovies} cardOnClick={navigateToDetails} />
      <CardList header={'Genres'} movies={upcomingMovies} cardOnClick={navigateToDetails} additionalHeader={<GenreList />} />
    </>
  )
}
