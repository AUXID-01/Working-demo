// src/pages/EditProfile.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../page-css/Profile.css'

const EditProfile = () => {
  const navigate = useNavigate()

  // Mock initial user data (replace with API call later)
  const [userData, setUserData] = useState({
    name: 'Happy Sharma',
    age: 21,
    email: 'happy@gmail.com',
    contact: '+91 98765 43210',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Call API to save changes
    console.log('Updated user data:', userData)
    alert('Profile updated successfully!')
    navigate('/patient/profile')
  }

  const handleCancel = () => {
    navigate('/patient/profile')
  }

  return (
    <div className="page-background">
      <div className="profile-page">
        <h1 className="page-title">Edit Profile</h1>

        <div className="profile-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Age:</span>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Email:</span>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Contact:</span>
            <input
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="profile-buttons">
          <button className="btn primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
