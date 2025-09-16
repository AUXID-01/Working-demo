import React, { useState } from 'react';

function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [severity, setSeverity] = useState(5);
  const [duration, setDuration] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5001/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, severity, duration_days }),

    });

    if (!response.ok) {
      throw new Error('Failed to get symptom check result.');
    }

    const data = await response.json();
    setResult(data);
  } catch (err) {
    setError(err.message || 'Unexpected error');
  }
  setLoading(false);
};

return (
  <div className="symptom-checker-container">
    <h3>Symptom Checker</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Symptoms (comma separated):
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. fever, cough, headache"
          required
        />
      </label>
      <label>
        Severity (1-10):
        <input
          type="number"
          min="1"
          max="10"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          required
        />
      </label>
      <label>
        Duration (days):
        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading} className="btn-start">
        {loading ? 'Checking...' : 'Start'}
      </button>
    </form>

    {error && <p className="error-text">{error}</p>}

    {result && (
      <div className="result">
        <h4>Category: {result.category}</h4>
        <p>Advice: {result.advice}</p>
      </div>
    )}
  </div>
);
}

export default SymptomChecker;
