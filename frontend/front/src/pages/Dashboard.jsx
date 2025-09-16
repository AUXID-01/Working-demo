// Dashboard.jsx
import React from 'react'
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
            <p>Bismillah Sharma</p>
            <small>bismillahsharma@gmail.com</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="header">
          <h2>Patient Dashboard</h2>
          <div className="header-icons">
            <FaBell />
            <FaCog />
          </div>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Upcoming Appointments</h3>
            <p>No Upcoming Appointments</p>
          </div>

          <div className="card">
            <h3>Medicine Availability</h3>
            <p>📍 Pharmacy Nearby</p>

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
          </div>

          <div className="card">
            <h3>Recent Health Records</h3>
            <p>
              Last visited on <b>20 September</b>
            </p>
            <small>Blood Test</small>
            <div className="chart-placeholder">📈</div>
          </div>

          <div className="card">
            <h3>Reminders</h3>
            <ul>
              <li>Take BP medicine at 8pm.</li>
              <li>Show up for appointment tomorrow.</li>
            </ul>
          </div>

          <div className="card">
            <h3>Symptom Checker</h3>
            <p>Your health matters</p>
            <button className="btn">Start</button>
          </div>

          <div className="card">
            <h3>Quick Actions</h3>
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
