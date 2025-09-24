// src/pages/AdminProfile.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../page-css/Profile.css'

const AdminProfile = () => {
  const navigate = useNavigate()

  // Mock admin data (replace with API later)
  const admin = {
    name: 'Admin User',
    age: 30,
    email: 'admin@gmail.com',
    contact: '+91 98765 43210',
    role: 'Administrator',
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleEdit = () => {
    navigate('/edit-admin-profile')
  }

  const handleBack = () => {
    navigate('/admin-dashboard')
  }

  return (
    <div className="page-background">
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
      <div className="profile-page">
        <h1 className="page-title">My Profile</h1>

        <div className="profile-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{admin.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Age:</span>
            <span className="value">{admin.age}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{admin.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Contact:</span>
            <span className="value">{admin.contact}</span>
          </div>
          <div className="info-item">
            <span className="label">Role:</span>
            <span className="value">{admin.role}</span>
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

export default AdminProfile
