import React, { useState } from 'react'
import Layout from '../../components/Layout'
import '../../page-css/Payments.css'

function Payments() {
  const [payments] = useState([
    {
      id: 1,
      date: '2025-09-15',
      doctor: 'Dr. Roy',
      service: 'Consultation',
      method: 'UPI',
      amount: '₹500',
      status: 'Paid',
    },
    {
      id: 2,
      date: '2025-09-10',
      doctor: 'Dr. Sharma',
      service: 'Prescription Review',
      method: 'Credit Card',
      amount: '₹300',
      status: 'Paid',
    },
    {
      id: 3,
      date: '2025-09-05',
      doctor: 'Dr. Mehta',
      service: 'Consultation',
      method: 'Cash',
      amount: '₹400',
      status: 'Pending',
    },
  ])

  const totalSpent = payments
    .filter((p) => p.status === 'Paid')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('₹', '')), 0)

  const pendingPayments = payments.filter((p) => p.status === 'Pending')

  const lastPaymentDate =
    payments.find((p) => p.status === 'Paid')?.date || 'N/A'

  return (
    <Layout title="Payments" subtitle="Track your expenses and bills">
      <div className="payments-container">
        {/* Summary Card */}
        <div className="summary-card">
          <div>
            <h3>Total Spent</h3>
            <p>₹{totalSpent}</p>
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
                  {p.doctor} • {p.method}
                </p>
                <small>{p.date}</small>
              </div>
              <div className="payment-actions">
                <span
                  className={`status-badge ${
                    p.status === 'Paid'
                      ? 'paid'
                      : p.status === 'Pending'
                      ? 'pending'
                      : 'failed'
                  }`}
                >
                  {p.status}
                </span>
                <p className="amount">{p.amount}</p>
                {p.status === 'Paid' ? (
                  <button className="btn small">Download Receipt</button>
                ) : (
                  <button className="btn small pay-btn">Pay Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Payments
