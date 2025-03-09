import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ element, isPublic = false }) => {
    const token = localStorage.getItem('token'); 

    if (isPublic && token) {
        const from = '/posts';
        return <Navigate to={from} replace />;
    }

    if (!isPublic && !token) {
        return <Navigate to="/signin" replace />;
    }

    return <>{element}</>;
};

export default ProtectedRoutes;