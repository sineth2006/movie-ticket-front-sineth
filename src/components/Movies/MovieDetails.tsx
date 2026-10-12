import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieService from "../../service/MovieService";
import { Movie } from "../../models/Movie";
import { Show } from "../../models/Show";
import ShowService from "../../service/ShowService";

export const MovieDetails = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const [editOpen, setEditOpen] = useState(false);
    const [allShows, setAllShows] = useState<Show[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [ticketCount, setTicketCount] = useState<number>(1);
    const [selectedShow, setSelectedShow] = useState<Show | null>(null);
    const userRole = localStorage.getItem("USER_ROLE");

      const tzOffset = new Date().getTimezoneOffset() * 60000;
        const TodayStr = new Date(Date.now() - tzOffset).toISOString().split("T")[0]; 

    const handleConfirmTickets = () => {
        if (!selectedShow || !movie) return;

        setIsModalOpen(false);

        navigate(
            `/seats/${selectedShow.showId}?count=${ticketCount}&price=${selectedShow.ticketPrice}&movieName=${encodeURIComponent(movie.title)}`
        );
    };

    useEffect(() => {
        loadMovieAndShows();
    }, [movieId]);

const loadMovieAndShows = async () => {
    try {
        setLoading(true);
        setError("");

          

        // 1. Load movie details
        const movieResponse = await MovieService.getMovieById(movieId!);
        setMovie(movieResponse.data);

        // 2. Load shows using the corrected endpoint route
        try {
            const showsResponse = await ShowService.getShowsByMovieId(movieId!);
            
            // The backend returns only the scheduled shows for this specific movie!
            const targetedShows = showsResponse.data;
            setAllShows(targetedShows);

            // Set the first active tab date based on upcoming schedules
               const upcomingDates = Array.from(
                    new Set(targetedShows.map((s: Show) => s.showDate))
                )
                .filter((date: any) => date >= TodayStr) // ✅ FIXED: Case-matched variables
                .sort();

                if (upcomingDates.length > 0) {
                    setSelectedDate(upcomingDates[0] as string);///////////////////////////////////////
                } else if (targetedShows.length > 0) {
                    // Fallback to first available date if no future dates exist
                    setSelectedDate(targetedShows.map((s: Show) => s.showDate).sort()[0]);
                } else {
                    setSelectedDate(""); 
                }

        } catch (showError) {
            console.error("Failed to load shows from endpoint:", showError);
            setAllShows([]);
            setSelectedDate("");
        }

    } catch (error) {
        console.error("Failed to load movie information:", error);
        setError("Failed to load movie information");
    } finally {
        setLoading(false);
    }
};



    // ==========================================
    // DYNAMIC GROUPING & FILTERING DATA ENGINES
    // ==========================================


// 1. Get today's local date as a clean string (e.g., "2026-10-04")
// This creates a safe YYYY-MM-DD format using your system clock


    // 1. Generate unique sorted list of available screening dates
    const uniqueDates = Array.from(new Set( allShows
            // 🌟 CRITICAL FIX: Only keep shows if the date is equal to or greater than today
            .filter((s: any) => s.showDate >= TodayStr)
            .map((s: any) => s.showDate)
    )
).sort();

    // 2. Filter shows matching the user's active selected date tab
    const showsForSelectedDate = allShows.filter((s: any) => {
    // Show must match the selected date tab
    if (s.showDate !== selectedDate) return false;
    
    // Double check that it hasn't fallen behind today's date
    return s.showDate >= TodayStr;
});
    // 3. Group filtered shows by Theatre Name dynamically
    const groupedByTheatre = showsForSelectedDate.reduce((acc, currentShow) => {
        const key = currentShow.theatreName || currentShow.theatreId || "Unknown_Theatre";
        if (!acc[key]) {
            acc[key] = {
                theatreName: currentShow.theatreName ||`Theatre (${currentShow.theatreId})`,
                location: currentShow.location || "Location Not Found",
                times: []
            };
        }
        acc[key].times.push(currentShow);
        return acc;
    }, {} as Record<string, { theatreName: string; location: string; times: any[] }>);

    // Delete Movie Handler
    const handleDelete = async () => {
        if (!movie) return;
        const confirmed = window.confirm(`Are you sure you want to delete "${movie.title}"?`);
        if (!confirmed) return;

        try {
            await MovieService.deleteMovie(movie.movieId);
            alert("Movie deleted successfully!");
            navigate("/movies");
        } catch (error) {
            console.error("Failed to delete movie:", error);
            alert("Failed to delete movie.");
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <p className="text-gray-400 text-lg">Loading movie details...</p>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || "Movie not found"}</p>
                    <button onClick={() => navigate("/movies")} className="bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700">
                        Back to Movies
                    </button>
                </div>
            </div>
        );
    }
    const handleUpdate = () => {
        if (movieId) {
            navigate(`/movies/edit/${movieId}`);
        }
    };
    const handleAddShow = () => {
        if (movieId) {
            navigate(`/shows/add?movieId=${movieId}`);
        }
    };

    return (
        <div className="min-h-screen bg-bgPaper text-white">
            {/* ================= NAVBAR ================= */}
            <header className="bg-[#1c1c1c] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={() => navigate("/movies")} className="flex items-center gap-2 text-gray-300 hover:text-white transition">
                        <span className="text-xl">←</span>
                        <span>Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-white">Movie Details</h1>
                </div>
            </header>

            {/* ================= MOVIE PROFILE DASHBOARD ================= */}
            <main className="max-w-5xl mx-auto px-5 py-8">
                {/* Movie Hero Card */}
                <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Poster Element */}
                        <div className="md:w-[280px] h-[360px] md:h-[390px] bg-[#222] flex-shrink-0">
                            <img src={movie.image_url} alt={movie.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Movie Content Meta Strings */}
                        <div className="flex-1 p-7 flex flex-col justify-center">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
                                    <p className="text-gray-400 mt-1">{movie.language}</p>
                                </div>
                                <span className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full font-bold">
                                    {movie.status}
                                </span>
                            </div>

                            {/* Rating View Row */}
                            <div className="flex items-center gap-2 mt-5">
                                <span className="text-yellow-500 text-xl">★</span>
                                <span className="font-semibold text-white">9.2</span>
                                <span className="text-gray-500 text-sm">(128K reviews)</span>
                            </div>

                            {/* Details Text Parameters */}
                            <div className="mt-5 space-y-2 text-sm text-gray-400">
                                <p><span className="font-semibold text-neutral-200">Duration:</span> {movie.duration}</p>
                                <p><span className="font-semibold text-neutral-200">Description:</span> {movie.description}</p>
                            </div>

                            {/* Movie Action Buttons */}
                            <div className="flex items-center gap-3 mt-6">
                                    {userRole !== "ROLE_CUSTOMER" && (
                                        <>
                                {/* Update Movie */}
                                <button
                                    onClick={handleUpdate}
                                    className="w-fit bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                    Update Movie
                                </button>
                                <button onClick={handleDelete} className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-700">
                                    Delete Movie
                                </button>
                                <button
                                    onClick={handleAddShow}
                                    className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 transition"
                                >
                                    Add Show
                                </button>
                                </>)}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= AVAILABLE SCREENINGS DISPLAY RENDER CONTAINER ================= */}
                <section className="mt-8 bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 shadow-md">
                    <h3 className="text-xl font-bold mb-6 border-l-4 border-green-500 pl-3 text-white">Available Shows</h3>

                    {/* INTERACTIVE DATE SCROLL SELECTION TABS */}
                    <div className="flex gap-3 overflow-x-auto pb-3 mb-6 border-b border-neutral-800">
                        {uniqueDates.map((dateStr) => {
                            const dateObj = new Date(dateStr);
                            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                            const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => setSelectedDate(dateStr)}
                                    className={`px-5 py-2 rounded-lg text-sm font-medium min-w-[100px] flex flex-col items-center transition ${selectedDate === dateStr
                                        ? "bg-green-500 text-black font-bold"
                                        : "bg-[#262626] text-gray-400 hover:bg-[#333333]"
                                        }`}
                                >
                                    <span>{dayName}</span>
                                    <span className="text-xs opacity-80 mt-0.5">{displayDate}</span>
                                </button>
                            );
                        })}
                        {uniqueDates.length === 0 && (
                            <p className="text-gray-500 text-sm py-4">No upcoming shows scheduled for this movie yet.</p>
                        )}
                    </div>

                  {/* DYNAMIC THEATRES ROWS */}
