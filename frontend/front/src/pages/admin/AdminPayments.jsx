// src/pages/admin/AdminPayments.jsx
import React, { useState } from 'react'
import AdminLayout from '../../components/adminLayout'
import '../../page-css/AdminPayments.css'

const dummyPayments = [
  {
    id: 1,
    date: '2025-09-20',
    patient: 'John Doe',
    doctor: 'Dr. Roy',
    service: 'Consultation',
    method: 'UPI',
    amount: '₹500',
    status: 'Paid',
  },
  {
    id: 2,
    date: '2025-09-19',
    patient: 'Jane Smith',
    doctor: 'Dr. Sharma',
    service: 'Prescription Review',
    method: 'Credit Card',
    amount: '₹300',
    status: 'Paid',
  },
  {
    id: 3,
    date: '2025-09-18',
    patient: 'Alice Johnson',
    doctor: 'Dr. Mehta',
    service: 'Consultation',
    method: 'Cash',
    amount: '₹400',
    status: 'Pending',
  },
  {
    id: 4,
    date: '2025-09-15',
    patient: 'Bob Brown',
    doctor: 'Dr. Roy',
    service: 'Consultation',
    method: 'UPI',
    amount: '₹500',
    status: 'Failed',
  },
]

// Helper: group by Today / Yesterday / Earlier
const groupPaymentsByDate = (payments) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const grouped = { Today: [], Yesterday: [], Earlier: [] }

  payments.forEach((p) => {
    const paymentDate = new Date(p.date)
    paymentDate.setHours(0, 0, 0, 0)
    if (paymentDate.getTime() === today.getTime()) grouped.Today.push(p)
    else if (paymentDate.getTime() === yesterday.getTime())
      grouped.Yesterday.push(p)
    else grouped.Earlier.push(p)
  })

  return grouped
}

function AdminPayments() {
  const [payments] = useState(dummyPayments)
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filteredPayments = payments.filter((p) => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter
    const matchesSearch =
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.doctor.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const groupedPayments = groupPaymentsByDate(filteredPayments)

  return (
    <AdminLayout title="Payments" subtitle="View all transactions">
      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by patient or doctor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Paid">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Payment Sections */}
      {Object.entries(groupedPayments).map(([section, list]) =>
        list.length > 0 ? (
          <div key={section} className="payments-section">
            <h3 className="section-title">{section}</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Service</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((p) => (
                    <tr key={p.id}>
                      <td>{p.date}</td>
                      <td>{p.patient}</td>
                      <td>{p.doctor}</td>
                      <td>{p.service}</td>
                      <td>{p.method}</td>
                      <td>{p.amount}</td>
                      <td className={`status-${p.status.toLowerCase()}`}>
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null
      )}
    </AdminLayout>
  )
}

export default AdminPayments
