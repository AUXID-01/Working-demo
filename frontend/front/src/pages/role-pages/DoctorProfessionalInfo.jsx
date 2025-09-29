import React from 'react'
import {
  FaBriefcase,
  FaIdBadge,
  FaUserMd,
  FaGraduationCap,
} from 'react-icons/fa'

function DoctorProfessionalInfo({ formData, onChange }) {
  return (
    <>
      {/* Medical Registration Number */}
      <div className="input-group">
        <FaIdBadge className="icon" />
        <input
  type="text"
  name="registrationNumber" // updated
  placeholder="Medical Registration Number"
  value={formData.registrationNumber}
  onChange={onChange}
  required
/>
      </div>

      {/* Specialization */}
      <div className="input-group">
        <FaBriefcase className="icon" />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (e.g. Cardiology)"
          aria-label="Specialization"
          value={formData.specialization}
          onChange={onChange}
          required
        />
      </div>

      {/* Years of Experience */}
      <div className="input-group">
        <FaUserMd className="icon" />
        <input
          type="number"
          name="experienceYears"
          placeholder="Years of Experience"
          aria-label="Years of Experience"
          min="0"
          value={formData.experienceYears}
          onChange={onChange}
          required
        />
      </div>

      {/* Qualifications */}
      <div className="input-group">
        <FaGraduationCap className="icon" />
        <input
          type="text"
          name="qualifications"
          placeholder="Qualifications (e.g. MBBS, MD)"
          aria-label="Qualifications"
          value={formData.qualifications}
          onChange={onChange}
          required
        />
      </div>
    </>
  )
}

export default DoctorProfessionalInfo
