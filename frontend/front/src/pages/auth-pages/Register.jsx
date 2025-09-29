import React, { useState } from 'react';
import '../../page-css/Register.css';

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
} from 'react-icons/fa';

// Role-specific forms
import PatientDetails from '../role-pages/patientDetails';
import DoctorProfessionalInfo from '../role-pages/DoctorProfessionalInfo';
import DoctorVerificationDocs from '../role-pages/DoctorVerificationDocs';
import DoctorPracticeDetails from '../role-pages/DoctorPracticeDetails';
import AdminDetails from '../role-pages/adminDetails';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    role: 'patient',

    // Patient
    gender: '',
    address: '',
    emergencyContact: '',
    bloodGroup: '',
    medicalHistory: '',

    // Doctor
    registrationNumber: '',
    specialization: '',
    experienceYears: '',
    qualifications: '',
    hospitalName: '',
    clinicAddress: '',
    consultationTimings: '',
    consultationFee: '',
    degreeCertificate: null,
    idProof: null,

    // Admin
    employeeId: '',
    adminRole: '',
    organization: '',
    contactDetails: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError(null);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setError(null);

    // Doctor multi-step
    if (formData.role === 'doctor') {
      if (step < 4) {
        setStep((s) => s + 1);
        return;
      } else {
        await handleRegister(e);
        return;
      }
    }

    // Patient/Admin submit
    await handleRegister(e);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setError(null);
    if (step > 1) setStep((s) => s - 1);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Doctor registration with FormData for files
    if (formData.role === 'doctor') {
      try {
        const formPayload = new FormData();

        // Common fields
        formPayload.append('username', formData.username);
        formPayload.append('firstName', formData.firstName);
        formPayload.append('lastName', formData.lastName);
        formPayload.append('email', formData.email);
        formPayload.append('password', formData.password);
        formPayload.append('phoneNumber', formData.phoneNumber);
        formPayload.append(
          'dateOfBirth',
          formData.dateOfBirth
            ? new Date(formData.dateOfBirth).toISOString().split('T')[0]
            : ''
        );
        formPayload.append('role', formData.role);

        // Doctor-specific
        formPayload.append('registrationNumber', formData.registrationNumber);
        formPayload.append('specialization', formData.specialization);
        formPayload.append('experienceYears', formData.experienceYears);
        formPayload.append('qualifications', formData.qualifications);
        formPayload.append('hospitalName', formData.hospitalName);
        formPayload.append('clinicAddress', formData.clinicAddress);
        formPayload.append('consultationTimings', formData.consultationTimings);
        formPayload.append('consultationFee', formData.consultationFee);

        // File uploads
        if (formData.degreeCertificate?.length > 0) {
          formPayload.append('degreeCertificate', formData.degreeCertificate[0]);
        }
        if (formData.idProof?.length > 0) {
          formPayload.append('idProof', formData.idProof[0]);
        }

        const response = await fetch('http://localhost:5000/api/doctor/register', {
          method: 'POST',
          body: formPayload,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Registration failed');

        alert('Registration successful!');
        window.location.href = '/doctor/dashboard';
      } catch (err) {
        console.error(err);
        setError(err.message || 'Registration failed. Try again.');
      }
      return;
    }

    // Patient/Admin registration
    const formattedFormData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString().split('T')[0]
        : null,
    };

    const url =
      formData.role === 'admin'
        ? 'http://localhost:5000/api/admin/register'
        : 'http://localhost:5000/api/patient/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedFormData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      alert('Registration successful!');
      window.location.href =
        formData.role === 'admin' ? '/admin/dashboard' : '/patient/dashboard';
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="page-background">
      <button
        type="button"
        className="back-login-btn"
        onClick={() => (window.location.href = '/login')}
      >
        Back to Login
      </button>

      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Register</h2>
          <p className="register-subtitle">
            {step === 1 ? 'Create your account' : 'Enter your details'}
          </p>

          <form onSubmit={step === 1 ? handleContinue : handleNext}>
            {step === 1 ? (
              <>
                {/* Step 1 fields */}
                {/* Username */}
                <div className="input-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* First Name */}
                <div className="input-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Last Name */}
                <div className="input-group">
                  <FaUser className="icon" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </div>
                {/* Phone */}
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
                {/* DOB */}
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
                {/* Step 2+ role-specific */}
                {formData.role === 'patient' && step === 2 && (
                  <PatientDetails formData={formData} onChange={handleChange} />
                )}
                {formData.role === 'admin' && step === 2 && (
                  <AdminDetails formData={formData} onChange={handleChange} />
                )}
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

                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="btn-register"
                    onClick={handleBack}
                    style={{ background: '#eee', color: '#222', flex: '0 0 120px' }}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-register" style={{ flex: 1 }}>
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
  );
}

export default Register;
