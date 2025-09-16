<<<<<<< HEAD
// Login.jsx
=======
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
import React, { useState } from 'react'
import '../page-css/Login.css'
import emailIcon from '../assets/mark_email_unread.png'
import lockIcon from '../assets/Lock.png'
import loginBg from '../assets/signbg.svg'

function Login() {
<<<<<<< HEAD
=======
  // 🔹 State handling
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault()
=======
  // 🔹 Form submit handling
  const handleSubmit = (e) => {
    e.preventDefault() // prevent refresh
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }
<<<<<<< HEAD
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message)
        return
      }
      setError(null)
      // Store token for authenticated routes
      localStorage.setItem('token', data.token)
      // Redirect after login
      window.location.href = '/dashboard'
    } catch (err) {
      setError('Login failed. Try again.')
    }
=======

    // Call API / Auth logic here
    console.log('Logging in with:', { email, password })

    // Reset error
    setError(null)
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
  }

  return (
    <div
      className="page-background"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="login-container">
        <div className="login-left">
          <div className="login-card">
            <h2 className="login-title">Hello!</h2>
            <p className="login-subtitle">Sign in to your account</p>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <span className="icon">
                  <img src={emailIcon} alt="Email Icon" />
                </span>
<<<<<<< HEAD
                <input
                  type="email"
                  name="email"
=======
<<<<<<< HEAD
                <input
                  type="email"
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
<<<<<<< HEAD
=======
=======
                <input type="email" name="email" placeholder="E-mail" />
>>>>>>> 6ffdd0e53526396d03e2af96897687f2dab6a002
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
              </div>

              <div className="input-group">
                <span className="icon">
                  <img src={lockIcon} alt="Password Icon" />
                </span>
<<<<<<< HEAD
                <input
                  type="password"
                  name="password"
=======
<<<<<<< HEAD
                <input
                  type="password"
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
<<<<<<< HEAD
=======
=======
                <input type="password" name="password" placeholder="Password" />
>>>>>>> 6ffdd0e53526396d03e2af96897687f2dab6a002
>>>>>>> d9e59786dbb8d37e467073c1677f0b7d70c6e907
              </div>

              {error && <p className="error-text">{error}</p>}

              <div className="login-options">
                <a href="/" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn-login">
                Sign In
              </button>
            </form>

            <p className="signup-link">
              Don’t have an account? <a href="/register">Create now</a>
            </p>
          </div>
        </div>

        <div className="login-right">
          <h2 className="welcome-title">Welcome Back!</h2>
          <p className="welcome-text">
            Your personalized healthcare companion, helping you track progress,
            stay informed, and stay connected with the care you need.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

