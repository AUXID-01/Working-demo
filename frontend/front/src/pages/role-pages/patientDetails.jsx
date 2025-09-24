import React from 'react'
import {
  FaVenusMars,
  FaMapMarkerAlt,
  FaPhone,
  FaAddressCard,
  FaTint,
} from 'react-icons/fa'

function PatientDetails({ formData, onChange }) {
  return (
    <>
      {/* Gender */}
      <div className="input-group">
        <FaVenusMars className="icon" />
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
          aria-label="Gender"
          required
        >
          <option value="">-- Select Gender --</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Full Address */}
      <div className="input-group">
        <FaMapMarkerAlt className="icon" />
        <textarea
          name="fullAddress"
          placeholder="Enter your full address (House no, Street, City, State, PIN)"
          aria-label="Full Address"
          value={formData.fullAddress}
          onChange={onChange}
          rows="3"
          required
        />
      </div>

      {/* Emergency Contact */}
      <div className="input-group">
        <FaPhone className="icon" />
        <input
          type="tel"
          name="emergencyContact"
          placeholder="Emergency Contact (10 digits)"
          aria-label="Emergency Contact"
          value={formData.emergencyContact}
          onChange={onChange}
          pattern="[0-9]{10}"
          required
        />
      </div>

      {/* Medical History */}
      <div className="input-group">
        <FaAddressCard className="icon" />
        <textarea
          name="medicalHistory"
          placeholder="Medical History (optional)"
          aria-label="Medical History"
          value={formData.medicalHistory}
          onChange={onChange}
          rows="3"
        />
      </div>

      {/* Blood Group */}
      <div className="input-group">
        <FaTint className="icon" />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={onChange}
          aria-label="Blood Group"
          required
        >
          <option value="">-- Select Blood Group --</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
    </>
  )
}

export default PatientDetails
