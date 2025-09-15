import React from 'react'
import '../page-css/Login.css' // custom styles
import emailIcon from '../assets/mark_email_unread.png'
import lockIcon from '../assets/Lock.png'
import loginBg from '../assets/signbg.svg'

function Login() {
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
        {/* Left side with card */}
        <div className="login-left">
          <div className="login-card">
            <h2 className="login-title">Hello!</h2>
            <p className="login-subtitle">Sign in to you your account</p>

            <form>
              <div className="input-group">
                <span className="icon">
                  <img src={emailIcon} alt="Email Icon" />
                </span>
                <input type="email" name="email" placeholder="E-mail" />
              </div>

              <div className="input-group">
                <span className="icon">
                  <img src={lockIcon} alt="Password Icon" />
                </span>
                <input type="password" name="password" placeholder="Password" />
              </div>

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

        {/* Right side message */}
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
