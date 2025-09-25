// src/pages/Medicines.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import '../../page-css/Medicines.css'

const dummyMedicines = [
  {
    id: 1,
    name: 'Paracetamol',
    dosage: '500mg',
    frequency: '2 times/day',
    duration: '7 days',
    doctor: 'Dr. Sharma',
    status: 'Active',
    lastTaken: null,
  },
  {
    id: 2,
    name: 'Amoxicillin',
    dosage: '250mg',
    frequency: '3 times/day',
    duration: '5 days',
    doctor: 'Dr. Roy',
    status: 'Active',
    lastTaken: null,
  },
  {
    id: 3,
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once/day',
    duration: '30 days',
    doctor: 'Dr. Mehta',
    status: 'Completed',
    lastTaken: null,
  },
]

function Medicines() {
  const [medicines, setMedicines] = useState(dummyMedicines)
  const navigate = useNavigate()

  // Ask for notification permission once
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  const markTaken = (id) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, lastTaken: new Date().toLocaleString() } : med
      )
    )
  }

  // 🚀 Redirect to Reminders page with medicine prefilled
  const setReminder = (id) => {
    const med = medicines.find((m) => m.id === id)
    if (!med) return

    navigate('/patient/reminders', {
      state: {
        prefill: {
          text: `Take ${med.name} (${med.dosage})`,
          date: new Date().toISOString().split('T')[0], // default today
        },
      },
    })
  }

  return (
    <Layout
      title="Medicines"
      subtitle="View and manage your prescribed medicines"
    >
      <div className="medicines-container">
        {medicines.map((med) => (
          <div key={med.id} className="medicine-card">
            <div className="medicine-info">
              <strong>{med.name}</strong>
              <p>
                {med.dosage} • {med.frequency} • {med.duration}
              </p>
              <p className="doctor">Prescribed by {med.doctor}</p>
              <span className={`status-badge ${med.status.toLowerCase()}`}>
                {med.status}
              </span>
              {med.lastTaken && (
                <p className="last-taken">Last taken: {med.lastTaken}</p>
              )}
            </div>
            <div className="medicine-actions">
              {med.status === 'Active' ? (
                <>
                  <button className="btn" onClick={() => markTaken(med.id)}>
                    Mark Taken
                  </button>
                  <button
                    className="btn-outline"
                    onClick={() => setReminder(med.id)}
                  >
                    Set Reminder
                  </button>
                </>
              ) : (
                <span className="no-actions">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Medicines
