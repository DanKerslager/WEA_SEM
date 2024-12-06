import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const user = localStorage.getItem('user')
    return user ? children : <Navigate to="/" />;
  }
export default PrivateRoute