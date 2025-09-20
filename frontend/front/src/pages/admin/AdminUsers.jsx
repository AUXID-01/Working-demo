// src/pages/admin/AdminUsers.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/adminLayout'
import '../../page-css/AdminUsers.css'

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@gmail.com', role: 'patient' },
  { id: 2, name: 'Jane Smith', email: 'jane@gmail.com', role: 'doctor' },
  { id: 3, name: 'Alice Brown', email: 'alice@gmail.com', role: 'patient' },
  { id: 4, name: 'Dr. Raj', email: 'raj@gmail.com', role: 'doctor' },
]

function AdminUsers() {
  const [users] = useState(dummyUsers)
  const [filter, setFilter] = useState('all') // role filter
  const [search, setSearch] = useState('') // search filter

  const filteredUsers = users
    .filter((u) => (filter === 'all' ? true : u.role === filter))
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AdminLayout title="Users" subtitle="Manage all users">
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
          className="role-select"
        >
          <option value="all">All Roles</option>
          <option value="doctor">Doctors</option>
          <option value="patient">Patients</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td data-label="Name">{u.name}</td>
                <td data-label="Email">{u.email}</td>
                <td
                  data-label="Role"
                  className={`role-${u.role.toLowerCase()}`}
                >
                  {u.role}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: 'center', padding: '12px' }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default AdminUsers
