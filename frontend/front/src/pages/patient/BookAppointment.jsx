// src/pages/BookAppointments.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../../page-css/BookAppointments.css'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'


const specialties = [
  'General Physician',
  'Pediatrician',
  'Dentist',
  'Cardiologist',
  'Dermatologist',
  'Gynecologist',
  'Neurologist',
]

const doctorsBySpecialty = {
  'General Physician': ['Dr. Roy', 'Dr. Sharma'],
  Pediatrician: ['Dr. Mehta', 'Dr. Gupta'],
  Dentist: ['Dr. Sen', 'Dr. Das', 'Dr. Priya Nair'],
  Cardiologist: ['Dr. Bose', 'Dr. Khan', 'Dr. Aditi Sharma'],
  Dermatologist: ['Dr. Ray', 'Dr. Sinha', 'Dr. Rajesh Kumar'],
  Gynecologist: ['Dr. Nair', 'Dr. Verma'],
  Neurologist: ['Dr. Arjun Mehta'],
}

// Date options: next 30 days
const getNextDates = (days = 30) => {
  const dates = []
  for (let i = 0; i < days; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const formatted = d.toISOString().split('T')[0] // yyyy-mm-dd
    dates.push(formatted)
  }
  return dates
}

// Time options: 9:00 to 18:00 every 30 minutes
const getTimeSlots = () => {
  const times = []
  for (let h = 9; h <= 17; h++) {
    times.push(`${h.toString().padStart(2, '0')}:00`)
    times.push(`${h.toString().padStart(2, '0')}:30`)
  }
  times.push('18:00')
  return times
}


function BookAppointments() {
  const navigate = useNavigate()
  const location = useLocation()
  const doctorData = location.state || {}

  const [formData, setFormData] = useState({
    specialty: '',
    doctor: '',
    appointmentType: 'online',
    date: '',
    time: '',
    address: '',
    reason: '',
    notes: '',
    contactInfo: '',
  })

  // ✅ Prefill doctor & specialty if navigated from Doctors page
  useEffect(() => {
    if (doctorData.doctor && doctorData.specialty) {
      setFormData((prev) => ({
        ...prev,
        doctor: doctorData.doctor,
        specialty: doctorData.specialty,
      }))
    }
  }, [doctorData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'specialty') setFormData((prev) => ({ ...prev, doctor: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking appointment:', formData)
    alert('Appointment booked successfully!')
  }

  return (
    <div className="appointment-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/doctors')}>
        ← Back to Doctors
      </button>

      <form className="appointment-form" onSubmit={handleSubmit}>
        <h2 className="page-title">Book Appointment</h2>
        <p className="page-subtitle">Schedule your consultation easily</p>
        {/* Specialty */}
        <div className="form-group">
          <label>Select Specialty</label>
          <select
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose Specialty --</option>
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        {formData.specialty && (
          <div className="form-group">
            <label>Select Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Doctor --</option>
              {doctorsBySpecialty[formData.specialty]?.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Appointment Type */}
        <div className="form-group">
          <label>Appointment Type</label>
          <select
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleChange}
          >
            <option value="online">Online (Video/Call)</option>
            <option value="offline">Offline (Clinic Visit)</option>
            <option value="home">Home Visit</option>
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <div className="select-wrapper">
            <select
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="select-input"
            >
              <option value="">-- Select Date --</option>
              {getNextDates().map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <FaCalendarAlt className="select-icon" />
          </div>
        </div>

        {/* Time */}
        <div className="form-group">
          <label>Time</label>
          <div className="select-wrapper">
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="select-input"
            >
              <option value="">-- Select Time --</option>
              {getTimeSlots().map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <FaClock className="select-icon" />
          </div>
        </div>

        {/* Address (Home Visit only) */}
        {formData.appointmentType === 'home' && (
          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Reason */}
        <div className="form-group">
          <label>Reason for Appointment</label>
          <textarea
            name="reason"
            placeholder="Symptoms or reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        {/* Notes */}
        <div className="form-group">
          <label>Additional Notes</label>
          <textarea
            name="notes"
            placeholder="Any extra instructions"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Contact Info (Online only) */}
        {formData.appointmentType === 'online' && (
          <div className="form-group">
            <label>Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Email or Phone"
              value={formData.contactInfo}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="btn">
          Book Appointment
        </button>
      </form>
    </div>
  )
}

export default BookAppointments
