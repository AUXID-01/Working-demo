import React, { useState } from 'react'
import '../../../page-css/SymptomSelect.css'
// Example assets: adjust based on your project structure
import maleBody from '../../../assets/male-body.svg'
import femaleBody from '../../../assets/female-body.svg'

// Example mapping for body area symptoms
const BODY_AREAS = [
  {
    key: 'NECK',
    label: 'Neck',
    areaStyles: { top: '12%', left: '44%', width: '12%', height: '8%' },
    symptoms: [
      'choking',
      'choking sensation',
      'cough',
      'epiglottis swelling',
      'episodes of not breathing during sleep',
      'food comes back up',
      'food or liquid goes down wrong pipe',
      'high pitched breathing',
      'itchy throat',
      'jugular vein a wave increased',
      'laryngeal pain',
      'laryngitis',
    ],
  },
  // Add more body areas as needed...
]

function SymptomSelect({ sex = 'Male', onContinue }) {
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])

  // Render appropriate body image
  const bodyImg = sex === 'Female' ? femaleBody : maleBody

  // Handle symptom selection
  const handleSymptomChange = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
  }

  return (
    <div className="page-background">
      <a href="/dashboard" className="back-btn">
        Back To Dashboard
      </a>
      <div className="container">
        <h2 className="title">🩺 Symptom Checker</h2>
        <div
          className="human-model-container"
          style={{ position: 'relative', width: '260px', margin: '0 auto' }}
        >
          <img
            src={bodyImg}
            alt="human-body"
            className="human-body-img"
            style={{ width: '100%' }}
          />
          {BODY_AREAS.map((area) => (
            <div
              key={area.key}
              className={`body-area ${
                selectedArea === area.key ? 'selected' : ''
              }`}
              style={{
                position: 'absolute',
                ...area.areaStyles,
                cursor: 'pointer',
                background:
                  selectedArea === area.key
                    ? 'rgba(0,123,255,0.1)'
                    : 'transparent',
                borderRadius: '6px',
              }}
              onClick={() => setSelectedArea(area.key)}
              title={area.label}
            ></div>
          ))}
        </div>

        {selectedArea && (
          <div className="symptom-slide-select">
            <div className="symptom-header">
              <b>
                {BODY_AREAS.find((a) => a.key === selectedArea).label} Symptoms
              </b>
              <button
                className="close-btn"
                onClick={() => setSelectedArea(null)}
              >
                ×
              </button>
            </div>
            <div className="symptom-list">
              {BODY_AREAS.find((a) => a.key === selectedArea).symptoms.map(
                (symptom) => (
                  <label key={symptom} className="symptom-option">
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom)}
                      onChange={() => handleSymptomChange(symptom)}
                    />
                    {symptom}
                  </label>
                )
              )}
            </div>
          </div>
        )}

        <button
          className="btn"
          disabled={selectedSymptoms.length === 0}
          onClick={() => onContinue(selectedSymptoms, selectedArea)}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

export default SymptomSelect
