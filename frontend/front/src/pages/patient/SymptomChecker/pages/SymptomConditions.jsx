import React from 'react'
import { useNavigate } from 'react-router-dom'
import { conditions } from '../Data/conditions'
import '../../../../page-css/SymptomChecker.css'

export default function SymptomConditions() {
  const navigate = useNavigate()
  const symptoms = JSON.parse(localStorage.getItem('symptoms') || '[]')

  // For demo, filter conditions if they have any of the selected symptoms
  const matchingConditions = conditions.filter((c) =>
    c.symptoms.some((s) => symptoms.includes(s))
  )

  return (
    <div className="container">
      <h2>Possible Conditions</h2>
      {matchingConditions.map((c) => (
        <div
          key={c.id}
          className="condition-card"
          onClick={() => navigate(`/symptom-details/${c.id}`)}
        >
          <h3>{c.name}</h3>
          <p>Category: {c.category}</p>
        </div>
      ))}
    </div>
  )
}
