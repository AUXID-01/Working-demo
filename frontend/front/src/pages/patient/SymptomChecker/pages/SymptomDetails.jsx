import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { conditions } from '../Data/conditions'
import '../../../../page-css/SymptomChecker.css'

export default function SymptomDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const condition = conditions.find((c) => c.id === parseInt(id))
  const [tab, setTab] = useState('overview')

  if (!condition) return <p>Condition not found.</p>

  return (
    <div className="container">
      <h2>{condition.name}</h2>
      <div className="tabs">
        {['overview', 'symptoms', 'details'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={tab === t ? 'active' : ''}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tab === 'overview' && <p>{condition.overview}</p>}
        {tab === 'symptoms' && (
          <ul>
            {condition.symptoms.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {tab === 'details' && <p>{condition.details}</p>}
      </div>
      <button onClick={() => navigate(`/symptom-treatment/${condition.id}`)}>
        Next: Treatment →
      </button>
    </div>
  )
}
