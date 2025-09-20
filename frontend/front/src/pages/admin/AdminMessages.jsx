// src/pages/admin/AdminMessages.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/adminLayout'
import '../../page-css/AdminMessages.css'

const dummyMessages = [
  {
    id: 1,
    sender: 'John Doe',
    subject: 'Appointment Inquiry',
    content: 'Hello, I would like to reschedule my appointment.',
    date: '2025-09-20',
    time: '09:30',
  },
  {
    id: 2,
    sender: 'Jane Smith',
    subject: 'Prescription Question',
    content: 'Can you clarify the dosage for my medication?',
    date: '2025-09-21',
    time: '14:00',
  },
  {
    id: 3,
    sender: 'Alice Johnson',
    subject: 'Follow-up',
    content: 'Thank you for the last consultation. I have a few questions.',
    date: '2025-09-18',
    time: '11:15',
  },
]

// Helper: Group messages by Today / Tomorrow / Earlier
const groupMessagesByDate = (messages) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const grouped = { Today: [], Tomorrow: [], Earlier: [] }

  messages.forEach((msg) => {
    const msgDate = new Date(msg.date)
    msgDate.setHours(0, 0, 0, 0)

    if (msgDate.getTime() === today.getTime()) grouped.Today.push(msg)
    else if (msgDate.getTime() === tomorrow.getTime())
      grouped.Tomorrow.push(msg)
    else grouped.Earlier.push(msg)
  })

  return grouped
}

function AdminMessages() {
  const [messages] = useState(dummyMessages)
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id)

  const filteredMessages = messages.filter(
    (msg) =>
      msg.sender.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = groupMessagesByDate(filteredMessages)

  return (
    <AdminLayout title="Messages" subtitle="Manage all messages">
      {/* Search */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by sender or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="messages-container">
        {Object.entries(grouped).map(([section, msgList]) =>
          msgList.length > 0 ? (
            <div key={section} className="messages-section">
              <h3 className="section-title">{section}</h3>
              {msgList.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-card ${
                    expandedId === msg.id ? 'expanded' : ''
                  }`}
                  onClick={() => toggleExpand(msg.id)}
                >
                  <div className="message-summary">
                    <h4>{msg.subject}</h4>
                    <p>
                      {msg.sender} • {msg.date} at {msg.time}
                    </p>
                  </div>

                  {expandedId === msg.id && (
                    <div className="message-details">
                      <p>{msg.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminMessages
