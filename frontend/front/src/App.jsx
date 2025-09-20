import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/patient/Login'
import Register from './pages/patient/Register'
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
import DocLayout from './components/docLayout'
import DocDashboard from './pages/doctor/DocDashboard'
import DocAppointments from './pages/doctor/DocAppointments'
import Patients from './pages/doctor/Patients'
import DocRecords from './pages/doctor/docRecords'
import DocMessages from './pages/doctor/DocMessages'
import DocReminders from './pages/doctor/DocReminders'
import DocPayments from './pages/doctor/DocPayments'
import DocPastSessions from './pages/doctor/DocPastSessions'
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
import SymptomChecker from './pages/patient/SymptomChecker'
import Home from './pages/homepage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/records" element={<Records />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/book-appointment" element={<BookAppointments />} />
        <Route path="/emergency" element={<EmergencyModal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doc-layout" element={<DocLayout />} />
        <Route path="/doc-dashboard" element={<DocDashboard />} />
        <Route path="/doc-appointments" element={<DocAppointments />} />
        <Route path="/doc-patients" element={<Patients />} />
        <Route path="/doc-records" element={<DocRecords />} />
        <Route path="/doc-messages" element={<DocMessages />} />
        <Route path="/doc-reminders" element={<DocReminders />} />
        <Route path="/doc-payments" element={<DocPayments />} />
        <Route path="/doc-past-sessions" element={<DocPastSessions />} />
        <Route path="/admin-layout" element={<AdminLayout />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/admin-doctors" element={<AdminDoctors />} />
        <Route path="/admin-patients" element={<AdminPatients />} />
        <Route path="/admin-records" element={<AdminRecords />} />
        <Route path="/admin-messages" element={<AdminMessages />} />
        <Route path="/admin-payments" element={<AdminPayments />} />
        <Route path="/admin-reports" element={<Reports />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        
      </Routes>
    </Router>
  )
}

export default App
