// src/components/Layout.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaUserMd,
  FaPills,
  FaFileMedical,
  FaBell,
  FaEnvelope,
  FaCreditCard,
  FaHeartbeat,
  FaCalendarCheck,
  FaAmbulance,
  FaSearch,
  FaCog,
  FaTimes,
} from 'react-icons/fa'
import '../page-css/Dashboard.css'
import Logo from '../assets/Logo.svg'

function Layout({ title, subtitle, children }) {
  const [user, setUser] = useState(null)
  const [showEmergency, setShowEmergency] = useState(false)
  const token = localStorage.getItem('token')
  const location = useLocation()

  useEffect(() => {
    if (!token) return
    fetch('http://localhost:5000/api/user/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null))
  }, [token])

  // Emergency actions
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
            <Link to="/dashboard">
              <img src={Logo} alt="Jeevia Logo" />
            </Link>
          </div>

          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search" />
          </div>

          <nav className="menu">
            <Link
              to="/dashboard"
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              <FaCalendarAlt /> Dashboard
            </Link>
            <Link
              to="/appointments"
              className={location.pathname === '/appointments' ? 'active' : ''}
            >
              <FaCalendarCheck /> Appointments
            </Link>
            <Link
              to="/doctors"
              className={location.pathname === '/doctors' ? 'active' : ''}
            >
              <FaUserMd /> Doctors
            </Link>
            <Link
              to="/medicines"
              className={location.pathname === '/medicines' ? 'active' : ''}
            >
              <FaPills /> Medicines
            </Link>
            <Link
              to="/records"
              className={location.pathname === '/records' ? 'active' : ''}
            >
              <FaFileMedical /> Records
            </Link>
            <Link
              to="/reminders"
              className={location.pathname === '/reminders' ? 'active' : ''}
            >
              <FaBell /> Reminders
            </Link>
            <Link
              to="/messages"
              className={location.pathname === '/messages' ? 'active' : ''}
            >
              <FaEnvelope /> Messages
            </Link>
            <Link
              to="/payments"
              className={location.pathname === '/payments' ? 'active' : ''}
            >
              <FaCreditCard /> Payments
            </Link>
            <Link
              to="/symptom-checker"
              className={
                location.pathname === '/symptom-checker' ? 'active' : ''
              }
            >
              <FaHeartbeat /> Symptom Checker
            </Link>

            {/* Emergency Button */}
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

        {/* Profile Section - clickable */}
        <Link to="/profile" className="profile">
          <div className="avatar-circle">
            {user?.Username
              ? user.Username.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'H'}
          </div>
          <div>
            <p className="profile-name">{user?.Username || 'Happy'}</p>
            <small className="profile-email">
              {user?.email || 'happy@gmail.com'}
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

export default Layout
