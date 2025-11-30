import { Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import SeatBookings from '../pages/SeatBookings';
import MyBookings from '../pages/MyBookings';
import TopRatedMovies from '../pages/TopRatedMovies';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

const MainRoutes = () => (
    <>
        {/* Login Route - No Layout */}
        <Route path="/login" element={<Login />} />

        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/top-rated" element={<TopRatedMovies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />

            {/* Private Routes - Require Authentication */}
            <Route
                path="/movie/:id/booking"
                element={
                    <PrivateRoute>
                        <SeatBookings />
                    </PrivateRoute>
                }
            />
            <Route
                path="/my-bookings"
                element={
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Route>
    </>
);

export default MainRoutes;
