import axios from "axios";
import { Show } from "../models/Show";

const API_URL =
    "http://localhost:8080/movie-ticket-booking/api/shows";

const TOKEN_KEY = "movie-ticket-booking";

const ShowService = {

  getShowsByMovieId: (movieId: string) => {
    const token = localStorage.getItem(TOKEN_KEY);

    console.log("FETCHING SHOWS USING CORRECT BACKEND ROUTE");

    return axios.get<Show[]>(
        `${API_URL}/movies/${movieId}`, // 🌟 FIXED: Changed /movie/ to /movies/ to match your Java @GetMapping
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
},

    addShow: (show: any) => {

        const token = localStorage.getItem(TOKEN_KEY);

        return axios.post(
            API_URL,
            show,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
    }

};

export default ShowService;