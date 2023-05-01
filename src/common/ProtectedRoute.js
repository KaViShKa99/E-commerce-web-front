import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, path }) {
  const details = localStorage.getItem('userInfo');
  if (details) {
    const { token } = JSON.parse(details)
    return token ? element : <Navigate to='/permission-denied' />
  } else {
    return <Navigate to='/permission-denied' />
  }
}

export default ProtectedRoute;
