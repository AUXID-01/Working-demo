// src/pages/Messages.jsx
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../../page-css/Messages.css'

// Example data with timestamps
const dummyMessages = [
  {
    id: 1,
    title: 'Appointment Reminder',
    content: 'Your appointment with Dr. Roy is tomorrow at 10:00 AM.',
    read: false,
    createdAt: new Date(), // today
  },
  {
    id: 2,
    title: 'New Message',
    content: 'Dr. Sharma has sent you a message regarding your prescription.',
    read: false,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)), // yesterday
  },
  {
    id: 3,
    title: 'Payment Update',
    content: 'Your payment for consultation has been received.',
    read: true,
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)), // 3 days ago
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

function Messages() {
  const [messages, setMessages] = useState(dummyMessages)

  const toggleRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    )
  }

  const grouped = groupMessagesByDate(messages)

  return (
    <Layout title="Messages" subtitle="Stay updated with your notifications">
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
                    <p>{msg.content}</p>
                    <span className="message-time">
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </Layout>
  )
}

export default Messages
