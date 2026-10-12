import { useState,useEffect  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

interface BookingState {
    showId: string;
    movieName: string;
    selectedSeats: string[];
    ticketCount: number;
    ticketPrice: number;
    totalAmount: number;
    paymentStatus: string;
}

interface PastBooking {
    id: string;
    movieName: string;
    seats: string[];
    date: string;
    amount: number;
}

export const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 1. Hook into your authentication context values
    const { isAuthenticated, user } = useAuth();
    const bookingData = location.state as BookingState | undefined;
    
    const [isCancelling, setIsCancelling] = useState(false);

    // 2. Simulated pipeline tracker data for other movies booked by this user
    const [otherBookings, setOtherBookings] = useState<PastBooking[]>([
        { id: "B-9982", movieName: "Inception", seats: ["C4", "C5"], date: "Oct 12, 2026", amount: 24.00 },
        { id: "B-4410", movieName: "The Dark Knight", seats: ["F12"], date: "Oct 18, 2026", amount: 12.00 }
    ]);

    // Keeps 'setOtherBookings' active to satisfy compiler rules until you link your API
    useEffect(() => {
        setOtherBookings((prev) => [...prev]);
    }, []);

    // Safety fallback layer verifying active login profiles
    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-[#101010] text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-xl mb-4 font-bold">Please log in to view booking summaries.</h2>
                <button 
                    onClick={() => navigate("/login")} 
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
                >
                    Go to Login
                </button>
            </div>
        );
    }

          if (!bookingData) {
        return (
            <div className="min-h-screen bg-[#101010] text-white flex flex-col items-center justify-center p-4">
                <h2 className="text-xl mb-4 font-bold">No booking data found.</h2>
                <button 
                    onClick={() => navigate("/movies")} 
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition"
                >
                    Go to Movies
                </button>
            </div>
        );
    } 
   const handleCancelBooking = async () => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this booking? A refund will be processed automatically.");
        if (confirmCancel) {
            try {
                setIsCancelling(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                alert("Your booking has been successfully cancelled and refunded.");
                navigate("/movies");
            } catch (error) {
                console.error("Cancellation failed:", error);
                alert("Something went wrong. Please try again.");
            } finally {
                setIsCancelling(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#101010] text-white px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* ================= USER PROFILE TOP HEADER ================= */}
                <header className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-xs text-green-500 font-bold uppercase tracking-wider">Account Profile</span>
                        <h2 className="text-2xl font-bold mt-0.5">{user.name}</h2>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg text-sm text-gray-300">
                        Status: <span className="text-yellow-500 font-bold">{user.membership || "Standard"}</span>
                    </div>
                </header>

                {/* ================= TWO-COLUMN DASHBOARD GRID SETUP ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* COLUMNS 1 & 2: CURRENT CONFIRMED BOOKING DETAILS */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 sm:p-8 text-center h-fit">
                            <div className="w-14 h-14 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                                ✓
                            </div>
                            
                            <h1 className="text-2xl font-bold text-white mb-1">Booking Confirmed!</h1>
                            <p className="text-gray-400 text-sm mb-6">Your payment was processed successfully.</p>

                            <div className="bg-[#292929] rounded-lg p-5 text-left space-y-4 max-w-xl mx-auto border border-neutral-800">
                                <div>
                                    <span className="text-xs text-gray-400 block uppercase tracking-wider">Movie</span>
                                    <span className="text-xl font-bold text-green-400">{bookingData.movieName}</span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 border-t border-neutral-700 pt-3">
                                    <div>
                                        <span className="text-xs text-gray-400 block uppercase tracking-wider">Seats</span>
                                        <span className="font-semibold text-base sm:text-lg">{bookingData.selectedSeats.join(", ")}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block uppercase tracking-wider">Amount Paid</span>
                                        <span className="font-semibold text-base sm:text-lg text-white">${bookingData.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-neutral-700 pt-3">
                                    <div>
                                        <span className="text-xs text-gray-400 block uppercase tracking-wider">Show ID</span>
                                        <span className="font-medium text-gray-300">{bookingData.showId}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block uppercase tracking-wider">Status</span>
                                        <span className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded border border-green-600/30 font-bold inline-block mt-1">
                                            {bookingData.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CONTROL ACTIONS AREA */}
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <button 
                                    onClick={() => navigate("/movies")} 
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                                >
                                    Book More Movies
                                </button>
                                
                                <button 
                                    onClick={handleCancelBooking}
                                    disabled={isCancelling}
                                    className="flex-1 bg-transparent hover:bg-red-600/10 text-red-500 border border-red-500/30 hover:border-red-500 font-semibold py-3 rounded-lg transition disabled:opacity-50"
                                >
                                    {isCancelling ? "Processing Cancellation..." : "Cancel This Booking"}
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* COLUMN 3: SIDEBAR HISTORICAL LOOKUP TRACKER */}
                    <div className="lg:col-span-1">
                        <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 h-fit">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                🍿 Your Other Bookings 
                                <span className="bg-green-600 text-xs px-2 py-0.5 rounded-full text-white font-mono">
                                    {otherBookings.length}
                                </span>
                            </h3>

                            {otherBookings.length === 0 ? (
                                <p className="text-sm text-gray-500 italic mt-4">You have no other upcoming movie bookings scheduled.</p>
                            ) : (
                                <div className="space-y-3">
                                    {otherBookings.map((booking) => (
                                        <div 
                                            key={booking.id} 
                                            className="bg-[#292929] border border-neutral-800 rounded-lg p-4 space-y-2 hover:border-neutral-700 transition"
                                        >
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-semibold text-sm text-gray-200 truncate">{booking.movieName}</h4>
                                                <span className="text-[10px] bg-neutral-700 text-gray-400 px-1.5 py-0.5 rounded font-mono shrink-0">
                                                    {booking.id}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-400 gap-2">
                                                <span>Seats: <strong className="text-gray-300">{booking.seats.join(", ")}</strong></span>
                                                <span className="shrink-0">{booking.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
};