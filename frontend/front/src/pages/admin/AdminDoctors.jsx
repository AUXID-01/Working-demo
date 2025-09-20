// src/pages/admin/AdminDoctors.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import '../../page-css/AdminDoctors.css'

const dummyDoctors = [
  {
    id: 1,
    name: 'Dr. Roy',
    specialty: 'Cardiology',
    gender: 'Male',
    email: 'roy@gmail.com',
    phone: '+91 9876543210',
    experience: '10 years',
    clinic: 'Heart Care Clinic',
  },
  {
    id: 2,
    name: 'Dr. Sharma',
    specialty: 'Neurology',
    gender: 'Female',
    email: 'sharma@gmail.com',
    phone: '+91 9123456780',
    experience: '8 years',
    clinic: 'Neuro Health Center',
  },
  {
    id: 3,
    name: 'Dr. Mehta',
    specialty: 'Orthopedics',
    gender: 'Male',
    email: 'mehta@gmail.com',
    phone: '+91 9988776655',
    experience: '12 years',
    clinic: 'Ortho Clinic',
  },
]

function AdminDoctors() {
  const [doctors] = useState(dummyDoctors)
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Filter & search
  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'All' || d.specialty === filter
    return matchesSearch && matchesFilter
  })

  // Get unique specialties for filter dropdown
  const specialties = ['All', ...new Set(doctors.map((d) => d.specialty))]

  return (
    <AdminLayout title="Doctors" subtitle="Manage all doctors">
      {/* Filter bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Specialty</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((d) => (
              <React.Fragment key={d.id}>
                <tr className="doctor-row" onClick={() => toggleExpand(d.id)}>
                  <td>{d.name}</td>
                  <td>{d.gender}</td>
                  <td>{d.specialty}</td>
                  <td>{d.email}</td>
                </tr>
                {expandedId === d.id && (
                  <tr className="doctor-details-row">
                    <td colSpan="4">
                      <div className="doctor-details">
                        <p>
                          <strong>Phone:</strong> {d.phone}
                        </p>
                        <p>
                          <strong>Experience:</strong> {d.experience}
                        </p>
                        <p>
                          <strong>Clinic:</strong> {d.clinic}
                        </p>
                        <p>
                          <strong>Gender:</strong> {d.gender}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredDoctors.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: 'center', padding: '12px' }}
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminDoctors
