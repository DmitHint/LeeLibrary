import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../router/Routes';
import {AuthContext} from "../../context/AuthContext";

export const AppRouter: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null;
    }

    const {isAuth} = authContext;

    return (
        <Routes>
            {isAuth ? (
                <>
                    {privateRoutes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to="/home" replace/>}
                    />
                </>
            ) : (
                <>
                    {publicRoutes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route
                        path="*"
                        element={<Navigate to="/auth" replace/>}
                    />
                </>
            )}
        </Routes>
    );
};
