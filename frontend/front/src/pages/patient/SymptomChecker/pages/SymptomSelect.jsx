import React, { useState, useEffect } from 'react'
import MaleBodyMap from '../components/MaleBodyMap'
import FemaleBodyMap from '../components/FemaleBodyMap'

export default function SymptomSelect() {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [sex, setSex] = useState('Male') // default, will read from localStorage

  useEffect(() => {
    const storedSex = localStorage.getItem('sex')
    if (storedSex) setSex(storedSex)
  }, [])

  const handlePartSelect = (partName) => {
    setSelectedBodyPart(partName)
  }

  return (
    <div className="container">
      <h2>Select a Body Part</h2>
      {sex === 'Male' ? (
        <MaleBodyMap onSelect={handlePartSelect} />
      ) : (
        <FemaleBodyMap onSelect={handlePartSelect} />
      )}

      {selectedBodyPart && <p>You selected: {selectedBodyPart}</p>}
      {/* Show symptoms for selected part here */}
    </div>
  )
}
