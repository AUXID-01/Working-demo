// src/pages/admin/AdminRecords.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/adminLayout' // or DocLayout / Layout
import '../../page-css/AdminRecords.css'

const dummyRecords = [
  {
    id: 1,
    doctor: 'Dr. Roy',
    patient: 'John Doe',
    type: 'Consultation',
    date: '2025-09-20',
    time: '10:00',
    notes: 'Patient showed signs of improvement.',
    attachments: [
      { name: 'Prescription.pdf', url: '#' },
      { name: 'BloodTest.png', url: '#' },
    ],
  },
  {
    id: 2,
    doctor: 'Dr. Sharma',
    patient: 'Jane Smith',
    type: 'Prescription Review',
    date: '2025-09-19',
    time: '14:30',
    notes: 'Adjusted dosage based on latest tests.',
    attachments: [{ name: 'UpdatedPrescription.pdf', url: '#' }],
  },
  {
    id: 3,
    doctor: 'Dr. Mehta',
    patient: 'Alice Johnson',
    type: 'Consultation',
    date: '2025-09-18',
    time: '09:15',
    notes: 'Recommended follow-up tests next week.',
    attachments: [],
  },
]

// Helper: Group by Today / Yesterday / Earlier
const groupByDate = (records) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const grouped = { Today: [], Yesterday: [], Earlier: [] }

  records.forEach((r) => {
    const recDate = new Date(r.date)
    recDate.setHours(0, 0, 0, 0)

    if (recDate.getTime() === today.getTime()) grouped.Today.push(r)
    else if (recDate.getTime() === yesterday.getTime())
      grouped.Yesterday.push(r)
    else grouped.Earlier.push(r)
  })

  return grouped
}

function AdminRecords() {
  const [records] = useState(dummyRecords)
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')

  const toggleExpand = (id) => setExpandedId(expandedId === id ? null : id)

  // Filter by doctor or patient name
  const filteredRecords = records.filter(
    (r) =>
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase())
  )

  const grouped = groupByDate(filteredRecords)

  return (
    <AdminLayout title="Records" subtitle="Interaction & medical history">
      {/* Search */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by doctor or patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="records-container">
        {Object.entries(grouped).map(([section, recList]) =>
          recList.length > 0 ? (
            <div key={section} className="records-section">
              <h3 className="section-title">{section}</h3>
              {recList.map((rec) => (
                <div
                  key={rec.id}
                  className={`record-card ${
                    expandedId === rec.id ? 'expanded' : ''
                  }`}
                  onClick={() => toggleExpand(rec.id)}
                >
                  <div className="record-summary">
                    <h4>{rec.type}</h4>
                    <p>
                      {rec.patient} • {rec.doctor} • {rec.date} at {rec.time}
                    </p>
                  </div>

                  {expandedId === rec.id && (
                    <div className="record-details">
                      <p>
                        <strong>Notes:</strong> {rec.notes}
                      </p>
                      {rec.attachments.length > 0 && (
                        <div className="attachments">
                          <strong>Attachments:</strong>
                          <ul>
                            {rec.attachments.map((att, idx) => (
                              <li key={idx}>
                                <a
                                  href={att.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {att.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
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

export default AdminRecords
