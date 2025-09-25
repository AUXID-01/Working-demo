// src/pages/EditAdminProfile.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../page-css/Profile.css'

const EditAdminProfile = () => {
  const navigate = useNavigate()

  // Mock admin data
  const [adminData, setAdminData] = useState({
    name: 'Admin User',
    age: 30,
    email: 'admin@gmail.com',
    contact: '+91 98765 43210',
    role: 'Administrator',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAdminData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: API call to save changes
    console.log('Updated admin data:', adminData)
    alert('Profile updated successfully!')
    navigate('/admin/profile')
  }

  const handleCancel = () => {
    navigate('/admin/profile')
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
              value={adminData.name}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Age:</span>
            <input
              type="number"
              name="age"
              value={adminData.age}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Email:</span>
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Contact:</span>
            <input
              type="text"
              name="contact"
              value={adminData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Role:</span>
            <input
              type="text"
              name="role"
              value={adminData.role}
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

export default EditAdminProfile
