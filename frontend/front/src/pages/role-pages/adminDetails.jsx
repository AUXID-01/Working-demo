import React from 'react'
import {
  FaKey,
  FaIdBadge,
  FaBuilding,
  FaPhoneAlt,
  FaUserShield,
} from 'react-icons/fa'

function AdminDetails({ formData, onChange }) {
  return (
    <>
      

      {/* Employee ID */}
      <div className="input-group">
        <FaIdBadge className="icon" />
        <input
          type="text"
          name="employeeId"
          placeholder="Employee ID"
          aria-label="Employee ID"
          value={formData.employeeId}
          onChange={onChange}
          required
        />
      </div>

      {/* Role Dropdown */}
      <div className="input-group">
        <FaUserShield className="icon" />
        <select
          name="role"
          aria-label="Admin Role"
          value={formData.role}
          onChange={onChange}
          required
        >
          <option value="">Select Role</option>
          <option value="super_admin">Super Admin</option>
          <option value="sub_admin">Sub Admin</option>
        </select>
      </div>

      {/* Organization Name */}
      <div className="input-group">
        <FaBuilding className="icon" />
        <input
          type="text"
          name="organization"
          placeholder="Organization Name"
          aria-label="Organization Name"
          value={formData.organization}
          onChange={onChange}
          required
        />
      </div>

      {/* Contact Details */}
      <div className="input-group">
        <FaPhoneAlt className="icon" />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          aria-label="Contact Number"
          value={formData.contact}
          onChange={onChange}
          required
        />
      </div>
    </>
  )
}

export default AdminDetails
