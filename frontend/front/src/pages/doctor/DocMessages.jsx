// src/pages/DocMessages.jsx
import React, { useState } from 'react'
import DocLayout from '../../components/DocLayout'
import '../../page-css/Messages.css'

// Example data with timestamps
const dummyMessages = [
  {
    id: 1,
    sender: 'John Doe',
    title: 'Appointment Request',
    content:
      'Patient John Doe requested an appointment for 2025-09-21 at 3:00 PM.',
    read: false,
    createdAt: new Date(), // today
  },
  {
    id: 2,
    sender: 'Jane Smith',
    title: 'Prescription Follow-up',
    content: 'Patient Jane Smith asked for clarification on her prescription.',
    read: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // yesterday
  },
  {
    id: 3,
    sender: 'Hospital Admin',
    title: 'Lab Report Update',
    content: 'New lab reports have been uploaded for review.',
    read: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)), // 4 days ago
  },
]

// Utility: format time like "10:30 AM"
const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

// Utility: group by "Today", "Yesterday", "Earlier"
const groupMessagesByDate = (messages) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const yesterday = new Date(today - 86400000)

  return {
    Today: messages.filter((msg) => msg.createdAt >= today),
    Yesterday: messages.filter(
      (msg) => msg.createdAt < today && msg.createdAt >= yesterday
    ),
    Earlier: messages.filter((msg) => msg.createdAt < yesterday),
  }
}

function DocMessages() {
  const [messages, setMessages] = useState(dummyMessages)

  const toggleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    )
  }

  const grouped = groupMessagesByDate(messages)

  return (
    <DocLayout
      title="Messages"
      subtitle="Stay updated with patient requests and notifications"
    >
      <div className="messages-container">
        {Object.entries(grouped).map(
          ([section, msgs]) =>
            msgs.length > 0 && (
              <div key={section} className="message-section">
                <h3 className="message-section-title">{section}</h3>
                {msgs.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message-item ${msg.read ? 'read' : 'unread'}`}
                    onClick={() => toggleRead(msg.id)}
                  >
                    <strong>{msg.title}</strong>
                    <p>
                      <em>From: {msg.sender}</em>
                      <br />
                      {msg.content}
                    </p>
                    <span className="message-time">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </DocLayout>
  )
}

export default DocMessages
