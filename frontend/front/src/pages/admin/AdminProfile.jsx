// src/pages/admin/AdminProfile.jsx
import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/adminLayout'
import { useNavigate } from 'react-router-dom'
import '../../page-css/AdminProfile.css'

function AdminProfile() {
  const [admin, setAdmin] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return

    const fetchAdmin = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/me', {
          headers: { Authorization: 'Bearer ' + token },
        })
        const data = await res.json()
        setAdmin(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchAdmin()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login') // redirect to login
  }

  const handleEdit = () => {
    navigate('/admin-edit-profile') // redirect to admin edit page
  }

  return (
    <AdminLayout title="Profile" subtitle="Manage your admin account">
      <div className="profile-container">
        <div className="profile-card">
          {/* Avatar */}
          <div className="avatar">
            {admin?.name
              ? admin.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'A'}
          </div>

          {/* Name & Role */}
          <h2>{admin?.name || 'Admin'}</h2>
          <p className="profile-role">ADMIN</p>

          {/* Details Section */}
          <div className="profile-info">
            <div>
              <strong>Name:</strong> {admin?.name || 'N/A'}
            </div>
            <div>
              <strong>Email:</strong> {admin?.email || 'N/A'}
            </div>
            <div>
              <strong>Contact:</strong> {admin?.contact || 'N/A'}
            </div>
            <div>
              <strong>Age:</strong> {admin?.age || 'N/A'}
            </div>
            <div>
              <strong>Gender:</strong> {admin?.gender || 'N/A'}
            </div>
            <div>
              <strong>Role:</strong> {admin?.role || 'ADMIN'}
            </div>
          </div>

          {/* Actions */}
          <div className="profile-actions">
            <button className="btn edit-btn" onClick={handleEdit}>
              Edit Details
            </button>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminProfile
