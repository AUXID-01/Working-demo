function Appointments() {
  return (
    <div className="container mt-4">
      <h2>Appointments</h2>
      <p>Here you can view and book appointments.</p>

      <div className="card p-3 shadow-sm mt-3">
        <h5>Upcoming Appointments</h5>
        <ul>
          <li>Dr. Singh - 15 Sept 2025, 10:00 AM</li>
          <li>Dr. Kaur - 20 Sept 2025, 4:30 PM</li>
        </ul>
      </div>
    </div>
  )
}

export default Appointments
