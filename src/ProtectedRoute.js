import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
  const { user } = useAuth();

  // Check if user is logged in and has admin role if adminOnly is true
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.role === 'admin';

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          adminOnly && !isAdmin ? (
            <Redirect to="/forbidden" /> // Redirect if not admin and trying to access admin route
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" /> // Redirect to login if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
