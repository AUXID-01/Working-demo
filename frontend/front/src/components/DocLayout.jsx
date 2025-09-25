// src/components/DocLayout.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaCalendarAlt,
  FaUserMd,
  FaFileMedical,
  FaBell,
  FaEnvelope,
  FaSearch,
  FaCog,
  FaTimes,
  FaCalendarCheck,
  FaHistory,
  FaWallet,
  FaAmbulance,
} from 'react-icons/fa'
import '../page-css/Dashboard.css'
import Logo from '../assets/Logo.svg'

function DocLayout({ title, subtitle, children }) {
  const [doctor, setDoctor] = useState(null)
  const [showEmergency, setShowEmergency] = useState(false)
  const token = localStorage.getItem('token')
  const location = useLocation()

  useEffect(() => {
    if (!token) return
    fetch('http://localhost:5000/api/doctor/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch(() => setDoctor(null))
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
            <Link to="/doctor/dashboard">
              <img src={Logo} alt="Jeevia Logo" />
            </Link>
          </div>

          <div className="search-box">
            <FaSearch className="icon" />
            <input type="text" placeholder="Search Patients" />
          </div>

          <nav className="menu">
            <Link
              to="/doctor/dashboard"
              className={location.pathname === '/doctor/dashboard' ? 'active' : ''}
            >
              <FaCalendarAlt /> Dashboard
            </Link>
            <Link
              to="/doctor/appointments"
              className={
                location.pathname === '/doctor/appointments' ? 'active' : ''
              }
            >
              <FaCalendarCheck /> Appointments
            </Link>
            <Link
              to="/doctor/patients"
              className={location.pathname === '/doctor/patients' ? 'active' : ''}
            >
              <FaUserMd /> Patients
            </Link>
            <Link
              to="/doctor/records"
              className={location.pathname === '/doctor/records' ? 'active' : ''}
            >
              <FaFileMedical /> Records
            </Link>
            <Link
              to="/doctor/messages"
              className={location.pathname === '/doctor/messages' ? 'active' : ''}
            >
              <FaEnvelope /> Messages
            </Link>
            <Link
              to="/doctor/reminders"
              className={location.pathname === '/doctor/reminders' ? 'active' : ''}
            >
              <FaBell /> Reminders
            </Link>

            {/* New menu items */}
            <Link
              to="/doctor/past-sessions"
              className={
                location.pathname === '/doctor/past-sessions' ? 'active' : ''
              }
            >
              <FaHistory /> Past Sessions
            </Link>
            <Link
              to="/doctor/payments"
              className={location.pathname === '/doctor/payments' ? 'active' : ''}
            >
              <FaWallet /> Payments
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

        {/* Profile Section */}
        <Link to="/doctor/profile" className="profile">
          <div className="avatar-circle">
            {doctor?.name
              ? doctor.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'D'}
          </div>
          <div>
            <p className="profile-name">{doctor?.name || 'Doctor'}</p>
            <small className="profile-email">
              {doctor?.email || 'doctor@gmail.com'}
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

export default DocLayout
