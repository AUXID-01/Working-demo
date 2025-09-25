import React, { useState } from 'react'

const bodyParts = [
  { id: 'head', name: 'Head' },
  { id: 'chest', name: 'Chest' },
  { id: 'arms', name: 'Arms' },
  { id: 'legs', name: 'Legs' },
]

export default function FemaleBodyMap({ onSelect }) {
  const [selectedPart, setSelectedPart] = useState(null)

  const handleClick = (part) => {
    setSelectedPart(part.id)
    onSelect(part.name)
  }

  return (
    <svg
      viewBox="0 0 200 500"
      width="200"
      height="500"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {/* Head */}
      <circle
        cx="100"
        cy="50"
        r="28"
        fill={selectedPart === 'head' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[0])}
        style={{ cursor: 'pointer' }}
      />
      {/* Chest */}
      <rect
        x="65"
        y="90"
        width="70"
        height="110"
        rx="15"
        fill={selectedPart === 'chest' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[1])}
        style={{ cursor: 'pointer' }}
      />
      {/* Arms */}
      <rect
        x="25"
        y="90"
        width="35"
        height="100"
        rx="12"
        fill={selectedPart === 'arms' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[2])}
        style={{ cursor: 'pointer' }}
      />
      <rect
        x="140"
        y="90"
        width="35"
        height="100"
        rx="12"
        fill={selectedPart === 'arms' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[2])}
        style={{ cursor: 'pointer' }}
      />
      {/* Legs */}
      <rect
        x="65"
        y="200"
        width="30"
        height="100"
        rx="10"
        fill={selectedPart === 'legs' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[3])}
        style={{ cursor: 'pointer' }}
      />
      <rect
        x="105"
        y="200"
        width="30"
        height="100"
        rx="10"
        fill={selectedPart === 'legs' ? '#0e918c' : '#f0c0c0'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[3])}
        style={{ cursor: 'pointer' }}
      />
    </svg>
  )
}
