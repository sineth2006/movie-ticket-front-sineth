import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/auth/AuthProvider';
import { NavBar } from './components/navBar/NavBar';
import { LogIn } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { Movies } from './components/Movies/Movies';
import { MovieDetails } from './components/Movies/MovieDetails';
import { AddMovie } from './components/Movies/AddMovies';
import { MovieUpdate } from "./components/Movies/UpdateMovie";
import { SeatSelection } from "./components/Movies/SeatSelection";
import PaymentGateway from "./components/Movies/PaymentGateway";
import { BookingConfirmation } from "./components/Movies/BookingConfirmation";
import AddShow from "./components/Shows/AddShow";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<LogIn />} />
          <Route path='/sign-in' element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/movies/edit/:movieId" element={<MovieUpdate />} />
          <Route path="/search" element={<Movies />} />
          <Route path="/genres/:genreName" element={<Movies />} />
          <Route path="/seats/:showId" element={<SeatSelection />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/shows/add"element={<AddShow />}/>
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App;
