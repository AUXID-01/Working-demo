import React, { useState } from 'react'
import '../../page-css/SymptomChecker.css'

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('')
  const [severity, setSeverity] = useState(5)
  const [duration, setDuration] = useState(1)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://127.0.0.1:5000/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: symptoms.split(','),
          severity,
          duration_days: duration,
        }),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      alert('Failed to connect to backend: ' + err.message)
    }
  }

  return (
    <div className="container">
      <h2 className="title">🩺 Symptom Checker</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Symptoms (comma separated):</label>
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="fever, cough"
          />
        </div>
        <div className="form-group">
          <label>Severity (1-10):</label>
          <input
            type="number"
            min={1}
            max={10}
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Duration (days):</label>
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>
        <button className="btn">Check</button>
      </form>

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
  )
}

export default SymptomChecker
