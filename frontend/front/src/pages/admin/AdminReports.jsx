import React, { useState } from 'react'
import AdminLayout from '../../components/adminLayout'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import '../../page-css/AdminReports.css'

const dummyInteractions = [
  { date: '2025-09-10', interactions: 5, progress: 20 },
  { date: '2025-09-11', interactions: 8, progress: 35 },
  { date: '2025-09-12', interactions: 7, progress: 50 },
  { date: '2025-09-13', interactions: 10, progress: 65 },
  { date: '2025-09-14', interactions: 12, progress: 80 },
]

function Reports() {
  const [data] = useState(dummyInteractions)

  // Compute summary stats
  const totalInteractions = data.reduce((sum, d) => sum + d.interactions, 0)
  const latestProgress = data[data.length - 1]?.progress || 0

  return (
    <AdminLayout title="Reports" subtitle="Track progress and interactions">
      <div className="reports-container">
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Interactions</h3>
            <p>{totalInteractions}</p>
          </div>
          <div className="stat-card">
            <h3>Latest Progress</h3>
            <p>{latestProgress}%</p>
          </div>
        </div>

        <div className="chart-section">
          <h3>Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                yAxisId="left"
                label={{
                  value: 'Interactions',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: 'Progress (%)',
                  angle: 90,
                  position: 'insideRight',
                }}
              />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="interactions"
                stroke="#16685e"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="progress"
                stroke="#1e40af"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Reports
