import axios from "axios"
import { User } from "../models/User";
const baseUrl = "http://localhost:8080/movie-ticket-booking/api/auth";

const signUp = async (user: any) => {
    try {
        const response = await axios.post(
            `${baseUrl}/signup`,
            user
        );
        console.log("Token is: ",response.data.token)
        return response.data.token
    } catch (err) {
        console.error(err)
    }


}
const signIn = async (login: any) => {
    try {
        const response = await axios.post(
            `${baseUrl}/signin`,
            login
        );
        console.log("Token is: ", response.data.token)
        return response.data.token
    } catch (err) {
        console.error(err)
    }


}


export default { signUp, signIn }