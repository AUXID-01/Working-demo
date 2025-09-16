import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../page-css/Register.css'
import emailIcon from '../assets/mark_email_unread.png'
import LockIcon from '../assets/Lock.png'
import userIcon from '../assets/User.png'
import loginBg from '../assets/pd.svg'

function Register() {
  const navigate = useNavigate()

  // 🔹 State for form fields
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ Simple validation
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    // (Optional) send data to backend here
    console.log('Registering:', { username, email, password })

    // Clear error if all good
    setError(null)

    // ✅ redirect to PersonalDetails page
    navigate('/personal-details')
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

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <img src={userIcon} alt="User Icon" />
<<<<<<< HEAD
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={emailIcon} alt="Email Icon" />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
=======
              <input type="text" placeholder="Username" name= "username" required />
            </div>
            <div className="input-group">
              <img src={emailIcon} alt="Email Icon" />
              <input type="email" name="email" placeholder="E-mail" required />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input type="password" name="password" placeholder="Enter Password" required />
            </div>
            <div className="input-group">
              <img src={LockIcon} alt="Lock Icon" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
>>>>>>> 6ffdd0e53526396d03e2af96897687f2dab6a002
            </div>

            {error && <p className="error-text">{error}</p>}

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
