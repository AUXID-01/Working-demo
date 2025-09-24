// src/pages/DocRecords.jsx
import React, { useState } from 'react'
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
  const [filterType, setFilterType] = useState('All Records')
  const [searchTerm, setSearchTerm] = useState('')

  const types = ['All Records', ...new Set(dummyRecords.map((r) => r.type))]

  // BOTH filters combined
  const filteredRecords = dummyRecords.filter((rec) => {
    const matchesType = filterType === 'All Records' || rec.type === filterType
    const matchesSearch = rec.patient
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      alert(`File "${file.name}" uploaded!`) // replace with actual upload logic
    }
  }

  return (
    <DocLayout
      title="Patient Records"
      subtitle="View prescriptions and test reports"
    >
      <div className="records-page">
        {/* Toolbar: reverse order here (search, type filter, upload) */}
        <div
          className="records-toolbar"
          style={{ flexDirection: 'row-reverse' }}
        >
          {/* Upload Button */}
          <label
            htmlFor="upload-input-doc"
            className="btn-outline upload-btn-doc"
          >
            Upload Record
          </label>
          <input
            id="upload-input-doc"
            type="file"
            accept=".pdf,.jpg,.png"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />

          {/* Type Filter */}
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

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by patient name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Records List */}
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
