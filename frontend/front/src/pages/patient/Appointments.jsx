import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../page-css/Appointments.css'

const dummyAppointments = [
  {
    id: 1,
    type: 'General Checkup',
    doctor: 'Dr. Sharma',
    date: '2025-09-24',
    time: '10:00 AM',
    location: 'Apollo Hospital, Room 12',
    mode: 'In-person',
    notes: 'Bring previous blood reports',
  },
  {
    id: 2,
    type: 'Dental Consultation',
    doctor: 'Dr. Roy',
    date: '2025-09-20',
    time: '2:30 PM',
    location: 'Smile Dental Clinic',
    mode: 'Home Visit',
    notes: 'Discuss tooth sensitivity treatment',
  },
  {
    id: 3,
    type: 'Eye Examination',
    doctor: 'Dr. Mehta',
    date: '2025-09-21',
    time: '5:00 PM',
    location: 'Vision Eye Care Center',
    mode: 'Online',
    notes: 'Routine vision test and lens update',
  },
  {
    id: 4,
    type: 'Cardiology Review',
    doctor: 'Dr. Banerjee',
    date: '2025-09-25',
    time: '11:00 AM',
    location: 'Fortis Heart Institute',
    mode: 'In-person',
    notes: 'Follow-up after ECG',
  },
]

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const updated = dummyAppointments.map((appt) => ({
        ...appt,
        status: getStatus(appt.date, appt.time),
      }))
      setAppointments(updated)
      setLoading(false)
    }, 500)
  }, [])

  const getStatus = (apptDate, apptTime) => {
    const now = new Date()
    const [hours, minutes] = apptTime.split(/[: ]/).map(Number)
    const isPM = apptTime.toLowerCase().includes('pm')
    const apptHour = isPM && hours < 12 ? hours + 12 : hours
    const apptDateTime = new Date(apptDate)
    apptDateTime.setHours(apptHour, minutes, 0)

    if (apptDateTime < now) {
      return Math.random() > 0.5 ? 'Completed' : 'Missed'
    }
    return 'Upcoming'
  }

  const handleJoin = (id) => navigate(`/appointments/${id}/join`)

  const filteredAppointments =
    filter === 'All'
      ? appointments
      : appointments.filter((a) => a.status === filter)

  // Upcoming subdivisions
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

  const divideUpcoming = (list) => {
    return {
      today: list.filter((a) => a.date === today),
      tomorrow: list.filter((a) => a.date === tomorrow),
      later: list.filter((a) => a.date !== today && a.date !== tomorrow),
    }
  }

  const renderAppointmentsList = (list) =>
    list.length === 0 ? (
      <p className="no-appointments">No appointments here</p>
    ) : (
      list.map((appt) => (
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
              <span className={`status-badge ${appt.status.toLowerCase()}`}>
                {appt.status}
              </span>
            </div>
          </div>
          <div className="appointment-details">
            <p>
              <strong>Doctor:</strong> {appt.doctor}
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
          {appt.mode === 'Online' && appt.status === 'Upcoming' && (
            <button className="join-btn" onClick={() => handleJoin(appt.id)}>
              Join Meeting
            </button>
          )}
        </li>
      ))
    )

  const renderUpcomingSections = (list) => {
    const { today, tomorrow, later } = divideUpcoming(list)
    return (
      <>
        <h3>Today</h3>
        {renderAppointmentsList(today)}
        <h3>Tomorrow</h3>
        {renderAppointmentsList(tomorrow)}
        <h3>Later</h3>
        {renderAppointmentsList(later)}
      </>
    )
  }

  return (
    <Layout title="Appointments" subtitle="Your scheduled visits">
      <div className="appointments-container no-top-gap">
        <h2>Filter by Status:</h2>
        <div className="filter-buttons">
          {['All', 'Upcoming', 'Completed', 'Missed'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filter === 'Upcoming' ? (
          renderUpcomingSections(filteredAppointments)
        ) : (
          renderAppointmentsList(filteredAppointments)
        )}
      </div>
    </Layout>
  )
}

export default Appointments
