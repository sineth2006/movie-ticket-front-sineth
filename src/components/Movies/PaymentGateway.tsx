import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PaymentState {
    showId: string;
    movieName: string;
    selectedSeats: string[];
    ticketCount: number;
    ticketPrice: number;
    totalAmount: number;
}

export const PaymentGateway = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const paymentData = location.state as PaymentState | undefined;

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!paymentData) {
        return (
            <div className="min-h-screen bg-[#101010] text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Payment information not found
                    </h2>

                    <button
                        onClick={() => navigate("/movies")}
                        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg"
                    >
                        Back to Movies
                    </button>
                </div>
            </div>
        );
    }

    const handleCardNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 16) {
            value = value.substring(0, 16);
        }

        // Format: 1234 5678 9012 3456
        value = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(value);
    };

    const handleExpiryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.substring(0, 4);
        }

        if (value.length >= 3) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }

        setExpiryDate(value);
    };

    const handleCvvChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handlePayment = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (cardNumber.replace(/\s/g, "").length !== 16) {
            alert("Please enter a valid 16-digit card number.");
            return;
        }

        if (!cardName.trim()) {
            alert("Please enter the card holder name.");
            return;
        }

        if (expiryDate.length !== 5) {
            alert("Please enter a valid expiry date.");
            return;
        }

        if (cvv.length !== 3) {
            alert("Please enter a valid CVV.");
            return;
        }

        try {
            setProcessing(true);

            /*
             * Payment API will be connected here.
             *
             * Example:
             *
             * await PaymentService.createPayment({
             *     amount: paymentData.totalAmount,
             *     showId: paymentData.showId,
             *     seats: paymentData.selectedSeats
             * });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );

            alert("Payment successful!");

            // Go to booking confirmation
            navigate("/booking-confirmation", {
                state: {
                    ...paymentData,
                    paymentStatus: "COMPLETED"
                }
            });
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#101010] text-white">

            {/* ================= HEADER ================= */}

            <header className="bg-[#1c1c1c] border-b border-neutral-800 px-5 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">

                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-300 hover:text-white transition"
                    >
                        ← Back
                    </button>

                    <h1 className="text-xl sm:text-2xl font-bold">
                        Payment Gateway
                    </h1>

                    <div className="w-10" />

                </div>
            </header>


            {/* ================= MAIN ================= */}

            <main className="max-w-5xl mx-auto px-4 py-8">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ================= PAYMENT FORM ================= */}

                    <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6">

                        <div className="mb-6">

                            <h2 className="text-xl font-bold">
                                Payment Details
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Enter your card details to complete the booking.
                            </p>

                        </div>


                        <form
                            onSubmit={handlePayment}
                            className="space-y-5"
                        >

                            {/* Card Number */}

                            <div>

                                <label className="block text-sm text-gray-300 mb-2">
                                    Card Number
                                </label>

                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full bg-[#292929] border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                                    maxLength={19}
                                />

                            </div>


                            {/* Card Holder */}

                            <div>

                                <label className="block text-sm text-gray-300 mb-2">
                                    Card Holder Name
                                </label>

                                <input
                                    type="text"
                                    value={cardName}
                                    onChange={(e) =>
                                        setCardName(e.target.value)
                                    }
                                    placeholder="John Doe"
                                    className="w-full bg-[#292929] border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                                />

                            </div>


                            {/* Expiry + CVV */}

                            <div className="grid grid-cols-2 gap-4">

                                <div>

                                    <label className="block text-sm text-gray-300 mb-2">
                                        Expiry Date
                                    </label>

                                    <input
                                        type="text"
                                        value={expiryDate}
                                        onChange={handleExpiryChange}
                                        placeholder="MM/YY"
                                        className="w-full bg-[#292929] border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                                        maxLength={5}
                                    />

                                </div>


                                <div>

                                    <label className="block text-sm text-gray-300 mb-2">
                                        CVV
                                    </label>

                                    <input
                                        type="password"
                                        value={cvv}
                                        onChange={handleCvvChange}
                                        placeholder="•••"
                                        className="w-full bg-[#292929] border border-neutral-700 rounded-lg px-4 py-3 text-white outline-none focus:border-green-500"
                                        maxLength={3}
                                    />

                                </div>

                            </div>


                            {/* Pay Button */}

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition mt-4"
                            >
                                {processing
                                    ? "Processing Payment..."
                                    : `Pay LKR ${paymentData.totalAmount.toLocaleString()}`
                                }
                            </button>

                        </form>

                    </section>


                    {/* ================= BOOKING SUMMARY ================= */}

                    <section className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 h-fit">

                        <h2 className="text-xl font-bold mb-6">
                            Booking Summary
                        </h2>


                        {/* Movie */}

                        <div className="border-b border-neutral-700 pb-5 mb-5">

                            <p className="text-gray-400 text-sm">
                                Movie
                            </p>

                            <p className="text-xl font-bold mt-1">
                                {paymentData.movieName}
                            </p>

                        </div>


                        {/* Show */}

                        <div className="space-y-4">

                            <div className="flex justify-between">

                                <span className="text-gray-400">
                                    Show ID
                                </span>

                                <span className="font-semibold">
                                    {paymentData.showId}
                                </span>

                            </div>


                            <div className="flex justify-between">

                                <span className="text-gray-400">
                                    Tickets
                                </span>

                                <span className="font-semibold">
                                    {paymentData.ticketCount}
                                </span>

                            </div>


                            <div>

                                <p className="text-gray-400 text-sm mb-2">
                                    Selected Seats
                                </p>

                                <div className="flex flex-wrap gap-2">

                                    {paymentData.selectedSeats.map(
                                        (seat) => (
                                            <span
                                                key={seat}
                                                className="bg-green-500/20 border border-green-500/40 text-green-400 px-3 py-1 rounded-lg text-sm font-bold"
                                            >
                                                {seat}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>


                            <div className="flex justify-between">

                                <span className="text-gray-400">
                                    Price per ticket
                                </span>

                                <span>
                                    LKR{" "}
                                    {paymentData.ticketPrice.toLocaleString()}
                                </span>

                            </div>

                        </div>


                        {/* Total */}

                        <div className="border-t border-neutral-700 mt-6 pt-5 flex justify-between items-center">

                            <span className="text-lg font-bold">
                                Total
                            </span>

                            <span className="text-2xl font-bold text-green-400">
                                LKR{" "}
                                {paymentData.totalAmount.toLocaleString()}
                            </span>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default PaymentGateway;