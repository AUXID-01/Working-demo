import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// --- Home ---
import Home from './pages/homepage'

// --- Auth Pages ---
import Login from './pages/auth-pages/Login'
import Register from './pages/auth-pages/Register'

// --- Patient Pages ---
import Dashboard from './pages/patient/PatientDashboard'
import Appointments from './pages/patient/Appointments'
import Doctors from './pages/patient/Doctors'
import Reminders from './pages/patient/Reminders'
import BookAppointments from './pages/patient/BookAppointment'
import EmergencyModal from './pages/patient/EmergencyModal'
import Messages from './pages/patient/Messages'
import Payments from './pages/patient/Payments'
import Medicines from './pages/patient/Medicine'
import Records from './pages/patient/Records'
import Profile from './pages/patient/Profile'
import EditProfile from './pages/patient/EditProfile'

// --- Patient Symptom Checker ---
import SymptomInfo from './pages/patient/SymptomChecker/pages/SymptomInfo'
import SymptomSelect from './pages/patient/SymptomChecker/pages/SymptomSelect'
import SymptomConditions from './pages/patient/SymptomChecker/pages/SymptomConditions'
import SymptomDetails from './pages/patient/SymptomChecker/pages/SymptomDetails'
import SymptomTreatment from './pages/patient/SymptomChecker/pages/SymptomTreatment'

// --- Doctor Pages ---
import DocLayout from './components/docLayout'
import DocDashboard from './pages/doctor/DocDashboard'
import DocAppointments from './pages/doctor/DocAppointments'
import Patients from './pages/doctor/Patients'
import DocRecords from './pages/doctor/docRecords'
import DocMessages from './pages/doctor/DocMessages'
import DocReminders from './pages/doctor/DocReminders'
import DocPayments from './pages/doctor/DocPayments'
import DocPastSessions from './pages/doctor/DocPastSessions'
import DocProfile from './pages/doctor/DocProfile'
import EditDocProfile from './pages/doctor/DocEditeProfile'

// --- Admin Pages ---
import AdminLayout from './components/adminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminPatients from './pages/admin/AdminPatients'
import AdminRecords from './pages/admin/AdminRecords'
import AdminMessages from './pages/admin/AdminMessages'
import AdminPayments from './pages/admin/AdminPayments'
import Reports from './pages/admin/AdminReports'
import AdminProfile from './pages/admin/AdminProfile'
import EditAdminProfile from './pages/admin/AdminEditProfile'

// --- Role Pages ---
import PatientDetails from './pages/role-pages/patientDetails'
import DoctorProfessionalInfo from './pages/role-pages/DoctorProfessionalInfo'
import DoctorPracticeDetails from './pages/role-pages/DoctorPracticeDetails'
import DoctorVerificationDocs from './pages/role-pages/DoctorVerificationDocs'
import AdminDetails from './pages/role-pages/adminDetails'

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Home --- */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* --- Authentication --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Patient Dashboard --- */}
        <Route path="/patient/dashboard" element={<Dashboard />} />
        <Route path="/patient/appointments" element={<Appointments />} />
        <Route path="/patient/doctors" element={<Doctors />} />
        <Route path="/patient/medicines" element={<Medicines />} />
        <Route path="/patient/records" element={<Records />} />
        <Route path="/patient/reminders" element={<Reminders />} />
        <Route path="/patient/messages" element={<Messages />} />
        <Route path="/patient/payments" element={<Payments />} />
        <Route path="/patient/book-appointment" element={<BookAppointments />} />
        <Route path="/patient/emergency" element={<EmergencyModal />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/edit-profile" element={<EditProfile />} />

        {/* --- Symptom Checker --- */}
        <Route path="/symptom-checker" element={<SymptomInfo />} />
        <Route path="/symptom-select" element={<SymptomSelect />} />
        <Route path="/symptom-details" element={<SymptomDetails />} />
        <Route path="/symptom-treatment" element={<SymptomTreatment />} />
        <Route path="/symptom-conditions" element={<SymptomConditions />} />

        {/* --- Doctor Dashboard --- */}
        <Route path="/doctor/layout" element={<DocLayout />} />
        <Route path="/doctor/dashboard" element={<DocDashboard />} />
        <Route path="/doctor/appointments" element={<DocAppointments />} />
        <Route path="/doctor/patients" element={<Patients />} />
        <Route path="/doctor/records" element={<DocRecords />} />
        <Route path="/doctor/messages" element={<DocMessages />} />
        <Route path="/doctor/reminders" element={<DocReminders />} />
        <Route path="/doctor/payments" element={<DocPayments />} />
        <Route path="/doctor/profile" element={<DocProfile />} />
        <Route path="/doctor/past-sessions" element={<DocPastSessions />} />
        <Route path="/doctor/edit-profile" element={<EditDocProfile />} />

        {/* --- Admin Dashboard --- */}
        <Route path="/admin/layout" element={<AdminLayout />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="/admin/records" element={<AdminRecords />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/edit-profile" element={<EditAdminProfile />} />

        {/* --- Role Pages --- */}
        <Route path="/patient/details" element={<PatientDetails />} />
        <Route path="/admin/details" element={<AdminDetails />} />
        <Route
          path="/doctor/professional-info"
          element={<DoctorProfessionalInfo />}
        />
        <Route
          path="/doctor/practice-details"
          element={<DoctorPracticeDetails />}
        />
        <Route
          path="/doctor/verification-docs"
          element={<DoctorVerificationDocs />}
        />
      </Routes>
    </Router>
  )
}

export default App
