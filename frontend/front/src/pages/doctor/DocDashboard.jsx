// src/pages/DocDashboard.jsx
import React, { useState, useEffect } from 'react'
import DocLayout from '../../components/DocLayout'
import {
  FaCalendarAlt,
  FaUserMd,
  FaFileMedical,
  FaBell,
  FaEnvelope,
  FaHeartbeat,
  FaCalendarCheck,
  FaUpload,
  FaUserPlus,
} from 'react-icons/fa'

import { useNavigate } from 'react-router-dom'

function DocDashboard() {
  const [doctor, setDoctor] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const token = localStorage.getItem('token')
  const buttonStyle = {
    background: '#16685E',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
  }

   const navigate = useNavigate()

  const hoverEffect = (e, isHover) => {
    e.target.style.background = isHover ? '#0d4c42' : '#16685E'
    e.target.style.transform = isHover ? 'translateY(-2px)' : 'translateY(0)'
  }


  // Fetch doctor info
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

  // Fetch doctor appointments
  useEffect(() => {
    if (!token) return
    setLoadingAppointments(true)

    fetch('http://localhost:5000/api/doctor/appointments/upcoming', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data || [])
        setLoadingAppointments(false)
      })
      .catch(() => {
        setAppointments([])
        setLoadingAppointments(false)
      })
  }, [token])

  return (
    <DocLayout
      title="Doctor Dashboard"
      subtitle="Manage your patients efficiently"
    >
      <section className="cards">
        {/* Upcoming Appointments */}
        <div className="card appointments">
          <h3>
            <FaCalendarCheck /> Upcoming Appointments
          </h3>
          <div className="card-content">
            {loadingAppointments ? (
              <p>Loading...</p>
            ) : appointments.length === 0 ? (
              <p>No Upcoming Appointments</p>
            ) : (
              <ul>
                {appointments.map((appt) => (
                  <li key={appt.id}>
                    <strong>{appt.patientName}</strong> ({appt.type})
                    <br />
                    <small>
                      {appt.date} at {appt.time}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Patient Records */}
        <div className="card records">
          <h3>
            <FaFileMedical /> Patient Records
          </h3>
          <div className="card-content">
            <p>Recently updated records</p>
            <small>Click to view full details</small>
            <div className="chart-placeholder">📈</div>
          </div>
        </div>

        {/* Messages */}
        <div className="card messages">
          <h3>
            <FaEnvelope /> Messages
          </h3>
          <div className="card-content">
            <ul>
              <li>Message from patient John Doe</li>
              <li>Message from patient Jane Smith</li>
            </ul>
          </div>
        </div>

        {/* Reminders */}
        <div className="card reminders">
          <h3>
            <FaBell /> Reminders
          </h3>
          <div className="card-content">
            <ul>
              <li>Check lab results by today 5 PM</li>
              <li>Prepare prescription for upcoming appointments</li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCalendarAlt />
            Quick Actions
          </h3>
          <div className="card-content">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <button
                  onClick={() => navigate('/doc-reminders')}
                  style={buttonStyle}
                  onMouseEnter={(e) => hoverEffect(e, true)}
                  onMouseLeave={(e) => hoverEffect(e, false)}
                >
                  <FaBell />
                  Set Reminder
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/doc-records')}
                  style={buttonStyle}
                  onMouseEnter={(e) => hoverEffect(e, true)}
                  onMouseLeave={(e) => hoverEffect(e, false)}
                >
                  <FaUserPlus />
                  Add Patient Record
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </DocLayout>
  )
}

export default DocDashboard
