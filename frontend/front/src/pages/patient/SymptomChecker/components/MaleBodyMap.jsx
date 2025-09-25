// MaleBodyMap.jsx
import React, { useState } from 'react'

const bodyParts = [
  { id: 'head', name: 'Head' },
  { id: 'chest', name: 'Chest' },
  { id: 'arms', name: 'Arms' },
  { id: 'legs', name: 'Legs' },
]

export default function MaleBodyMap({ onSelect }) {
  const [selectedPart, setSelectedPart] = useState(null)

  const handleClick = (part) => {
    setSelectedPart(part.id)
    onSelect(part.name)
  }

  return (
    <svg viewBox="0 0 200 500" width="200" height="500">
      {/* Head */}
      <circle
        cx="100"
        cy="50"
        r="30"
        fill={selectedPart === 'head' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[0])}
        style={{ cursor: 'pointer' }}
      />
      {/* Chest */}
      <rect
        x="60"
        y="90"
        width="80"
        height="100"
        fill={selectedPart === 'chest' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[1])}
        style={{ cursor: 'pointer' }}
      />
      {/* Arms */}
      <rect
        x="20"
        y="90"
        width="40"
        height="100"
        fill={selectedPart === 'arms' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[2])}
        style={{ cursor: 'pointer' }}
      />
      <rect
        x="140"
        y="90"
        width="40"
        height="100"
        fill={selectedPart === 'arms' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[2])}
        style={{ cursor: 'pointer' }}
      />
      {/* Legs */}
      <rect
        x="60"
        y="190"
        width="30"
        height="100"
        fill={selectedPart === 'legs' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[3])}
        style={{ cursor: 'pointer' }}
      />
      <rect
        x="110"
        y="190"
        width="30"
        height="100"
        fill={selectedPart === 'legs' ? '#0e918c' : '#ccc'}
        stroke="#000"
        strokeWidth="2"
        onClick={() => handleClick(bodyParts[3])}
        style={{ cursor: 'pointer' }}
      />
    </svg>
  )
}
