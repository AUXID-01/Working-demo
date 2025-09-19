// src/pages/BookAppointments.jsx
import React, { useState } from 'react'
import Layout from '../components/Layout'
import '../page-css/BookAppointments.css'

const specialties = [
  'General Physician',
  'Pediatrician',
  'Dentist',
  'Cardiologist',
  'Dermatologist',
  'Gynecologist',
]

const doctorsBySpecialty = {
  'General Physician': ['Dr. Roy', 'Dr. Sharma'],
  Pediatrician: ['Dr. Mehta', 'Dr. Gupta'],
  Dentist: ['Dr. Sen', 'Dr. Das'],
  Cardiologist: ['Dr. Bose', 'Dr. Khan'],
  Dermatologist: ['Dr. Ray', 'Dr. Sinha'],
  Gynecologist: ['Dr. Nair', 'Dr. Verma'],
}

function BookAppointments() {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // reset doctor if specialty changes
    if (name === 'specialty') setFormData((prev) => ({ ...prev, doctor: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Booking appointment:', formData)
    alert('Appointment booked successfully!')
  }

  return (
    <Layout
      title="Book Appointment"
      subtitle="Schedule your consultation easily"
    >
      <form className="appointment-form" onSubmit={handleSubmit}>
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
              {doctorsBySpecialty[formData.specialty].map((doc) => (
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

        {/* Date & Time */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
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
          Confirm Booking
        </button>
      </form>
    </Layout>
  )
}

export default BookAppointments
