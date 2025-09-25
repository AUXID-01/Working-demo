// src/pages/Doctors.jsx
import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { FaStar, FaPhone, FaEnvelope, FaCalendarCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom' // 👈 import navigate
import '../../page-css/Doctors.css'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [search, setSearch] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('All')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const sampleDoctors = [
    {
      id: 1,
      name: 'Dr. Aditi Sharma',
      specialization: 'Cardiologist',
      hospital: 'Apollo Hospital',
      experience: 12,
      rating: 4.8,
      phone: '+91 98765 43210',
      email: 'aditi.sharma@apollo.com',
      availability: 'Mon - Fri, 10 AM - 5 PM',
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Dermatologist',
      hospital: 'Fortis Clinic',
      experience: 9,
      rating: 4.5,
      phone: '+91 91234 56789',
      email: 'rajesh.kumar@fortis.com',
      availability: 'Tue - Sat, 11 AM - 6 PM',
    },
    {
      id: 3,
      name: 'Dr. Priya Nair',
      specialization: 'Dentist',
      hospital: 'Smile Dental Care',
      experience: 7,
      rating: 4.2,
      phone: '+91 99887 77665',
      email: 'priya.nair@smilecare.com',
      availability: 'Mon - Thu, 9 AM - 3 PM',
    },
    {
      id: 4,
      name: 'Dr. Arjun Mehta',
      specialization: 'Neurologist',
      hospital: 'Max Healthcare',
      experience: 15,
      rating: 4.9,
      phone: '+91 90909 80808',
      email: 'arjun.mehta@maxhealth.com',
      availability: 'Mon - Sat, 2 PM - 8 PM',
    },
  ]

  useEffect(() => {
    if (!token) {
      setDoctors(sampleDoctors)
      setFilteredDoctors(sampleDoctors)
      return
    }

    fetch('http://localhost:5000/api/doctors', {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data)
          setFilteredDoctors(data)
        } else {
          setDoctors(sampleDoctors)
          setFilteredDoctors(sampleDoctors)
        }
      })
      .catch(() => {
        setDoctors(sampleDoctors)
        setFilteredDoctors(sampleDoctors)
      })
  }, [token])

  useEffect(() => {
    let list = [...doctors]

    if (search.trim()) {
      list = list.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialization.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filterSpecialty !== 'All') {
      list = list.filter((doc) => doc.specialization === filterSpecialty)
    }

    setFilteredDoctors(list)
  }, [search, filterSpecialty, doctors])

  const specialties = [
    'All',
    'Cardiologist',
    'Dermatologist',
    'Dentist',
    'Neurologist',
  ]

  return (
    <Layout title="Doctors" subtitle="Find and connect with doctors">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or specialty"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
          className="filter-select"
        >
          {specialties.map((sp) => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </select>

        <button className="search-btn" onClick={() => setSearch(search.trim())}>
          Search
        </button>
      </div>

      <div className="doctor-list">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filteredDoctors.map((doc) => (
            <div className="doctor-card" key={doc.id}>
              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p className="specialization">{doc.specialization}</p>
                <p className="hospital">{doc.hospital}</p>
                <p>{doc.experience} years of experience</p>
                <p className="availability">Availability: {doc.availability}</p>
                <p className="contact">
                  <FaPhone /> {doc.phone} <br />
                  <FaEnvelope /> {doc.email}
                </p>
                <p className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      color={i < Math.round(doc.rating) ? '#facc15' : '#d1d5db'}
                    />
                  ))}
                  <span>{doc.rating.toFixed(1)}</span>
                </p>
                <div className="doctor-actions">
                  <button
                    className="btn book"
                    onClick={() =>
                      navigate('/patient/book-appointment', {
                        state: {
                          doctor: doc.name,
                          specialty: doc.specialization,
                        },
                      })
                    }
                  >
                    <FaCalendarCheck /> Book
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}

export default Doctors
