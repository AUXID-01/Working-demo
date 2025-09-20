// src/pages/DocPastSessions.jsx
import React, { useState } from 'react'
import DocLayout from '../../components/DocLayout'
import { FaStar } from 'react-icons/fa'
import '../../page-css/PastSessions.css'

// Helper to format date as YYYY-MM-DD
const formatDate = (d) => d.toISOString().split('T')[0]

// Define Today and Yesterday
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

const dummySessions = [
  // Today
  {
    id: 1,
    patient: 'John Doe',
    service: 'Consultation',
    date: formatDate(today),
    time: '10:00',
    status: 'Completed',
    rating: 4,
    feedback: 'Very satisfied with the consultation. Clear advice.',
    notes: 'Prescribed medication for fever.',
  },
  {
    id: 2,
    patient: 'Emily Clark',
    service: 'Follow-up Consultation',
    date: formatDate(today),
    time: '15:00',
    status: 'Completed',
    rating: 5,
    feedback: 'Excellent session, very thorough.',
    notes: 'Advised to continue current treatment.',
  },

  // Yesterday
  {
    id: 3,
    patient: 'Jane Smith',
    service: 'Prescription Review',
    date: formatDate(yesterday),
    time: '14:30',
    status: 'Completed',
    rating: 5,
    feedback: 'Quick and helpful review. Thank you!',
    notes: 'Updated prescription dosage.',
  },
  {
    id: 4,
    patient: 'Mark Wilson',
    service: 'Consultation',
    date: formatDate(yesterday),
    time: '09:15',
    status: 'Completed',
    rating: 4,
    feedback: 'Good consultation, clear explanation of symptoms.',
    notes: 'Recommended lifestyle changes.',
  },

  // Earlier
  {
    id: 5,
    patient: 'Alice Johnson',
    service: 'Consultation',
    date: '2025-09-05',
    time: '09:15',
    status: 'Completed',
    rating: 3,
    feedback: 'Good consultation, but a bit rushed.',
    notes: 'Suggested follow-up in 2 weeks.',
  },
]

// Helper: Group sessions by Today / Yesterday / Earlier
const groupSessionsByDate = (sessions) => {
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(todayStart.getDate() - 1)

  const grouped = { Today: [], Yesterday: [], Earlier: [] }

  sessions.forEach((s) => {
    const sessionDate = new Date(s.date)
    sessionDate.setHours(0, 0, 0, 0)

    if (sessionDate.getTime() === todayStart.getTime()) grouped.Today.push(s)
    else if (sessionDate.getTime() === yesterdayStart.getTime())
      grouped.Yesterday.push(s)
    else grouped.Earlier.push(s)
  })

  return grouped
}

function DocPastSessions() {
  const [sessions] = useState(dummySessions)
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const grouped = groupSessionsByDate(sessions)

  return (
    <DocLayout
      title="Past Sessions"
      subtitle="View your completed appointments and feedback"
    >
      <div className="past-sessions-container">
        {Object.entries(grouped).map(([section, sessionList]) =>
          sessionList.length > 0 ? (
            <div key={section} className="sessions-section">
              <h3 className="section-title">{section}</h3>
              {sessionList.map((session) => (
                <div
                  key={session.id}
                  className={`session-card ${
                    expandedId === session.id ? 'expanded' : ''
                  }`}
                  onClick={() => toggleExpand(session.id)}
                >
                  <div className="session-summary">
                    <h4>{session.patient}</h4>
                    <p>
                      {session.service} • {session.date} at {session.time}
                    </p>
                    <span className={`status ${session.status.toLowerCase()}`}>
                      {session.status}
                    </span>
                  </div>

                  {expandedId === session.id && (
                    <div className="session-details">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={i < session.rating ? '#fbbf24' : '#ddd'}
                          />
                        ))}
                      </div>
                      <p>
                        <strong>Feedback:</strong> {session.feedback}
                      </p>
                      <p>
                        <strong>Notes:</strong> {session.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </DocLayout>
  )
}

export default DocPastSessions
