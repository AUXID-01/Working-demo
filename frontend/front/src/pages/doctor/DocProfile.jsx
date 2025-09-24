// src/pages/DocProfile.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../page-css/Profile.css'

const DocProfile = () => {
  const navigate = useNavigate()

  // Mock user data (later replace with backend/context)
  const user = {
    name: 'Dr. Doctor ',
    age: 35,
    email: 'Doctor@gmail.com',
    contact: '+91 98765 43210',
    specialization: 'Cardiology', // extra field for doctors
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // clear session
    navigate('/login')
  }

  const handleEdit = () => {
    navigate('/edit-doc-profile')
  }

  const handleBack = () => {
    navigate('/doc-dashboard')
  }

  return (
    <div className="page-background">
      {/* Back button outside the card */}
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>

      <div className="profile-page">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Age:</span>
            <span className="value">{user.age}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Contact:</span>
            <span className="value">{user.contact}</span>
          </div>
          <div className="info-item">
            <span className="label">Specialization:</span>
            <span className="value">{user.specialization}</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button className="btn primary" onClick={handleEdit}>
            Edit Details
          </button>
          <button className="btn danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default DocProfile
