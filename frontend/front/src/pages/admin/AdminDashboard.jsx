// src/pages/admin/AdminDashboard.jsx
import React from 'react'
import AdminLayout from '../../components/adminLayout'
import '../../page-css/Dashboard.css'

function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard" subtitle="Overview & statistics">
      <div className="dashboard-cards">
        <div className="card">Total Users: 120</div>
        <div className="card">Total Doctors: 25</div>
        <div className="card">Total Patients: 95</div>
        <div className="card">Total Payments: ₹45,000</div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
