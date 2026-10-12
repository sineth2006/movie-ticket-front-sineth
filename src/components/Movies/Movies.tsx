import { useEffect, useState, useRef } from "react";
import MovieService from "../../service/MovieService";
import { Movie } from "../../models/Movie";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

export const Movies = () => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const genresList = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Animation"];
    const [isGenresOpen, setIsGenresOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get("q") || "";
    const { genreName } = useParams();
 const userRole = localStorage.getItem("USER_ROLE");
    
    useEffect(() => {
        const handleFetchData = async () => {
            try {
                setLoading(true);
                if (genreName) {
                    setSearchQuery(""); // Clear search field when browsing genres
                    const response = await MovieService.getMoviesByGenre(genreName);
                    setMovies(response.data);
                }
                // 2. SECOND: Check if the user typed something into the text search bar
                else if (urlQuery.trim()) {
                    setSearchQuery(urlQuery);
                    const response = await MovieService.searchMovies(urlQuery);
                    setMovies(response.data);
                }
                // 3. THIRD: Default fallback block if no filter is active
                else {
                    setSearchQuery("");
                    const response = await MovieService.getMovies();
                    setMovies(response.data);
                }
                setError("");
            } catch (error) {
                console.error("Failed to load movies data stack:", error);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        handleFetchData();
    }, [urlQuery, genreName]);

    // Handles form tracking execution safely when hitting enter key or icon triggers
    const handleSearchSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/movies");
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-gray-400 text-lg">
                    Loading movies...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-red-400">
                    {error}
                </p>
            </div>
        );

    }


    return (
        <div className="min-h-screen bg-[#101010] ">

            {/* Navbar */}
            <header className="bg-[#000000] shadow-md">
                <div className="max-w-7xl mx-auto px-3 py-3 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                        <button className="md:hidden text-white text-2xl">
                            ☰
                        </button>
                        <h1 className="text-xl font-bold text-[#596275]">
                            All Movies
                        </h1>
                    </div>

                    {/* 1. Added Search Bar Component */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="hidden md:flex flex-1 max-w-md relative"
                    >
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#262626] text-sm text-white placeholder-neutral-500 pl-10 pr-4 py-2 rounded-full border border-neutral-800 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                        />
                        <svg
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </form>


                    <nav className="hidden md:flex space-x-6 text-sm">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsGenresOpen(!isGenresOpen)}
                                className={`hover:text-green-400 focus:outline-none transition-colors ${isGenresOpen ? "text-green-400" : "text-white"
                                    }`}
                            >
                                Genres
                            </button>

                            {/* 4. Small Floating Box (Conditional Rendering) */}
                            {isGenresOpen && (
                                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-48 bg-[#262626] border border-neutral-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                                    <div className="grid grid-cols-1 gap-1 px-2">
                                        {genresList.map((genre) => (
                                            <a
                                                key={genre}
                                                href={`/genres/${genre.toLowerCase()}`}
                                                className="block px-3 py-2 text-sm text-neutral-300 hover:bg-[#333333] hover:text-green-400 rounded-md transition-colors"
                                                onClick={() => setIsGenresOpen(false)}
                                            >
                                                {genre}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                        <a href="/movies" className="hover:text-green-400 text-white">
                            Movies
                        </a>



                    </nav>

                </div>
            </header>

            {/* Movies */}
            <section className="px-6 py-12 max-w-7xl mx-auto">

                <h2 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3">
                    Movies

                </h2>


                {movies.length === 0 ? (

                    <div className="text-center py-20">
                        <p className="text-gray-400">
                            No movies available.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">

                       {userRole!== "ROLE_CUSTOMER" && (
                            <button
                                onClick={() => navigate("/add-movie")}
                                className="aspect-[3/4] bg-[#1c1c1c] rounded overflow-hidden shadow hover:shadow-lg hover:bg-[#252525] transition flex flex-col items-center justify-center border-2 border-dashed border-gray-600 hover:border-green-500 group"
                            >
                                <div className="text-5xl text-gray-500 group-hover:text-green-500 transition">+</div>
                                <span className="mt-3 text-sm font-semibold text-gray-400 group-hover:text-green-400">Add Movie</span>
                            </button>
                        )}
                        {movies.map((movie) => (

                            <div
                                key={movie.movieId}
                                className="relative group bg-[#1c1c1c] rounded overflow-hidden shadow hover:shadow-lg transition"
                            >
                                {/* Poster */}

                                <div className="md:w-[190px] h-[160px] md:h-[210px] bg-[#222] flex-shrink-0">

                                    <span className="text-5xl font-bold text-gray-600">
                                        <img
                                            src={movie.image_url}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    </span>
                                </div>


                                {/* Hover */}
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">

                                    <button
                                        onClick={() => navigate(`/movies/${movie.movieId}`)}
                                        className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700"
                                    >
                                        View Now
                                    </button>

                                </div>


                                {/* Movie information */}
                                <div className="p-3">

                                    <h3 className="text-sm font-semibold truncate text-white ">
                                        {movie.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {movie.duration} • {movie.language}
                                    </p>

                                    <p className="text-xs text-gray-500 truncate mt-1">
                                        {movie.genre}
                                    </p>

                                </div>


                                {/* Status */}
                                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                                    {movie.status}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* Footer */}
            <footer className="bg-[#1c1c1c] border-t border-gray-700 py-8 mt-10 text-center text-sm text-gray-400">

                <div className="max-w-6xl mx-auto px-4">

                    <p>
                        © 2026 CineSnap. All rights reserved.
                    </p>

                    <div className="mt-2 space-x-4">

                        <a
                            href="#"
                            className="hover:text-green-500"
                        >
                            Terms
                        </a>

                        <a
                            href="#"
                            className="hover:text-green-500"
                        >
                            Privacy
                        </a>

                        <a
                            href="#"
                            className="hover:text-green-500"
                        >
                            Help
                        </a>

                    </div>

                </div>

            </footer>

        </div>
    );
};