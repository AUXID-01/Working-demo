// src/pages/EditDocProfile.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../page-css/Profile.css'

const EditDocProfile = () => {
  const navigate = useNavigate()

  // Mock initial doctor data (replace with API call later)
  const [doctorData, setDoctorData] = useState({
    name: 'Dr. Happy Sharma',
    age: 35,
    email: 'dr.happy@gmail.com',
    contact: '+91 98765 43210',
    specialization: 'Cardiology',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDoctorData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // TODO: Call API to save changes
    console.log('Updated doctor data:', doctorData)
    alert('Profile updated successfully!')
    navigate('/doc-profile') // navigate back to doctor profile
  }

  const handleCancel = () => {
    navigate('/doc-profile')
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
              value={doctorData.name}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Age:</span>
            <input
              type="number"
              name="age"
              value={doctorData.age}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Email:</span>
            <input
              type="email"
              name="email"
              value={doctorData.email}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Contact:</span>
            <input
              type="text"
              name="contact"
              value={doctorData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="info-item">
            <span className="label">Specialization:</span>
            <input
              type="text"
              name="specialization"
              value={doctorData.specialization}
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

export default EditDocProfile
