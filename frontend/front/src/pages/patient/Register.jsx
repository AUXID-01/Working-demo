import React, { useState } from 'react'
import '../../page-css/Register.css'

// React Icons
import {
  FaUser,
  FaLock,
  FaPhone,
  FaCalendarAlt,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaBriefcase,
} from 'react-icons/fa'

// Role-specific forms
import PatientDetails from '../role-pages/patientDetails'
import DoctorProfessionalInfo from '../role-pages/DoctorProfessionalInfo'
import DoctorVerificationDocs from '../role-pages/DoctorVerificationDocs'
import DoctorPracticeDetails from '../role-pages/DoctorPracticeDetails'
import AdminDetails from '../role-pages/adminDetails'

function Register() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: 'patient', // occupation

    // Patient
    gender: '',
    address: '',
    emergencyContact: '',
    bloodGroup: '',
    medicalHistory: '',

    // Doctor
    specialization: '',
    licenseNumber: '',
    experienceYears: '',
    qualifications: '',
    clinicName: '',
    clinicAddress: '',
    consultationFee: '',

    // Admin
    employeeId: '',
    adminRole: '',
    organization: '',
    contactDetails: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState(null)

  // Input handler
  const handleChange = (e) => {
    const { name, value, files, type } = e.target
    // support file inputs (if used in doctor docs components)
    if (type === 'file') {
      setFormData({ ...formData, [name]: files })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // Step 1: Frontend validation only
  const handleContinue = (e) => {
    e.preventDefault()

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setError(null)

    // both doctor and other roles go to step 2, but doctors will continue to step 3 & 4
    setStep(2)
  }

  // Move Next (or submit on final step)
  const handleNext = async (e) => {
    e.preventDefault()
    setError(null)

    // Doctor has multi-step flow (steps 2,3,4)
    if (formData.role === 'doctor') {
      if (step < 4) {
        setStep((s) => s + 1)
        return
      } else {
        // step === 4 -> final submit
        await handleRegister(e)
        return
      }
    }

    // Patient/Admin: single step (step 2) -> final submit
    await handleRegister(e)
  }

  // Back navigation
  const handleBack = (e) => {
    e.preventDefault()
    setError(null)
    // if on step 2 and you want to go back to step 1
    if (step > 1) setStep((s) => s - 1)
  }

  // Final submission to backend
  const handleRegister = async (e) => {
    e.preventDefault()

    const formattedFormData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString().split('T')[0]
        : null,
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedFormData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setError(data.errors[0].msg)
        } else {
          setError(data.message || 'Registration failed')
        }
        return
      }

      alert('Registration successful!')
      window.location.href = '/dashboard'
    } catch (err) {
      console.error(err)
      setError('Registration failed. Try again.')
    }
  }

  return (
    <div className="page-background">
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Register</h2>
          <p className="register-subtitle">
            {step === 1 ? 'Create your account' : 'Enter your details'}
          </p>

          {/* IMPORTANT: onSubmit is step 1 -> handleContinue, otherwise handleNext */}
          <form onSubmit={step === 1 ? handleContinue : handleNext}>
            {step === 1 ? (
              <>
                {/* Full Name */}
                <div className="input-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="input-group">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="input-group password-group">
                  <FaLock className="icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>

                {/* Confirm Password */}
                <div className="input-group password-group">
                  <FaLock className="icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {showConfirmPassword ? (
                    <FaEye
                      className="eye-icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>

                {/* Phone Number */}
                <div className="input-group phone-icon">
                  <FaPhone className="icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date of Birth */}
                <div className="input-group">
                  <FaCalendarAlt className="icon" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Role */}
                <div className="input-group">
                  <FaBriefcase className="icon" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {error && <p className="error-text">{error}</p>}

                <button type="submit" className="btn-register">
                  Register
                </button>
              </>
            ) : (
              <>
                {/* Role-specific details */}
                {/* Patient & Admin are single-step after step 1.
                    Doctor has multi-step pages (2,3,4). */}

                {formData.role === 'patient' && step === 2 && (
                  <PatientDetails formData={formData} onChange={handleChange} />
                )}

                {formData.role === 'admin' && step === 2 && (
                  <AdminDetails formData={formData} onChange={handleChange} />
                )}

                {/* Doctor multi-step */}
                {formData.role === 'doctor' && step === 2 && (
                  <DoctorProfessionalInfo
                    formData={formData}
                    onChange={handleChange}
                  />
                )}
                {formData.role === 'doctor' && step === 3 && (
                  <DoctorVerificationDocs
                    formData={formData}
                    onChange={handleChange}
                  />
                )}
                {formData.role === 'doctor' && step === 4 && (
                  <DoctorPracticeDetails
                    formData={formData}
                    onChange={handleChange}
                  />
                )}

                {error && <p className="error-text">{error}</p>}

                {/* Buttons: Back + Submit/Next (Submit triggers handleNext which either moves to next or calls handleRegister) */}
                <div
                  style={{ display: 'flex', gap: '12px', marginTop: '12px' }}
                >
                  <button
                    type="button"
                    className="btn-register"
                    onClick={handleBack}
                    style={{
                      background: '#eee',
                      color: '#222',
                      flex: '0 0 120px',
                    }}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn-register"
                    style={{ flex: 1 }}
                  >
                    {/* For doctor show Next until last page */}
                    {formData.role === 'doctor'
                      ? step < 4
                        ? 'Next'
                        : 'Submit'
                      : 'Submit'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
