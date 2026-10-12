import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieService from "../../service/MovieService";
import logo from "../libs/Logo-RM.png";

export const AddMovie = () => {

    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        movieId: "",
        title: "",
        description: "",
        duration: "",
        language: "",
        genre: "",
        releaseDate: "",
        status: "NOW_SHOWING",
        image_url:"",
    });

    // Catch Input values
    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setMovie((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Reset form
    const handleReset = () => {
        setMovie({
            movieId: "",
            title: "",
            description: "",
            duration: "",
            language: "",
            genre: "",
            releaseDate: "",
            status: "NOW_SHOWING",
            image_url:"",
        });
    };

// Submit movie
const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {

        await MovieService.addMovie(movie);

        alert("Movie added successfully!");

        handleReset();

        navigate("/movies");

    } catch (error: any) {

        console.error("Error adding movie:", error);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        }

        alert("Failed to add movie!");

    }
};

    return (
        <>
            <div className="min-h-screen bg-bgPaper flex items-center justify-center py-10">

                {/* Add Movie Frame */}
                <div className="sm:mx-auto sm:w-full sm:max-w-2xl">

                    <div className="bg-[#c8d6e5] rounded-2xl border border-gray-200 shadow-2xl px-8 py-10">

                        {/* Logo */}
                        <img
                            alt="LOGO"
                            src={logo}
                            className="h-15 w-auto mx-auto"
                        />

                        {/* Title */}
                        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-blue-400">
                            Add Movie to CineSnap
                        </h2>

                        <div className="mt-8">

                            <form
                                className="space-y-5"
                                onSubmit={handleOnSubmit}
                            >

                                {/* Movie ID */}
                                <div>
                                    <label
                                        htmlFor="movieId"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Movie ID
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="movieId"
                                            name="movieId"
                                            type="text"
                                            value={movie.movieId}
                                            onChange={handleOnChange}
                                            placeholder="Example: M001"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Movie Title */}
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Movie Title
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={movie.title}
                                            onChange={handleOnChange}
                                            placeholder="Example: Jumanji"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Description
                                    </label>

                                    <div className="mt-2">
                                        <textarea
                                            id="description"
                                            name="description"
                                            value={movie.description}
                                            onChange={handleOnChange}
                                            placeholder="Enter movie description"
                                            rows={4}
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label
                                        htmlFor="duration"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Duration
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="duration"
                                            name="duration"
                                            type="text"
                                            value={movie.duration}
                                            onChange={handleOnChange}
                                            placeholder="Example: 104 minutes"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Language */}
                                <div>
                                    <label
                                        htmlFor="language"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Language
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="language"
                                            name="language"
                                            type="text"
                                            value={movie.language}
                                            onChange={handleOnChange}
                                            placeholder="Example: English"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Genre */}
                                <div>
                                    <label
                                        htmlFor="genre"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Genre
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="genre"
                                            name="genre"
                                            type="text"
                                            value={movie.genre}
                                            onChange={handleOnChange}
                                            placeholder="Example: Fantasy, Adventure, Action"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Release Date */}
                                <div>
                                    <label
                                        htmlFor="releaseDate"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Release Date
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="releaseDate"
                                            name="releaseDate"
                                            type="text"
                                            value={movie.releaseDate}
                                            onChange={handleOnChange}
                                            placeholder="Example: 10/04/2026"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Status
                                    </label>

                                    <div className="mt-2">
                                        <select
                                            id="status"
                                            name="status"
                                            value={movie.status}
                                            onChange={handleOnChange}
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        >
                                            <option value="NOW_SHOWING">
                                                NOW SHOWING
                                            </option>

                                            <option value="UPCOMMING">
                                                UPCOMMING
                                            </option>

                                            <option value="ENDED">
                                                ENDED
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                                            <div>
                                    <label
                                        htmlFor="image_url"
                                        className="block text-sm/6 font-medium text-blue-400"
                                    >
                                        Image URL
                                    </label>

                                    <div className="mt-2">
                                        <input
                                            id="image_url"
                                            name="image_url"
                                            type="text"
                                            value={movie.image_url}
                                            onChange={handleOnChange}
                                            placeholder="Example: URL"
                                            required
                                            className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="pt-3">

                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm/6 font-semibold text-white hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mb-4"
                                    >
                                        Add Movie
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm/6 font-semibold text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                    >
                                        Reset
                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};