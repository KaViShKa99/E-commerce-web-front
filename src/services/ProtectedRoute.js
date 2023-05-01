import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, path }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? element : <Navigate to='/permission-denied' />

}

export default ProtectedRoute;
