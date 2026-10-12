
import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const SeatSelection = () => {
    const { showId } = useParams<{ showId: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get ticket count and price from MovieDetails
    const ticketCount = Math.min(
        10,
        Math.max(1, Number(searchParams.get("count")) || 1)
    );

    const ticketPrice = Math.max(
        0,
        Number(searchParams.get("price")) || 0
    );
    const movieName = searchParams.get("movieName") || "Movie";

    // Cinema layout: rows A-J, 10 seats in each row
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const seatsPerRow = 10;

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const bookedSeats = useMemo(() => {
      if (!showId) return ["A3"]; // Default fallback
     const stored = localStorage.getItem(`booked_seats_${showId}`);
    // Combines your initial demo seat ("A3") with whatever has been saved in localStorage
    const savedSeats = stored ? JSON.parse(stored) : [];
    return Array.from(new Set(["A3", ...savedSeats]));
  }, [showId]);

    const totalAmount = selectedSeats.length * ticketPrice;

    const handleSeatClick = (seatId: string) => {
        if (bookedSeats.includes(seatId)) return;

        setSelectedSeats((previousSeats) => {
            // Deselect an already selected seat
            if (previousSeats.includes(seatId)) {
                return previousSeats.filter((seat) => seat !== seatId);
            }

            // A customer cannot select more seats than their ticket count
            if (previousSeats.length >= ticketCount) {
                return previousSeats;
            }

            return [...previousSeats, seatId];
        });
    };

    const handleContinue = () => {
        if (!showId) {
            alert("Show ID is missing.");
            return;
        }

        if (selectedSeats.length !== ticketCount) {
            alert(`Please select exactly ${ticketCount} seat(s).`);
            return;
        }
     const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    localStorage.setItem(`booked_seats_${showId}`, JSON.stringify(updatedBookedSeats));

        navigate("/payment", {
            state: {
        showId,
        movieName,
        selectedSeats,
        ticketCount,
        ticketPrice,
        totalAmount
            }
        });
    };

    const getSeatClass = (seatId: string) => {
        if (bookedSeats.includes(seatId)) {
            return "bg-red-600 text-white border-red-600 cursor-not-allowed";
        }

        if (selectedSeats.includes(seatId)) {
            return "bg-green-500 text-black border-green-400 shadow-lg shadow-green-500/30";
        }

        return "bg-[#292929] text-gray-300 border-gray-600 hover:bg-blue-600 hover:border-blue-400";
    };

    return (
        <div className="min-h-screen bg-[#101010] text-white">
            {/* Header */}
            <header className="bg-[#1c1c1c] border-b border-neutral-800 px-5 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-300 hover:text-white"
                    >
                        ← Back
                    </button>

                    <h1 className="text-lg sm:text-2xl font-bold">
                       ({movieName}) - Select Your Seats
                    </h1>

                    <span className="text-xs sm:text-sm text-green-400">
                        Show: {showId}
                    </span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-4 sm:p-8">
                {/* Ticket information */}
                <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-5 mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Tickets
                            </p>
                            <p className="text-xl font-bold">
                                {ticketCount}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm">
                                Price per seat
                            </p>
                            <p className="text-xl font-bold text-green-400">
                                LKR {ticketPrice.toLocaleString()}
                            </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <p className="text-gray-400 text-sm">
                                Selected
                            </p>
                            <p className="text-xl font-bold">
                                {selectedSeats.length} / {ticketCount}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Cinema screen */}
                <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-4 sm:p-8">
                    <div className="max-w-2xl mx-auto mb-10">
                        <div className="h-2 rounded-full bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_8px_20px_rgba(59,130,246,0.35)]" />

                        <p className="text-center text-gray-400 text-xs tracking-[0.4em] mt-4">
                            SCREEN
                        </p>
                    </div>

                    {/* Seat legend */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 text-xs">
                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-[#292929] border border-gray-600" />
                            Available
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-green-500" />
                            Selected
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded bg-red-600" />
                            Booked
                        </div>
                    </div>

                    {/* Seat map */}
                    <div className="space-y-3 overflow-x-auto pb-4">
                        {rows.map((row) => (
                            <div
                                key={row}
                                className="flex items-center justify-center gap-1.5 sm:gap-2 min-w-[330px]"
                            >
                                <span className="w-5 text-center text-sm font-bold text-green-400">
                                    {row}
                                </span>

                                {Array.from(
                                    { length: seatsPerRow },
                                    (_, index) => {
                                        const seatId = `${row}${index + 1}`;
                                        const isBooked =
                                            bookedSeats.includes(seatId);

                                        return (
                                            <button
                                                key={seatId}
                                                type="button"
                                                title={
                                                    isBooked
                                                        ? `${seatId} - Booked`
                                                        : `${seatId} - Select seat`
                                                }
                                                disabled={isBooked}
                                                onClick={() =>
                                                    handleSeatClick(seatId)
                                                }
                                                className={`w-6 h-7 sm:w-9 sm:h-9 rounded-t-lg rounded-b-sm border text-[9px] sm:text-xs font-semibold transition ${getSeatClass(seatId)}`}
                                            >
                                                {index + 1}
                                            </button>
                                        );
                                    }
                                )}

                                <span className="w-5 text-center text-sm font-bold text-green-400">
                                    {row}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Selected seats */}
                    <div className="mt-8 border-t border-neutral-700 pt-6">
                        <h2 className="font-bold mb-3">
                            Selected Seat Numbers
                        </h2>

                        {selectedSeats.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {selectedSeats.map((seat) => (
                                    <span
                                        key={seat}
                                        className="bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1.5 rounded-lg text-sm font-bold"
                                    >
                                        {seat}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No seats selected yet.
                            </p>
                        )}

                        {selectedSeats.length < ticketCount && (
                            <p className="text-yellow-400 text-sm mt-4">
                                Select {ticketCount - selectedSeats.length} more
                                seat(s) to continue.
                            </p>
                        )}
                    </div>

                    {/* Total and continue */}
                    <div className="mt-8 border-t border-neutral-700 pt-6">
                        <div className="flex justify-between items-center mb-5">
                            <span className="text-gray-400">
                                Total Amount
                            </span>

                            <span className="text-2xl font-bold text-green-400">
                                LKR {totalAmount.toLocaleString()}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleContinue}
                            disabled={selectedSeats.length !== ticketCount}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition"
                        >
                            Continue to Booking
                        </button>

                        <p className="text-center text-gray-500 text-xs mt-3">
                            You can select up to 10 seats per booking.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SeatSelection;
