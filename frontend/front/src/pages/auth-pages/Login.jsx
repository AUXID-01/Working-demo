import React, { useState } from 'react'
import '../../page-css/Login.css'
import emailIcon from '../../assets/mark_email_unread.png'
import lockIcon from '../../assets/Lock.png'
import loginBg from '../../assets/signbg.svg'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login failed.')
        return
      }

      setError(null)

      // Store token for authenticated routes
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role) 

      // Role-based redirection
      // Assuming your backend sends `role` in the response
      const role = data.role // 'admin', 'doctor', 'patient'
      if (role === 'admin') {
        navigate('/admin/dashboard')
      } else if (role === 'doctor') {
        navigate('/doctor/dashboard')
      } else if (role === 'patient') {
        navigate('/patient/dashboard')
      } else {
        setError('Invalid role assigned.')
      }
    } catch (err) {
      setError('Login failed. Try again.')
    }
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

                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <span className="icon">
                  <img src={lockIcon} alt="Password Icon" />
                </span>

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
