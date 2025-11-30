import { Routes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AdminRoutes from './AdminRoutes';

const AppRouter = () => {
    return (
        <Routes>
            {MainRoutes()}
            {AdminRoutes()}
        </Routes>
    );
};

export default AppRouter;
