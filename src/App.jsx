import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import BookScreen from './BookScreen';
import LoginScreen from './LginScreen';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
      setIsAuthenticated(true)
    }
  }, [])

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token)
    axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
    setIsAuthenticated(true)
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/" element={
        <RequireAuth>
          <BookScreen />
        </RequireAuth>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
