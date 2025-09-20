import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../../page-css/Records.css'

const dummyRecords = [
  {
    id: 1,
    type: 'Prescription',
    title: 'Prescription - Fever',
    doctor: 'Dr. Sharma',
    date: '2025-09-10',
    file: '/files/prescription1.pdf',
  },
  {
    id: 2,
    type: 'Test Report',
    title: 'Blood Test Report',
    doctor: 'Dr. Roy',
    date: '2025-09-12',
    file: '/files/report1.pdf',
  },
  {
    id: 3,
    type: 'Prescription',
    title: 'Prescription - Diabetes',
    doctor: 'Dr. Mehta',
    date: '2025-09-15',
    file: '/files/prescription2.pdf',
  },
]

function Records() {
  const [filter, setFilter] = useState('All')

  const filteredRecords =
    filter === 'All'
      ? dummyRecords
      : dummyRecords.filter((rec) => rec.type === filter)

  return (
    <Layout title="Records" subtitle="Your prescriptions and test reports">
      <div className="records-page">
        {/* Filter bar */}
        <div className="filter-bar">
          {['All', 'Prescription', 'Test Report'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Records list */}
        <div className="records-container">
          {filteredRecords.map((rec) => (
            <div key={rec.id} className="record-card">
              <div className="record-info">
                <h3 className="title">{rec.title}</h3>
                <p className="meta">
                  {rec.type} • {rec.doctor} • {rec.date}
                </p>
              </div>
              <div className="record-actions">
                <a
                  href={rec.file}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline"
                >
                  View File
                </a>
              </div>
            </div>
          ))}

          {filteredRecords.length === 0 && (
            <p className="no-records">No records available</p>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Records
