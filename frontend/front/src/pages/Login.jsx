import React, { useState } from 'react'
import '../page-css/Login.css'
import emailIcon from '../assets/mark_email_unread.png'
import lockIcon from '../assets/Lock.png'
import loginBg from '../assets/signbg.svg'

function Login() {
  // 🔹 State handling
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  // 🔹 Form submit handling
  const handleSubmit = (e) => {
    e.preventDefault() // prevent refresh
    if (!email || !password) {
      setError('Please fill in both fields.')
      return
    }

    // Call API / Auth logic here
    console.log('Logging in with:', { email, password })

    // Reset error
    setError(null)
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
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <span className="icon">
                  <img src={lockIcon} alt="Password Icon" />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
