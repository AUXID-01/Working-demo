import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PersonalDetails from './pages/PersonalDetails'
import Dashboard from './Dashboards/PatientDashboard'
import Appointments from './pages/Appointments'
import Doctors from './pages/Doctors'
import Reminders from './pages/Reminders'
import BookAppointments from './pages/BookAppointment'
import EmergencyModal from './pages/EmergencyModal'
import Messages from './pages/Messages'
import Payments from './pages/Payments'
import Medicines from './pages/Medicine'
import Records from './pages/Records'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
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
      </Routes>
    </Router>
  )
}

export default App
