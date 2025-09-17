import React, { useState } from 'react'
import '../page-css/Register.css' // reuse same css
import userIcon from '../assets/User.png'
import dobIcon from '../assets/Calendar.png' // calendar icon
import phoneIcon from '../assets/Phone.png' // phone icon
import loginBg from '../assets/pd.svg'
import { useNavigate } from 'react-router-dom'

function PersonalDetails() {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    role: 'patient', // ✅ default role
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Personal details submitted:', details)
    // 👉 Here you can call an API to save details before navigation
    navigate('/dashboard')
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
          <h2 className="register-title">Personal Details</h2>
          <p className="register-subtitle">Enter your details</p>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="input-group">
              <img src={userIcon} alt="First Name Icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={details.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="input-group">
              <img src={userIcon} alt="Last Name Icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={details.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="input-group">
              <img src={dobIcon} alt="Date of Birth Icon" />
              <input
                type="date"
                name="dateOfBirth"
                value={details.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <img src={phoneIcon} alt="Phone Icon" />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={details.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Selection */}
            <div className="role-section">
              <span className="role-label">I am a:</span>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="patient"
                  checked={details.role === 'patient'}
                  onChange={handleChange}
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={details.role === 'doctor'}
                  onChange={handleChange}
                />
                Doctor
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={details.role === 'admin'}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>

            <button type="submit" className="btn-register">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
