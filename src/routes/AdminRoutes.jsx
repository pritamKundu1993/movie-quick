import { Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import AdminPrivateRoute from './AdminPrivateRoute';

import AddShows from '../pages/admin/AddShows';
import ListShows from '../pages/admin/ListShows';
import ListBookings from '../pages/admin/ListBookings';

const AdminRoutes = () => (
    <Route
        element={
            <AdminPrivateRoute>
                <AdminLayout />
            </AdminPrivateRoute>
        }
    >
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-shows" element={<AddShows />} />
        <Route path="/admin/list-bookings" element={<ListBookings />} />
        <Route path="/admin/list-shows" element={<ListShows />} />
    </Route>
);

export default AdminRoutes;
