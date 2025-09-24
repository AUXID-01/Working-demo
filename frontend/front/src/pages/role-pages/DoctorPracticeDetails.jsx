import React from 'react'
import {
  FaHospital,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
} from 'react-icons/fa'

function DoctorPracticeDetails({ formData, onChange }) {
  return (
    <>
      {/* Hospital/Clinic Name */}
      <div className="input-group">
        <FaHospital className="icon" />
        <input
          type="text"
          name="clinicName"
          placeholder="Hospital/Clinic Name"
          aria-label="Hospital/Clinic Name"
          value={formData.clinicName}
          onChange={onChange}
          required
        />
      </div>

      {/* Clinic Address */}
      <div className="input-group textarea-group">
        <FaMapMarkerAlt className="icon" />
        <textarea
          name="clinicAddress"
          placeholder="Clinic Full Address"
          aria-label="Clinic Address"
          value={formData.clinicAddress}
          onChange={onChange}
          rows="3"
          required
        />
      </div>

      {/* Consultation Timings */}
      <div className="input-group">
        <FaClock className="icon" />
        <input
          type="text"
          name="consultationTimings"
          placeholder="Consultation Timings (e.g. 9am - 1pm, 5pm - 8pm)"
          aria-label="Consultation Timings"
          value={formData.consultationTimings}
          onChange={onChange}
          required
        />
      </div>

      {/* Consultation Fee */}
      <div className="input-group">
        <FaRupeeSign className="icon" />
        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          aria-label="Consultation Fee"
          min="0"
          value={formData.consultationFee}
          onChange={onChange}
          required
        />
      </div>
    </>
  )
}

export default DoctorPracticeDetails
