import React, { useState } from 'react'
import '../../../page-css/SymptomChecker.css'
import pdBg from '../../../assets/pd.svg'

function SymptomInfo() {
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://127.0.0.1:5000/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age,
          sex,
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      alert('Failed to connect to backend: ' + err.message)
    }
  }

  return (
    <div className="page-background">
      <a href="/dashboard" className="back-btn">
        Back To Dashboard
      </a>
      <div className="container">
        <h2 className="title">🩺 Symptom Checker</h2>
        <form onSubmit={handleSubmit} className="form">
          {/* Age Field */}
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              min="1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>

          {/* Sex Field */}
          <div className="form-group">
            <label>Sex</label>
            <div className="sex-buttons">
              <button
                type="button"
                className={sex === 'Male' ? 'selected' : ''}
                onClick={() => setSex('Male')}
              >
                Male
              </button>
              <button
                type="button"
                className={sex === 'Female' ? 'selected' : ''}
                onClick={() => setSex('Female')}
              >
                Female
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button type="submit" className="btn" disabled={!age || !sex}>
            Continue →
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="result-box">
            <p>
              <b>Category:</b> {result.category}
            </p>
            <p>
              <b>Advice:</b> {result.advice}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SymptomInfo
