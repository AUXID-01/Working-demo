import React, { useState } from 'react'
import { FaHeartbeat, FaTimes, FaExclamationTriangle } from 'react-icons/fa'

function EmergencyModal() {
  const [isOpen, setIsOpen] = useState(false)

  const handleOkay = () => {
    setIsOpen(false)
  }

  const handleCallAmbulance = () => {
    alert('Calling Ambulance... 🚑')
    // Example: window.open("tel:102");
  }

  const handleCallEmergencyHelp = () => {
    alert('Calling Emergency Medical Help... 📞')
    // Example: window.open("tel:108");
  }

  const handleNotifyContact = () => {
    alert('Notifying Emergency Contact... 📲')
    // Example: API call or SMS trigger
  }

  return (
    <div>
      {/* Trigger Button */}
      <button style={styles.emergencyBtn} onClick={() => setIsOpen(true)}>
        <FaExclamationTriangle size={18} style={{ marginRight: '8px' }} />
        Emergency
      </button>

      {/* Overlay + Modal */}
      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {/* Close Icon */}
            <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>

            {/* Icon */}
            <div style={styles.iconWrap}>
              <FaHeartbeat size={50} color="#e63946" />
            </div>

            {/* Main Message */}
            <h2 style={styles.message}>Are you okay?</h2>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <button
                style={{ ...styles.actionBtn, background: '#4caf50' }}
                onClick={handleOkay}
              >
                I'm Okay
              </button>
              <button
                style={{ ...styles.actionBtn }}
                onClick={handleCallAmbulance}
              >
                Call Ambulance
              </button>
              <button
                style={{ ...styles.actionBtn }}
                onClick={handleCallEmergencyHelp}
              >
                Call Emergency Medical Help
              </button>
              <button
                style={{ ...styles.actionBtn}}
                onClick={handleNotifyContact}
              >
                Notify Emergency Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* Inline styles (can move to CSS module if needed) */
const styles = {
  emergencyBtn: {
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    background: '#e63946',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: 'blur(6px)', // background blurs
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // dim layer
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '30px 20px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
    position: 'relative',
    textAlign: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
  },
  iconWrap: {
    marginBottom: '15px',
  },
  message: {
    fontSize: '22px',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  actionBtn: {
    padding: '14px',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
}

export default EmergencyModal
