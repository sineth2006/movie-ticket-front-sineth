import { ChangeEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ShowService from "../../service/ShowService";

export const AddShow = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const movieIdFromUrl = searchParams.get("movieId");
const [show, setShow] = useState({
    showId: "",
    movieId: movieIdFromUrl || "",
    theatreId: "",
    showDate: "",
    showTime: "",
    ticketPrice: "",
    status: "SCHEDULED"
});
    // ==============================
    // Handle input changes
    // ==============================
    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setShow((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // ==============================
    // Reset form
    // ==============================
    const handleReset = () => {
        setShow({
            showId: "",
            movieId: "",
            theatreId: "",
            showDate: "",
            showTime: "",
            ticketPrice: "",
            status: "SCHEDULED"
        });
    };

    // ==============================
    // Submit Show
    // ==============================
    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await ShowService.addShow(show);

            alert("Show added successfully!");

            handleReset();

            navigate("/movies");

        } catch (error: any) {
            console.error("Error adding show:", error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Response:", error.response.data);
            }

            alert("Failed to add show!");
        }
    };

    return (
        <div className="min-h-screen bg-bgPaper flex items-center justify-center py-10">

            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">

                <div className="bg-[#c8d6e5] rounded-2xl border border-gray-200 shadow-2xl px-8 py-10">

                    {/* ================= TITLE ================= */}

                    <h2 className="text-center text-2xl font-bold tracking-tight text-blue-500">
                        Add Show to CineSnap
                    </h2>

                    <p className="text-center text-gray-600 text-sm mt-2">
                        Create a new movie screening schedule
                    </p>


                    {/* ================= FORM ================= */}

                    <div className="mt-8">

                        <form
                            className="space-y-5"
                            onSubmit={handleOnSubmit}
                        >

                            {/* ================= SHOW ID ================= */}

                            <div>

                                <label
                                    htmlFor="showId"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Show ID
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="showId"
                                        name="showId"
                                        type="text"
                                        value={show.showId}
                                        onChange={handleOnChange}
                                        placeholder="Example: S009"
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= MOVIE ID ================= */}

                            <div>

                                <label
                                    htmlFor="movieId"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Movie ID
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="movieId"
                                        name="movieId"
                                        type="text"
                                        value={show.movieId}
                                        onChange={handleOnChange}
                                        placeholder="Example: M016"
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= THEATRE ID ================= */}

                            <div>

                                <label
                                    htmlFor="theatreId"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Theatre ID
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="theatreId"
                                        name="theatreId"
                                        type="text"
                                        value={show.theatreId}
                                        onChange={handleOnChange}
                                        placeholder="Example: T001"
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= SHOW DATE ================= */}

                            <div>

                                <label
                                    htmlFor="showDate"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Show Date
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="showDate"
                                        name="showDate"
                                        type="date"
                                        value={show.showDate}
                                        onChange={handleOnChange}
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= SHOW TIME ================= */}

                            <div>

                                <label
                                    htmlFor="showTime"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Show Time
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="showTime"
                                        name="showTime"
                                        type="text"
                                        value={show.showTime}
                                        onChange={handleOnChange}
                                        placeholder="Example: 10:30 a.m"
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= TICKET PRICE ================= */}

                            <div>

                                <label
                                    htmlFor="ticketPrice"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Ticket Price
                                </label>

                                <div className="mt-2">

                                    <input
                                        id="ticketPrice"
                                        name="ticketPrice"
                                        type="number"
                                        min="0"
                                        value={show.ticketPrice}
                                        onChange={handleOnChange}
                                        placeholder="Example: 1500"
                                        required
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    />

                                </div>

                            </div>


                            {/* ================= STATUS ================= */}

                            <div>

                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-blue-500"
                                >
                                    Status
                                </label>

                                <div className="mt-2">

                                    <select
                                        id="status"
                                        name="status"
                                        value={show.status}
                                        onChange={handleOnChange}
                                        className="block w-full rounded-md bg-blue/5 px-3 py-2 text-base text-blue outline-1 outline-blue/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                                    >

                                        <option value="SCHEDULED">
                                            SCHEDULED
                                        </option>

                                        <option value="CANCELLED">
                                            CANCELLED
                                        </option>

                                        <option value="COMPLETED">
                                            COMPLETED
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* ================= BUTTONS ================= */}

                            <div className="pt-3">

                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 mb-4"
                                >
                                    Add Show
                                </button>


                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                                >
                                    Reset
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AddShow;