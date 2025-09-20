import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { FaBell, FaTrash, FaPlus } from 'react-icons/fa'
import '../../page-css/Reminders.css'

function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Doctor appointment', date: '2025-09-21', time: '10:30' },
    { id: 2, text: 'Team meeting', date: '2025-09-22', time: '14:00' },
    { id: 3, text: 'Buy groceries', date: '2025-09-23', time: '18:30' },
  ])
  const [newText, setNewText] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('')
  const token = localStorage.getItem('token')

  // Fetch existing reminders (API)
  useEffect(() => {
    if (!token) return

    fetch('http://localhost:5000/api/reminders', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReminders(data)
        }
      })
      .catch(() => {
        console.log('API not available, using sample data.')
      })
  }, [token])

  // Add new reminder
  const addReminder = () => {
    if (!newText.trim() || !newDate || !newTime) return

    const reminder = {
      id: Date.now(), // temporary id for UI
      text: newText,
      date: newDate,
      time: newTime,
    }

    setReminders([...reminders, reminder]) // show instantly

    fetch('http://localhost:5000/api/reminders', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminder),
    })
      .then((res) => res.json())
      .then((saved) => {
        setReminders((prev) =>
          prev.map((r) => (r.id === reminder.id ? saved : r))
        )
      })
      .catch(() => alert('Failed to save reminder'))

    setNewText('')
    setNewDate('')
    setNewTime('')
  }

  // Delete reminder
  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id)) // remove instantly

    fetch(`http://localhost:5000/api/reminders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).catch(() => alert('Failed to delete reminder'))
  }

  // --- Helper: Group reminders by Today / Tomorrow / Later ---
  const groupReminders = () => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const todayStr = today.toISOString().split('T')[0]
    const tomorrowStr = tomorrow.toISOString().split('T')[0]

    const groups = { Today: [], Tomorrow: [], Later: [] }

    reminders.forEach((r) => {
      if (r.date === todayStr) {
        groups.Today.push(r)
      } else if (r.date === tomorrowStr) {
        groups.Tomorrow.push(r)
      } else if (new Date(r.date) > tomorrow) {
        groups.Later.push(r)
      }
    })

    return groups
  }

  const grouped = groupReminders()

  return (
    <Layout title="Reminders" subtitle="Stay on top of your schedule">
      <div className="reminder-form">
        <input
          type="text"
          placeholder="Reminder text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button className="btn add" onClick={addReminder}>
          <FaPlus /> Add
        </button>
      </div>

      {/* Sectioned List */}
      <div className="reminder-list">
        {Object.keys(grouped).map((section) =>
          grouped[section].length > 0 ? (
            <div key={section}>
              <h3 className="section-title">{section}</h3>
              {grouped[section].map((r) => (
                <div className="reminder-card" key={r.id}>
                  <div className="reminder-info">
                    <FaBell className="icon" />
                    <div>
                      <p>{r.text}</p>
                      <small>
                        {r.date} at {r.time}
                      </small>
                    </div>
                  </div>
                  <button
                    className="btn delete"
                    onClick={() => deleteReminder(r.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </Layout>
  )
}

export default Reminders
