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
} from 'react-icons/fa'

function DocDashboard() {
  const [doctor, setDoctor] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const token = localStorage.getItem('token')

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
          <h3>
            <FaCalendarAlt /> Quick Actions
          </h3>
          <div className="card-content">
            <ul>
              <li>⭕ Add Patient Record</li>
              <li>📤 Send Message</li>
            </ul>
          </div>
        </div>

      </section>
    </DocLayout>
  )
}

export default DocDashboard
