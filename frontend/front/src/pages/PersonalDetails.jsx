import React, { useState } from 'react'
import '../page-css/Register.css' // reuse same css
import userIcon from '../assets/User.png'
import dobIcon from '../assets/Calendar.png' // add a calendar icon in assets
import phoneIcon from '../assets/Phone.png' // add a phone icon in assets
import loginBg from '../assets/pd.svg'
import { useNavigate } from 'react-router-dom';

function PersonalDetails() {
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    role: 'Patient',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Personal details submitted:', details)
    // navigate or API call here
  }

  const navigate = useNavigate()

  const handleContinue = (e) => {
    e.preventDefault() // stop form refresh if inside a <form>
    navigate('/dashboard') // go to dashboard
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

            <div className="input-group">
              <img src={dobIcon} alt="Date of Birth Icon" />
              <input
                type="date"
                name="dob"
                value={details.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <img src={phoneIcon} alt="Phone Icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={details.phone}
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
                  value="Patient"
                  checked={details.role === 'Patient'}
                  onChange={handleChange}
                />
                Patient
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Doctor"
                  checked={details.role === 'Doctor'}
                  onChange={handleChange}
                />
                Doctor
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={details.role === 'Admin'}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>

            <button type="submit" className="btn-register" onClick={handleContinue} >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails
