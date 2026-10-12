import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add these
import { Movie } from "../../models/Movie";
import MovieService from "../../service/MovieService";

export const MovieUpdate = () => {
    const { movieId } = useParams<{ movieId: string }>(); // Grab ID from URL
    const navigate = useNavigate(); // For redirecting after save
    const [updateFormData, setUpdateFormData] = useState<Movie | null>(null);

    // Fetch the movie data using the ID when the component loads
    useEffect(() => {
        if (movieId) {
            MovieService.getMovieById(movieId) // Make sure this service method exists
                .then((res) => setUpdateFormData(res.data))
                .catch((err) => console.error("Error fetching movie", err));
        }
    }, [movieId]);

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        if (!updateFormData) return;
        const { name, value } = e.target;
        setUpdateFormData((prev) => ({
            ...prev!,
            [name]: value
        }));
    };

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!updateFormData || !movieId) return;
        try {
            const cleanMoviePayload = {
                movieId: updateFormData.movieId,
                title: updateFormData.title,
                description: updateFormData.description,
                duration: updateFormData.duration,
                language: updateFormData.language,
                genre: updateFormData.genre,
                releaseDate: updateFormData.releaseDate,
                status: updateFormData.status,
                image_url: updateFormData.image_url
            };

            const response = await MovieService.updateMovie(
                movieId,
                cleanMoviePayload as any // Send the clean object
            );
            if (response.status === 200 || response.status === 204) {
                alert("Movie Details Updated Successfully");
                navigate("/movies"); // Go back to movies list
            } else {
                alert("Movie Details Update Failed");
            }
        } catch (error: any) {
            console.error("Movie update error:", error);
            alert("Movie Details Update Failed");
        }
    };

    if (!updateFormData) return <div>Loading movie details...</div>;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">

                {/* Header */}
                <div className="border-b px-6 py-4">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Edit Movie
                    </h2>

                    <p className="text-sm text-gray-500">
                        Update movie information.
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleOnSubmit}
                    className="p-6 space-y-5">

                    {/* Movie ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Movie ID
                        </label>
                        <input
                            type="text"
                            name="movieId"
                            value={updateFormData.movieId}
                            readOnly
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-500 outline-none" />
                    </div>

                    {/* Movie Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Movie Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={updateFormData.title}
                            onChange={handleOnChange}
                            placeholder="Enter movie title"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={updateFormData.description}
                            onChange={handleOnChange}
                            placeholder="Enter movie description"
                            rows={4}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none" />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration
                        </label>
                        <input
                            type="text"
                            name="duration"
                            value={updateFormData.duration}
                            onChange={handleOnChange}
                            placeholder="Example: 104 minutes"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Language
                        </label>
                        <input
                            type="text"
                            name="language"
                            value={updateFormData.language}
                            onChange={handleOnChange}
                            placeholder="Example: English"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Genre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Genre
                        </label>
                        <input
                            type="text"
                            name="genre"
                            value={updateFormData.genre}
                            onChange={handleOnChange}
                            placeholder="Example: Fantasy, Adventure, Action"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Release Date
                        </label>
                        <input
                            type="text"
                            name="releaseDate"
                            value={updateFormData.releaseDate}
                            onChange={handleOnChange}
                            placeholder="Example: 10/04/2026"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <select
                            name="status"
                            value={updateFormData.status}
                            onChange={handleOnChange}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none">
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

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            name="image_url"
                            value={updateFormData.image_url}
                            onChange={handleOnChange}
                            placeholder="Enter image URL"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(`/movies/${movieId}`)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-5 py-2 rounded-lg transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};