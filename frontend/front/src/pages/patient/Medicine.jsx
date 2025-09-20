// src/pages/Medicines.jsx
import React, { useState } from 'react'
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
  },
  {
    id: 2,
    name: 'Amoxicillin',
    dosage: '250mg',
    frequency: '3 times/day',
    duration: '5 days',
    doctor: 'Dr. Roy',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Vitamin D3',
    dosage: '1000 IU',
    frequency: 'Once/day',
    duration: '30 days',
    doctor: 'Dr. Mehta',
    status: 'Completed',
  },
]

function Medicines() {
  const [medicines, setMedicines] = useState(dummyMedicines)

  const markTaken = (id) => {
    console.log(`Medicine ${id} marked as taken`)
    // you can update state if needed
  }

  const setReminder = (id) => {
    console.log(`Reminder set for medicine ${id}`)
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
