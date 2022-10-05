import axios from "axios";

const API_KEY = '?api_key=2fdf69f7bf168f2d95905be2974ae45f'
const API_URL = `https://api.themoviedb.org/3`


const axiosClient = axios.create({
    baseURL: API_URL
})

export const apiGetTrending = () => {
    return axiosClient.get(`/trending/all/day${API_KEY}`)
}

export const apiGetPopular = () => {
    return axiosClient.get(`/movie/popular${API_KEY}`)
}

export const apiGetUpcoming = () => {
    return axiosClient.get(`/movie/upcoming${API_KEY}`)
}

export const apiGetMovieDetails = (movieID) => {
    return axiosClient.get(`/movie/${movieID}${API_KEY}`)
}

export const apiSearchMovie = (query) => {
    return axiosClient.get(`/search/movie${API_KEY}&query=${query}`)
}