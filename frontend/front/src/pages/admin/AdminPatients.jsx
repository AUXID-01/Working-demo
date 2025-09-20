// src/pages/admin/AdminPatients.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import '../../page-css/AdminPatients.css'

const dummyPatients = [
  {
    id: 1,
    name: 'John Doe',
    gender: 'Male',
    age: 32,
    email: 'john@gmail.com',
    phone: '+91 9876543210',
    address: '123 Main St, City',
  },
  {
    id: 2,
    name: 'Jane Smith',
    gender: 'Female',
    age: 28,
    email: 'jane@gmail.com',
    phone: '+91 9123456780',
    address: '456 Park Ave, City',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    gender: 'Female',
    age: 40,
    email: 'alice@gmail.com',
    phone: '+91 9988776655',
    address: '789 Elm St, City',
  },
]

function AdminPatients() {
  const [patients] = useState(dummyPatients)
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState('All')

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Filter & search
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesGender = genderFilter === 'All' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  const genders = ['All', 'Male', 'Female', 'Other']

  return (
    <AdminLayout title="Patients" subtitle="Manage all patients">
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
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="filter-select"
        >
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
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
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <React.Fragment key={p.id}>
                <tr className="patient-row" onClick={() => toggleExpand(p.id)}>
                  <td>{p.name}</td>
                  <td>{p.gender}</td>
                  <td>{p.age}</td>
                  <td>{p.email}</td>
                </tr>
                {expandedId === p.id && (
                  <tr className="patient-details-row">
                    <td colSpan="4">
                      <div className="patient-details">
                        <p>
                          <strong>Phone:</strong> {p.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {p.address}
                        </p>
                        <p>
                          <strong>Gender:</strong> {p.gender}
                        </p>
                        <p>
                          <strong>Age:</strong> {p.age}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: 'center', padding: '12px' }}
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminPatients
