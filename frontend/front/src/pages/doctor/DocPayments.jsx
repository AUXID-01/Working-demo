// src/pages/DocPayments.jsx
import React, { useState } from 'react'
import DocLayout from '../../components/DocLayout'
import '../../page-css/Payments.css'

function DocPayments() {
  const [payments] = useState([
    {
      id: 1,
      date: '2025-09-15',
      patient: 'John Doe',
      service: 'Consultation',
      method: 'UPI',
      amount: '₹500',
      status: 'Received',
    },
    {
      id: 2,
      date: '2025-09-10',
      patient: 'Jane Smith',
      service: 'Prescription Review',
      method: 'Credit Card',
      amount: '₹300',
      status: 'Received',
    },
    {
      id: 3,
      date: '2025-09-05',
      patient: 'Alice Johnson',
      service: 'Consultation',
      method: 'Cash',
      amount: '₹400',
      status: 'Pending',
    },
  ])

  const totalReceived = payments
    .filter((p) => p.status === 'Received')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '')), 0)

  const pendingPayments = payments.filter((p) => p.status === 'Pending')

  const lastPaymentDate =
    payments.find((p) => p.status === 'Received')?.date || 'N/A'

  return (
    <DocLayout
      title="Payments"
      subtitle="Track your earnings and pending payments"
    >
      <div className="payments-container">
        {/* Summary Card */}
        <div className="summary-card">
          <div>
            <h3>Total Received</h3>
            <p>₹{totalReceived}</p>
          </div>
          <div>
            <h3>Pending</h3>
            <p>{pendingPayments.length} payment(s)</p>
          </div>
          <div>
            <h3>Last Payment</h3>
            <p>{lastPaymentDate}</p>
          </div>
        </div>

        {/* Payment History */}
        <h2 className="section-title">Payment History</h2>
        <div className="payment-list">
          {payments.map((p) => (
            <div key={p.id} className="payment-card">
              <div className="payment-info">
                <h4>{p.service}</h4>
                <p>
                  {p.patient} • {p.method}
                </p>
                <small>{p.date}</small>
              </div>
              <div className="payment-actions">
                <span
                  className={`status-badge ${
                    p.status === 'Received'
                      ? 'paid'
                      : p.status === 'Pending'
                      ? 'pending'
                      : 'failed'
                  }`}
                >
                  {p.status}
                </span>
                <p className="amount">{p.amount}</p>
                {p.status === 'Received' ? (
                  <button className="btn small">Download Receipt</button>
                ) : (
                  <button className="btn small pay-btn">Send Reminder</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocLayout>
  )
}

export default DocPayments
