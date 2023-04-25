import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './admin';



function PrivateRoute({ ...props }) {
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [role, setRole] = useState(sessionStorage.getItem('role' || null));
    const error = useSelector( (state) => state.auth.error);

    useEffect(() => {
        setToken(sessionStorage.getItem('token') || null);
        setRole(sessionStorage.getItem('role') || null);
    })
    return (
        <>
            { token ? (
                <Routes >
                    <Route path='*'  element={<AdminRoutes/>}></Route>
                </Routes>
            ) : (
                <Navigate to='/login' replace />
            )}
        </>
  );
};

export default PrivateRoute;
