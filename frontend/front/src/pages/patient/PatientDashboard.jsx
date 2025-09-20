// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
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
} from 'react-icons/fa'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [loadingAppointments, setLoadingAppointments] = useState(true)
  const token = localStorage.getItem('token')

  // Fetch user
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

  // Fetch appointments
  useEffect(() => {
    if (!token) return
    setLoadingAppointments(true)

    fetch('http://localhost:5000/api/appointments/upcoming', {
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
    <Layout title="Patient Dashboard" subtitle="Stay on top of your health">
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
                    <strong>{appt.type}</strong> with <span>{appt.doctor}</span>
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

        {/* Medicine Availability */}
        <div className="card medicine">
          <h3>
            <FaPills /> Medicine Availability
          </h3>
          <div className="card-content">
            <p>📍 Pharmacy Nearby</p>
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords
                      const mapsUrl = `https://www.google.com/maps/search/open+pharmacy/@${latitude},${longitude},15z`
                      window.open(mapsUrl, '_blank')
                    },
                    () => {
                      alert('Unable to fetch location. Please enable GPS.')
                    }
                  )
                } else {
                  alert('Geolocation is not supported by your browser.')
                }
              }}
              className="map-btn"
            >
              Find Pharmacies Near Me
            </button>
          </div>
        </div>

        {/* Recent Health Records */}
        <div className="card records">
          <h3>
            <FaFileMedical /> Recent Health Records
          </h3>
          <div className="card-content">
            <p>
              Last visited on <b>20 September</b>
            </p>
            <small>Blood Test</small>
            <div className="chart-placeholder">📈</div>
          </div>
        </div>

        {/* Reminders */}
        <div className="card reminders">
          <h3>
            <FaBell /> Reminders
          </h3>
          <div className="card-content">
            <ul>
              <li>Take tmkc BP medicine at 8pm.</li>
              <li>Show up for appointment tomorrow.</li>
            </ul>
          </div>
        </div>

        {/* Symptom Checker */}
        <div className="card symptom-checker">
          <h3>
            <FaHeartbeat /> Symptom Checker
          </h3>
          <div className="card-content">
            <p>Your health matters</p>
            <button className="btn">Start</button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card quick-actions">
          <h3>
            <FaCalendarAlt /> Quick Actions
          </h3>
          <div className="card-content">
            <ul>
              <li>⭕ Book Appointment</li>
              <li>📤 Upload Report</li>
            </ul>
          </div>
        </div>

        {/* Emergency */}
        <div className="card emergency">
          <h3>
            <FaAmbulance /> Emergency
          </h3>
          <div className="card-content">
            <p>Call your nearest hospital in case of emergency.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Dashboard
