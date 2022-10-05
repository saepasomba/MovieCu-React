import axios from "axios";

const API_KEY = '?api_key=2fdf69f7bf168f2d95905be2974ae45f'
const API_URL = `https://api.themoviedb.org/3`


const axiosClient = axios.create({
    baseURL: API_URL
})

export const apiGetTrending = () => {
    return axiosClient.get(`/trending/all/day${API_KEY}`)
}