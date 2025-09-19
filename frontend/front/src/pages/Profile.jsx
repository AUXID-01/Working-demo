// src/pages/Profile.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../page-css/Profile.css'

const Profile = () => {
  const navigate = useNavigate()

  // Mock user data (later this will come from backend / context)
  const user = {
    name: 'Happy Sharma',
    age: 21,
    email: 'happy@gmail.com',
    contact: '+91 98765 43210',
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // clear session
    navigate('/login')
  }

  const handleEdit = () => {
    navigate('/edit-profile')
  }

  return (
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
  )
}

export default Profile
