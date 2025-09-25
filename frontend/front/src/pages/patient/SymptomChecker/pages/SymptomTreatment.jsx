import React from 'react'
import { useParams } from 'react-router-dom'
import { conditions } from '../Data/conditions'
import '../../../../page-css/SymptomChecker.css'

export default function SymptomTreatment() {
  const { id } = useParams()
  const condition = conditions.find((c) => c.id === parseInt(id))

  if (!condition) return <p>Condition not found.</p>

  return (
    <div className="container">
      <h2>Treatment for {condition.name}</h2>
      <p>{condition.treatment}</p>
      <p className="disclaimer">
        ⚠️ This information is for educational purposes only. Consult a doctor
        for medical advice.
      </p>
    </div>
  )
}
