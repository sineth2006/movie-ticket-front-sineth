import axios from "axios";
import { Movie } from "../models/Movie";

const API_URL =
    "http://localhost:8080/movie-ticket-booking/api/movies";

const TOKEN_KEY = "movie-ticket-booking";

// GET ALL MOVIES
const getMovies = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log("MOVIE TOKEN:", token);

    return axios.get<Movie[]>(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

// GET MOVIE BY ID
const getMovieById = async (movieId: string) => {
    const token = localStorage.getItem(TOKEN_KEY);

    return axios.get<Movie>(
        `${API_URL}/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

// ADD MOVIE
const addMovie = async (movie: Movie) => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log("CURRENT TOKEN VALUE IN SERVICE:", token);
    console.log("MOVIE DATA:", movie);

    return axios.post<Movie>(
        API_URL,
        movie,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

// UPDATE MOVIE
const updateMovie = async (
    movieId: string,
    movie: Movie
) => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log("UPDATE MOVIE ID:", movieId);
    console.log("UPDATE MOVIE DATA:", movie);

    return axios.patch<Movie>(
        `${API_URL}/${movieId}`,
        movie,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
};

// DELETE MOVIE
const deleteMovie = async (movieId: string) => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log("DELETE MOVIE ID:", movieId);
    console.log("DELETE TOKEN:", token);

    return axios.delete(
        `${API_URL}/${movieId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

// SEARCH MOVIES
const searchMovies = (title: string) => {
    const token = localStorage.getItem(TOKEN_KEY);

    return axios.get<Movie[]>(
        `${API_URL}/search?title=${encodeURIComponent(title)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

// FILTER MOVIES BY GENRE
const getMoviesByGenre = (genre: string) => {
    const token = localStorage.getItem(TOKEN_KEY);

    return axios.get<Movie[]>(
        `${API_URL}/genre?name=${encodeURIComponent(genre)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export default {
    getMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies,
    getMoviesByGenre
};