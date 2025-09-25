// src/pages/Patients.jsx
import React, { useState, useEffect } from 'react'
import DocLayout from '../../components/DocLayout'
import { FaVenusMars, FaEnvelope, FaPhone } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../../page-css/doc-patient.css'

function Patients() {
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [search, setSearch] = useState('')
  const [filterGender, setFilterGender] = useState('All')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // Dummy patient data
  const samplePatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 34,
      gender: 'Male',
      phone: '+91 98765 43210',
      email: 'john.doe@gmail.com',
      lastVisit: '2025-09-10',
      condition: 'Hypertension',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 28,
      gender: 'Female',
      phone: '+91 91234 56789',
      email: 'jane.smith@gmail.com',
      lastVisit: '2025-09-12',
      condition: 'Diabetes',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      age: 45,
      gender: 'Female',
      phone: '+91 99887 77665',
      email: 'alice.johnson@gmail.com',
      lastVisit: '2025-09-15',
      condition: 'Cardiac Checkup',
    },
    {
      id: 4,
      name: 'Bob Kumar',
      age: 50,
      gender: 'Male',
      phone: '+91 90909 80808',
      email: 'bob.kumar@gmail.com',
      lastVisit: '2025-09-18',
      condition: 'General Checkup',
    },
  ]

  useEffect(() => {
    if (!token) {
      setPatients(samplePatients)
      setFilteredPatients(samplePatients)
      return
    }

    fetch('http://localhost:5000/api/patients', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPatients(data)
          setFilteredPatients(data)
        } else {
          setPatients(samplePatients)
          setFilteredPatients(samplePatients)
        }
      })
      .catch(() => {
        setPatients(samplePatients)
        setFilteredPatients(samplePatients)
      })
  }, [token])

  // Filter and search
  useEffect(() => {
    let list = [...patients]

    if (search.trim()) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.condition.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filterGender !== 'All') {
      list = list.filter((p) => p.gender === filterGender)
    }

    setFilteredPatients(list)
  }, [search, filterGender, patients])

  const genders = ['All', 'Male', 'Female', 'Other']

  return (
    <DocLayout title="Patients" subtitle="View and manage your patients">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or condition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          className="filter-select"
        >
          {genders.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button className="search-btn" onClick={() => setSearch(search.trim())}>
          Search
        </button>
      </div>

      <div className="patient-list">
        {filteredPatients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          filteredPatients.map((p) => (
            <div className="patient-card" key={p.id}>
              <div className="patient-info">
                <h3>{p.name}</h3>
                <p>
                  <FaVenusMars /> {p.gender}, {p.age} yrs
                </p>
                <p>
                  <strong>Condition:</strong> {p.condition}
                </p>
                <p>
                  <strong>Last Visit:</strong> {p.lastVisit}
                </p>
                <p className="contact">
                  <FaPhone /> {p.phone} <br />
                  <FaEnvelope /> {p.email}
                </p>
                <div className="patient-actions">
                  <button
                    className="btn view"
                    onClick={() =>
                      navigate(`/doctor/patients/${p.id}`, { state: { patient: p } })
                    }
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DocLayout>
  )
}

export default Patients
