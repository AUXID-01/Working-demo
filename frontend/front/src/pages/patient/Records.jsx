// src/pages/Records.jsx
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [filter, setFilter] = useState('All')
  const [oldReports, setOldReports] = useState([])

  const filteredRecords =
    filter === 'All'
      ? dummyRecords
      : filter === 'Old Reports'
      ? oldReports
      : dummyRecords.filter((rec) => rec.type === filter)

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const newReport = {
        id: Date.now(),
        type: 'Old Report',
        title: file.name,
        doctor: 'Uploaded by You',
        date: new Date().toISOString().split('T')[0],
        file: URL.createObjectURL(file),
      }
      setOldReports([...oldReports, newReport])
    }
  }

  // Scroll to upload section if navigated from Dashboard
 const scrollToUpload = location.state?.scrollToUpload

 useEffect(() => {
   if (scrollToUpload) {
     setFilter('Old Reports') // Activate Old Reports tab
     setTimeout(() => {
       const section = document.getElementById('upload-section')
       if (section) section.scrollIntoView({ behavior: 'smooth' })
     }, 100)
   }
 }, [scrollToUpload])


  return (
    <Layout title="Records" subtitle="Your prescriptions and test reports">
      <div className="records-page">
        {/* Filter bar */}
        <div className="filter-bar">
          {['All', 'Prescription', 'Test Report', 'Old Reports'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Upload section */}
        {filter === 'Old Reports' && (
          <div id="upload-section" className="upload-section">
            <label htmlFor="upload-input" className="btn-outline upload-btn">
              Upload Old Report
            </label>
            <input
              id="upload-input"
              type="file"
              accept=".pdf,.jpg,.png"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
          </div>
        )}

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
