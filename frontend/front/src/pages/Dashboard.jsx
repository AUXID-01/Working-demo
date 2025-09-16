// Dashboard.jsx
import React, { useState, useEffect } from 'react'
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
} from 'react-icons/fa'
import '../page-css/Dashboard.css'

function Dashboard() {
  const [user, setUser] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'
      return
    }

    fetch('http://localhost:5000/api/user/me', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        } else {
          setUser(data)
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      })
  }, [token])

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Swasthya</div>
        <div className="search-box">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search" />
        </div>

        <nav className="menu">
          <a className="active">
            <FaCalendarAlt /> Dashboard
          </a>
          <a>
            <FaCalendarCheck /> Appointments
          </a>
          <a>
            <FaUserMd /> Doctors
          </a>
          <a>
            <FaPills /> Medicines
          </a>
          <a>
            <FaFileMedical /> Records
          </a>
          <a>
            <FaBell /> Reminders
          </a>
          <a>
            <FaEnvelope /> Messages
          </a>
          <a>
            <FaCreditCard /> Payments
          </a>
          <a>
            <FaHeartbeat /> Symptom Checker
          </a>
          <a>
            <FaCalendarCheck /> Book Appointment
          </a>
          <a>
            <FaAmbulance /> Emergency
          </a>
        </nav>

        <div className="profile">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="avatar"
          />
          <div>
            <p className="profile-name">{user?.Username || "Bismillah Sharma"}</p>
            <small className="profile-email">{user?.email || "bismillahsharma@gmail.com"}</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="header">
          <h2 className="dashboard-title">Patient Dashboard</h2>
          <div className="header-icons">
            <FaBell />
            <FaCog />
          </div>
        </header>

        <section className="cards">
          <div className="card appointments">
            <h3>
              <FaCalendarCheck style={{ color: '#16685e', marginRight: '8px' }} />
              Upcoming Appointments
            </h3>
            <p>No Upcoming Appointments</p>
          </div>

          <div className="card medicine">
            <h3>
              <FaPills style={{ color: '#16685e', marginRight: '8px' }} />
              Medicine Availability
            </h3>
            <p>📍 Pharmacy Nearby</p>
<<<<<<< HEAD

            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords
                    const mapsUrl = `https://www.google.com/maps/search/open+pharmacy/@${latitude},${longitude},15z`
                    window.open(mapsUrl, '_blank')
                  })
                } else {
                  alert('Geolocation is not supported by your browser.')
                }
              }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'blue',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                fontSize: 'inherit',
              }}
            >
              Go to Maps
            </button>
=======
            <a href="#" style={{ color: '#16685e', textDecoration: 'underline' }}>
              Go to Maps
            </a>
>>>>>>> 293d0b060a4075f31178d23dfeb6caa86563effe
          </div>

          <div className="card records">
            <h3>
              <FaFileMedical style={{ color: '#16685e', marginRight: '8px' }} />
              Recent Health Records
            </h3>
            <p>
              Last visited on <b>20 September</b>
            </p>
            <small>Blood Test</small>
            <div className="chart-placeholder">📈</div>
          </div>

          <div className="card reminders">
            <h3>
              <FaBell style={{ color: '#16685e', marginRight: '8px' }} />
              Reminders
            </h3>
            <ul>
              <li>Take BP medicine at 8pm.</li>
              <li>Show up for appointment tomorrow.</li>
            </ul>
          </div>

          <div className="card symptom-checker">
            <h3>
              <FaHeartbeat style={{ color: '#fd5a5a', marginRight: '8px' }} />
              Symptom Checker
            </h3>
            <p>Your health matters</p>
            <button className="btn">Start</button>
          </div>

          <div className="card quick-actions">
            <h3>
              <FaCalendarAlt style={{ color: '#16685e', marginRight: '8px' }} />
              Quick Actions
            </h3>
            <ul>
              <li>⭕ Book Appointment</li>
              <li>📤 Upload Report</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
