import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../../page-css/SymptomChecker.css'

export default function SymptomInfo() {
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('')
  const navigate = useNavigate()

  const handleContinue = () => {
    // store in localStorage for demo, or context
    localStorage.setItem('age', age)
    localStorage.setItem('sex', sex)
    navigate('/symptom-select')
  }

  return (
    <div className="container">
      <h2>🩺 Symptom Checker</h2>
      <div>
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Sex</label>
        <button
          onClick={() => setSex('Male')}
          className={sex === 'Male' ? 'selected' : ''}
        >
          Male
        </button>
        <button
          onClick={() => setSex('Female')}
          className={sex === 'Female' ? 'selected' : ''}
        >
          Female
        </button>
      </div>
      <button disabled={!age || !sex} onClick={handleContinue}>
        Continue →
      </button>
    </div>
  )
}
