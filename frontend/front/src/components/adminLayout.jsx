// src/components/AdminLayout.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaUsers,
  FaUserMd,
  FaFileMedical,
  FaBell,
  FaEnvelope,
  FaCog,
  FaTimes,
  FaCreditCard,
  FaSearch,
  FaAmbulance,
  FaChartLine,
} from 'react-icons/fa'
import '../page-css/Dashboard.css'
import Logo from '../assets/Logo.svg'

function AdminLayout({ title, subtitle, children }) {
  const [admin, setAdmin] = useState(null)
  const [showEmergency, setShowEmergency] = useState(false)
  const token = localStorage.getItem('token')
  const location = useLocation()

  useEffect(() => {
    if (!token) return
    fetch('http://localhost:5000/api/admin/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setAdmin(data))
      .catch(() => setAdmin(null))
  }, [token])

  // Emergency actions (optional)
  const handleCallAmbulance = () => alert('🚑 Calling Ambulance...')
  const handleCallEmergencyHelp = () =>
    alert('📞 Calling Emergency Medical Help...')
  const handleNotifyContact = () => alert('📲 Notifying Emergency Contact...')

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="logo">
            <Link to="/admin/dashboard">
              <img src={Logo} alt="Jeevia Logo" />
            </Link>
          </div>

          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search" />
          </div>

          <nav className="menu">
            <Link
              to="/admin/dashboard"
              className={
                location.pathname === '/admin/dashboard' ? 'active' : ''
              }
            >
              <FaChartLine /> Dashboard
            </Link>
            <Link
              to="/admin/users"
              className={location.pathname === '/admin/users' ? 'active' : ''}
            >
              <FaUsers /> Users
            </Link>
            <Link
              to="/admin/doctors"
              className={location.pathname === '/admin/doctors' ? 'active' : ''}
            >
              <FaUserMd /> Doctors
            </Link>
            <Link
              to="/admin/patients"
              className={
                location.pathname === '/admin/patients' ? 'active' : ''
              }
            >
              <FaUsers /> Patients
            </Link>
            <Link
              to="/admin/records"
              className={location.pathname === '/admin/records' ? 'active' : ''}
            >
              <FaFileMedical /> Past Sessions
            </Link>
            <Link
              to="/admin/messages"
              className={
                location.pathname === '/admin/messages' ? 'active' : ''
              }
            >
              <FaEnvelope /> Messages
            </Link>
            <Link
              to="/admin/payments"
              className={
                location.pathname === '/admin/payments' ? 'active' : ''
              }
            >
              <FaCreditCard /> Payments
            </Link>
            <Link
              to="/admin/reports"
              className={location.pathname === '/admin/reports' ? 'active' : ''}
            >
              <FaChartLine /> Reports
            </Link>

            {/* Optional Emergency */}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                setShowEmergency(true)
              }}
            >
              <FaAmbulance /> Emergency
            </Link>
          </nav>
        </div>

        {/* Profile Section */}
        <Link to="/admin/profile" className="profile">
          <div className="avatar-circle">
            {admin?.name
              ? admin.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'A'}
          </div>
          <div>
            <p className="profile-name">{admin?.name || 'Admin'}</p>
            <small className="profile-email">
              {admin?.email || 'admin@gmail.com'}
            </small>
          </div>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="header">
          <div className="header-text">
            <h2 className="dashboard-title">{title}</h2>
            <h3 className="dashboard-subtitle">{subtitle}</h3>
          </div>
          <div className="header-icons">
            <FaBell />
            <FaCog />
          </div>
        </header>

        <section className="main-content">{children}</section>
      </main>

      {/* Emergency Modal */}
      {showEmergency && (
        <div
          className="emergency-overlay"
          onClick={() => setShowEmergency(false)}
        >
          <div className="emergency-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="emergency-close"
              onClick={() => setShowEmergency(false)}
            >
              <FaTimes size={20} />
            </button>

            <div className="emergency-header">
              <FaAmbulance size={40} color="#006157" />
              <h2>Are you okay?</h2>
            </div>

            <div className="emergency-actions">
              <button
                className="emergency-btn ambulance"
                onClick={handleCallAmbulance}
              >
                Call Ambulance
              </button>
              <button
                className="emergency-btn medical"
                onClick={handleCallEmergencyHelp}
              >
                Call Emergency Medical Help
              </button>
              <button
                className="emergency-btn contact"
                onClick={handleNotifyContact}
              >
                Notify Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLayout
