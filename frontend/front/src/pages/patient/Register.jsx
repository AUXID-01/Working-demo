import React, { useState } from 'react'
import '../../page-css/Register.css'
import emailIcon from '../../assets/mark_email_unread.png'
import LockIcon from '../../assets/Lock.png'
import userIcon from '../../assets/User.png'
import dobIcon from '../../assets/Calendar.png'
import phoneIcon from '../../assets/Phone.png'
import eyeOpen from '../../assets/eye-open.png'
import eyeClosed from '../../assets/eye-closed.png'
import loginBg from '../../assets/pd.svg'

function Register() {
  const [step, setStep] = useState(1) // Step 1: basic info, Step 2: personal details
  const [formData, setFormData] = useState({
    Username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: '',
    role: 'patient', // default role
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleContinue = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }
    setError(null)
    setStep(2) // move to personal details step
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.message || 'Registration failed')
        return
      }
      alert('Registration successful! Please login.')
      window.location.href = '/login'
    } catch (err) {
      console.error(err)
      alert('Registration failed. Try again.')
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
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Register</h2>
          <p className="register-subtitle">
            {step === 1 ? 'Create your account' : 'Enter your personal details'}
          </p>

          <form onSubmit={step === 1 ? handleContinue : handleRegister}>
            {step === 1 ? (
              <>
                {/* Username */}
                <div className="input-group">
                  <img src={userIcon} alt="User Icon" />
                  <input
                    type="text"
                    name="Username"
                    placeholder="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <img src={emailIcon} alt="Email Icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="input-group password-group">
                  <img src={LockIcon} alt="Lock Icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <img
                    src={showPassword ? eyeOpen : eyeClosed}
                    alt="Toggle Password"
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                {/* Confirm Password */}
                <div className="input-group password-group">
                  <img src={LockIcon} alt="Lock Icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <img
                    src={showConfirmPassword ? eyeOpen : eyeClosed}
                    alt="Toggle Confirm Password"
                    className="eye-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                {/* Role Selection */}
                <div className="input-group">
                  <img src={userIcon} alt="Role" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {error && <p className="error-text">{error}</p>}

                <button type="submit" className="btn-register">
                  Continue
                </button>
              </>
            ) : (
              <>
                {/* Personal Details Step */}
                <div className="input-group">
                  <img src={userIcon} alt="First Name" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <img src={userIcon} alt="Last Name" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <img src={dobIcon} alt="Date of Birth" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <img src={phoneIcon} alt="Phone" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <img src={userIcon} alt="Gender" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button type="submit" className="btn-register">
                  Register
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
