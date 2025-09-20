// src/pages/DocRecords.jsx
import React, { useState, useEffect } from 'react'
import DocLayout from '../../components/DocLayout'
import '../../page-css/Records.css'

const dummyRecords = [
  {
    id: 1,
    patient: 'John Doe',
    type: 'Prescription',
    title: 'Prescription - Fever',
    date: '2025-09-10',
    file: '/files/prescription1.pdf',
  },
  {
    id: 2,
    patient: 'Jane Smith',
    type: 'Test Report',
    title: 'Blood Test Report',
    date: '2025-09-12',
    file: '/files/report1.pdf',
  },
  {
    id: 3,
    patient: 'Alice Johnson',
    type: 'X-Ray',
    title: 'Chest X-Ray',
    date: '2025-09-15',
    file: '/files/xray1.pdf',
  },
  {
    id: 4,
    patient: 'Bob Kumar',
    type: 'Prescription',
    title: 'Prescription - Diabetes',
    date: '2025-09-18',
    file: '/files/prescription2.pdf',
  },
]

function DocRecords() {
  const [filterPatient, setFilterPatient] = useState('All Patients')
  const [filterType, setFilterType] = useState('All Records')

  // extract unique patient names for filter dropdown
  const patients = ['All Patients', ...new Set(dummyRecords.map((r) => r.patient))]
  const types = ['All Records', ...new Set(dummyRecords.map((r) => r.type))]

  const filteredRecords = dummyRecords.filter((rec) => {
    const matchesPatient =
      filterPatient === 'All Patients' || rec.patient === filterPatient
    const matchesType = filterType === 'All Records' || rec.type === filterType
    return matchesPatient && matchesType
  })

  return (
    <DocLayout
      title="Patient Records"
      subtitle="View prescriptions and test reports"
    >
      <div className="records-page">
        {/* Filter bar */}
        <div className="filter-bar">
          <select
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
            className="filter-select"
          >
            {patients.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Records list */}
        <div className="records-container">
          {filteredRecords.length === 0 && (
            <p className="no-records">No records available</p>
          )}

          {filteredRecords.map((rec) => (
            <div key={rec.id} className="record-card">
              <div className="record-info">
                <h3 className="title">{rec.title}</h3>
                <p className="meta">
                  {rec.type} • {rec.patient} • {rec.date}
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
        </div>
      </div>
    </DocLayout>
  )
}

export default DocRecords
