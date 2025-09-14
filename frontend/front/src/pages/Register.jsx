import React from 'react'
import { useNavigate } from 'react-router-dom' // ✅ import navigation
import '../page-css/Register.css'
import emailIcon from '../assets/mark_email_unread.png'
import LockIcon from '../assets/Lock.png'
import userIcon from '../assets/User.png'
import loginBg from '../assets/pd.svg'

function Register() {
  const navigate = useNavigate() // ✅ hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault()
    // you can also add form validation or API call here
    navigate('/personal-details') // ✅ redirect to PersonalDetails page
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
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Register</h2>
          <p className="register-subtitle">Create your account</p>

          {/* ✅ use handleSubmit */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <img src={userIcon} alt="User Icon" />
              <input type="text" placeholder="Username" required />
            </div>
            <div className="input-group">
              <img src={emailIcon} alt="Email Icon" />
              <input type="email" placeholder="E-mail" required />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input type="password" placeholder="Enter Password" required />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input type="password" placeholder="Confirm Password" required />
            </div>

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the Terms & conditions</label>
            </div>

            <button type="submit" className="btn-register">
              Register
            </button>
          </form>

          <p className="login-link">
            Already have an Account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
