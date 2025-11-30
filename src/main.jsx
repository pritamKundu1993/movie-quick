import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext.jsx';
import { LoginProvider } from './context/LoginContext.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <MovieProvider>
                    <App />
                </MovieProvider>
            </LoginProvider>
        </BrowserRouter>
    </StrictMode>
);
