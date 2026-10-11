import { useState } from 'react'
import { AuthContext } from './authContextInstance'
import {
  clearSession,
  loginLocalUser,
  readSession,
  registerLocalUser,
  saveSession,
} from '../services/authService'

export function AuthProvider({ children }) {
  const [initialAuth] = useState(() => {
    try {
      return { user: readSession(), error: '' }
    } catch (err) {
      return { user: null, error: err.message }
    }
  })
  const [user, setUser] = useState(initialAuth.user)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialAuth.error)

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const userData = await loginLocalUser(email, password)
      saveSession(userData)
      setUser(userData)
      return userData
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const userData = await registerLocalUser(formData)
      saveSession(userData)
      setUser(userData)
      return userData
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    try {
      clearSession()
      setUser(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
