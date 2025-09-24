import React from 'react'
import { FaFileUpload, FaIdCard } from 'react-icons/fa'

function DoctorVerificationDocs({ formData, onChange }) {
  return (
    <>
      <h3 style={{ marginBottom: '1rem', textAlign: 'center', color: '#0B463F' }}>
        Verification Documents
      </h3>

      {/* Upload Degree / License Certificate */}
      <label className="input-label">
        Upload Degree / License Certificate
        <div className="input-group">
          <FaFileUpload className="icon" />
          <input
            type="file"
            name="degreeCertificate"
            aria-label="Upload Degree/License Certificate"
            onChange={onChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>
      </label>

      {/* Upload ID Proof */}
      <label className="input-label" style={{ marginTop: '1rem' }}>
        Upload ID Proof
        <div className="input-group">
          <FaIdCard className="icon" />
          <input
            type="file"
            name="idProof"
            aria-label="Upload ID Proof"
            onChange={onChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>
      </label>
    </>
  )
}

export default DoctorVerificationDocs
