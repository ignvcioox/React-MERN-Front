import { Navigate, Route, Routes } from 'react-router-dom';
import { CalendarPage } from '../calendar';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {

    // const authStatus = 'not-authenticated';
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken()
    }, []);


    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<AuthRoutes />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes>
    );
};