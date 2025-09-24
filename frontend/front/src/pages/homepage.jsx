import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    header: {
      background: 'linear-gradient(135deg, #16685E 0%, #0d4c42 100%)',
      color: 'white',
      padding: '1rem 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '20px',
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
    logoIcon: { marginRight: '10px', fontSize: '2rem' },
    authButtons: { display: 'flex', gap: '15px' },
    btn: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.3s ease',
      fontSize: '14px',
    },
    btnPrimary: { background: 'white', color: '#16685E' },
    btnSecondary: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
    },
    btnLarge: { padding: '18px 36px', fontSize: '18px', borderRadius: '30px' },
    hero: {
      background: 'linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%)',
      padding: '80px 0',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: '3rem',
      color: '#16685E',
      marginBottom: '20px',
      fontWeight: '700',
    },
    heroText: {
      fontSize: '1.3rem',
      color: '#0d4c42',
      marginBottom: '40px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    stats: {
      background: 'linear-gradient(135deg, #16685E 0%, #0d4c42 100%)',
      color: 'white',
      padding: '60px 0',
      textAlign: 'center',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '40px',
      marginTop: '40px',
    },
    statItem: { textAlign: 'center' },
    statNumber: { fontSize: '3rem', marginBottom: '10px', fontWeight: 'bold' },
    statText: { fontSize: '1.1rem', opacity: '0.9' },
    mainContent: { padding: '80px 0' },
    sectionTitle: {
      fontSize: '2.5rem',
      color: '#16685E',
      marginBottom: '30px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      marginTop: '40px',
    },
    problemCard: {
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      borderLeft: '5px solid #e74c3c',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    solutionCard: {
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      borderLeft: '5px solid #16685E',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    cardTitle: {
      marginBottom: '15px',
      fontSize: '1.2rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
    },
    cardIcon: { marginRight: '10px', fontSize: '1.5rem' },
    problemTitle: { color: '#e74c3c' },
    solutionTitle: { color: '#16685E' },
    cardText: { color: '#0d4c42', lineHeight: '1.6' },
    solutionSection: { background: '#e9ecef', padding: '80px 0' },
    footer: {
      background: '#0d4c42',
      color: 'white',
      textAlign: 'center',
      padding: '40px 0',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>
              <span style={styles.logoIcon}>🏥</span>
              Rural Telemedicine Platform
            </div>
            <div style={styles.authButtons}>
              <button
                onClick={handleLogin}
                style={{ ...styles.btn, ...styles.btnSecondary }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'white'
                  e.target.style.color = '#16685E'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e9ecef'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.container}>
          <h1 style={styles.heroTitle}>Healthcare for Rural Punjab</h1>
          <p style={styles.heroText}>
            Connecting rural communities in Nabha, Punjab with quality
            healthcare through innovative telemedicine solutions
          </p>
          <div style={styles.heroButtons}>
            <button
              onClick={handleRegister}
              style={{
                ...styles.btn,
                ...styles.btnPrimary,
                ...styles.btnLarge,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#16685E'
                e.target.style.color = 'white'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white'
                e.target.style.color = '#16685E'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              Get Started
            </button>
            <button
              onClick={() => scrollToSection('problem')}
              style={{
                ...styles.btn,
                ...styles.btnSecondary,
                ...styles.btnLarge,
                color: '#16685E',
                border: '2px solid #16685E',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#16685E'
                e.target.style.color = 'white'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = '#16685E'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" style={styles.mainContent}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>
            Healthcare Challenges in Rural Nabha
          </h2>
          <div style={styles.grid}>
            <div
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.problemTitle }}>
                <span style={styles.cardIcon}>🏥</span>
                Severe Doctor Shortage
              </h3>
              <p style={styles.cardText}>
                Nabha Civil Hospital has only 11 doctors for 23 sanctioned
                positions, creating overwhelming patient loads and long wait
                times.
              </p>
            </div>

            <div
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.problemTitle }}>
                <span style={styles.cardIcon}>🚗</span>
                Long Travel Distances
              </h3>
              <p style={styles.cardText}>
                Patients must travel extensive distances for basic medical
                consultations, causing delays in treatment and increased costs.
              </p>
            </div>

            <div
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.problemTitle }}>
                <span style={styles.cardIcon}>👨‍⚕</span>
                Limited Specialist Access
              </h3>
              <p style={styles.cardText}>
                Minimal access to specialists and essential medicines, forcing
                patients to seek care in distant urban centers.
              </p>
            </div>

            <div
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.problemTitle }}>
                <span style={styles.cardIcon}>📶</span>
                Poor Infrastructure
              </h3>
              <p style={styles.cardText}>
                Inadequate infrastructure and intermittent internet connectivity
                hamper modern healthcare delivery.
              </p>
            </div>

            <div
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.problemTitle }}>
                <span style={styles.cardIcon}>💰</span>
                High Healthcare Costs
              </h3>
              <p style={styles.cardText}>
                Expensive healthcare with delayed emergency responses putting
                rural lives at risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section style={styles.solutionSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Telemedicine Solution</h2>
          <div style={styles.grid}>
            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>📹</span>
                Remote Video Consultations
              </h3>
              <p style={styles.cardText}>
                Connect with qualified doctors from the comfort of your home,
                reducing travel time and costs.
              </p>
            </div>

            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>🤖</span>
                AI-Powered Symptom Checking
              </h3>
              <p style={styles.cardText}>
                Intelligent triage system to assess symptoms and prioritize
                urgent cases for immediate attention.
              </p>
            </div>

            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>💊</span>
                Digital Prescriptions
              </h3>
              <p style={styles.cardText}>
                Electronic prescriptions with medicine availability tracking at
                local pharmacies.
              </p>
            </div>

            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>🚨</span>
                Emergency Coordination
              </h3>
              <p style={styles.cardText}>
                Streamlined emergency response coordination with local hospitals
                and healthcare providers.
              </p>
            </div>

            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>🌐</span>
                Multilingual Support
              </h3>
              <p style={styles.cardText}>
                Platform available in Hindi and Punjabi to serve the local
                community effectively.
              </p>
            </div>

            <div
              style={styles.solutionCard}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)'
                e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)'
              }}
            >
              <h3 style={{ ...styles.cardTitle, ...styles.solutionTitle }}>
                <span style={styles.cardIcon}>📱</span>
                Low-Bandwidth Optimized
              </h3>
              <p style={styles.cardText}>
                Designed to work efficiently even with poor internet
                connectivity common in rural areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <p style={{ fontSize: '1.1rem', margin: 0 }}>
            © 2025 Rural Telemedicine Platform. Bridging the healthcare gap in
            rural Punjab.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
