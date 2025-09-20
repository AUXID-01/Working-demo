// src/pages/DocAppointments.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DocLayout from '../../components/DocLayout'
import '../../page-css/Appointments.css'

// Dummy appointments for demonstration
const dummyAppointments = [
  {
    id: 1,
    type: 'General Checkup',
    patientName: 'John Doe',
    date: '2025-09-19',
    time: '10:00 AM',
    location: 'Apollo Hospital, Room 12',
    mode: 'In-person',
    notes: 'Bring previous blood reports',
  },
  {
    id: 2,
    type: 'Dental Consultation',
    patientName: 'Jane Smith',
    date: '2025-09-20',
    time: '2:30 PM',
    location: 'Smile Dental Clinic',
    mode: 'Home Visit',
    notes: 'Discuss tooth sensitivity treatment',
  },
  {
    id: 3,
    type: 'Eye Examination',
    patientName: 'Alice Johnson',
    date: '2025-09-21',
    time: '5:00 PM',
    location: 'Vision Eye Care Center',
    mode: 'Online',
    notes: 'Routine vision test and lens update',
  },
  {
    id: 4,
    type: 'Cardiology Review',
    patientName: 'Bob Kumar',
    date: '2025-09-25',
    time: '11:00 AM',
    location: 'Fortis Heart Institute',
    mode: 'In-person',
    notes: 'Follow-up after ECG',
  },
]

function DocAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Simulate API load
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setAppointments(dummyAppointments)
      setLoading(false)
    }, 500)
  }, [])

  // Dates for filtering
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const todayAppointments = appointments.filter((a) => a.date === today)
  const tomorrowAppointments = appointments.filter((a) => a.date === tomorrow)
  const laterAppointments = appointments.filter(
    (a) => a.date !== today && a.date !== tomorrow
  )

  const handleJoin = (id) => {
    navigate(`/doc-appointments/${id}/join`)
  }

  // Render helper
  const renderAppointments = (title, list) => (
    <div className="appointments-section">
      <h3>{title}</h3>
      {list.length === 0 ? (
        <p className="no-appointments">No {title.toLowerCase()} appointments</p>
      ) : (
        <ul className="appointments-list">
          {list.map((appt) => (
            <li key={appt.id} className="appointment-card">
              <div className="appointment-header">
                <h4>{appt.type}</h4>
                <div className="appointment-meta">
                  <span
                    className={`mode-badge ${appt.mode
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {appt.mode}
                  </span>
                  <span className="appointment-date">{appt.date}</span>
                </div>
              </div>

              <div className="appointment-details">
                <p>
                  <strong>Patient:</strong> {appt.patientName}
                </p>
                <p>
                  <strong>Time:</strong> {appt.time}
                </p>
                <p>
                  <strong>Location:</strong> {appt.location}
                </p>
                <p className="notes">
                  <strong>Notes:</strong> {appt.notes}
                </p>
              </div>

              {appt.mode === 'Online' && (
                <button
                  className="join-btn"
                  onClick={() => handleJoin(appt.id)}
                >
                  Join Meeting
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  return (
    <DocLayout title="Appointments" subtitle="Your scheduled patient visits">
      <div className="appointments-container no-top-gap">
        <h2>Upcoming Appointments</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <>
            {renderAppointments('Today', todayAppointments)}
            {renderAppointments('Tomorrow', tomorrowAppointments)}
            {renderAppointments('Later', laterAppointments)}
          </>
        )}
      </div>
    </DocLayout>
  )
}

export default DocAppointments