<div className="space-y-6">
    {Object.values(groupedByTheatre).map((theatre, index) => (
        // 🌟 FIX: Fallback to an index key combo so it never hits undefined
        <div key={`${theatre.theatreName}-${index}`} className="bg-[#262626] border border-neutral-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">🎬</span>
                <div>
                    <h4 className="font-bold text-white text-lg">{theatre.theatreName}</h4>
                    <p className="text-xs text-gray-400">📍 {theatre.location}</p>
                </div>
            </div>

            {/* Dynamic list rendering of interactive showtime buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {theatre.times.map((show) => (
                    <button
                        key={show.showId}
                        onClick={() => {
                            setSelectedShow(show);
                            setTicketCount(1);    // Resets counter to 1
                            setIsModalOpen(true); // Opens the popup
                        }}
                        className="bg-[#1c1c1c] border border-neutral-800 hover:border-green-500 p-3 rounded-lg flex flex-col items-center justify-between group transition text-center"
                    >
                        <span className="text-sm font-semibold text-white group-hover:text-green-400 transition">{show.showTime}</span>
                        <span className="text-xs text-green-500 font-mono mt-1">LKR {show.ticketPrice}</span>
                    </button>
                ))}
            </div>
        </div>
    ))}
</div>

                </section>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white text-black w-full max-w-[400px] rounded-[20px] shadow-2xl p-8 relative flex flex-col items-center text-center animate-in zoom-in-95 duration-200">

                        {/* Circular Close Button Top Right */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-white bg-black hover:bg-neutral-800 text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center transition focus:outline-none"
                        >
                            ✕
                        </button>

                        <h3 className="text-sm font-semibold tracking-widest text-[#222222] uppercase mt-2 mb-6">
                            HOW MANY TICKETS?
                        </h3>

                        {/* Scope Ticket Graphic Image Vector */}
                        <div className="w-36 h-20 mb-4 flex items-center justify-center relative">
                            <svg viewBox="0 0 100 60" className="w-full h-full text-black transform -rotate-12" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5,10 h90 v40 h-90 z" />
                                <path d="M25,10 v40 M75,10 v40" strokeDasharray="3,3" />
                                <circle cx="50" cy="30" r="6" strokeDasharray="none" />
                                <text x="32" y="34" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none" letterSpacing="1">TICKET</text>
                            </svg>
                        </div>

                        <p className="text-xs font-bold text-gray-800 mt-2 mb-0.5">No. Of Tickets</p>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">(Max 10)</p>

                        {/* Plus / Minus Counter Selector Buttons */}
                        <div className="flex items-center gap-6 my-4">
                            <button
                                onClick={() => setTicketCount(prev => Math.max(1, prev - 1))}
                                className="w-9 h-9 border border-neutral-400 rounded-full flex items-center justify-center text-xl font-medium text-gray-600 hover:border-black hover:text-black hover:bg-neutral-50 transition active:scale-95 disabled:opacity-40"
                                disabled={ticketCount <= 1}
                            >
                                −
                            </button>

                            <span className="text-2xl font-bold text-[#E21B24] min-w-[24px] select-none">
                                {ticketCount}
                            </span>

                            <button
                                onClick={() => setTicketCount(prev => Math.min(10, prev + 1))}
                                className="w-9 h-9 border border-neutral-400 rounded-full flex items-center justify-center text-xl font-medium text-gray-600 hover:border-black hover:text-black hover:bg-neutral-50 transition active:scale-95 disabled:opacity-40"
                                disabled={ticketCount >= 10}
                            >
                                +
                            </button>
                        </div>

                        {/* Action Call Confirmation Button */}
                        <button
                            onClick={handleConfirmTickets}
                            className="w-full bg-[#202554] hover:bg-[#161a3c] text-white font-medium py-3 rounded-md text-xs uppercase tracking-widest mt-4 transition active:scale-[0.98] focus:outline-none shadow-md"
                        >
                            SELECT SEATS
                        </button>
                    </div>
                </div>
            )}
        </div >
    );
};