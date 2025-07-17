import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    empId: '',
    name: '',
    email: '',
    userName: '',
    password: '',
    roleNames: ''
  });

 
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`http://localhost:8080/employee/id/${empId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch employee');

        const data = await res.json();
        setFormData({
          empId: data.empId,
          name: data.name,
          email: data.email,
          userName: data.userName,
          password: '', 
          roleNames: data.roles.map((role) => role.roleName).join(',')
        });
      } catch (err) {
        alert('Error fetching employee: ' + err.message);
      }
    };

    if (empId) {
      fetchEmployee();
    }
  }, [empId]);

  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/employee/${empId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          roleNames: formData.roleNames.split(',').map((r) => r.trim())
        }),
      });

      if (!res.ok) throw new Error('Update failed');

      const result = await res.text();
      alert(result);
      navigate("/employee"); 
    } catch (err) {
      alert('Error updating employee: ' + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded bg-light">
        <div className="mb-3">
          <label htmlFor="empId" className="form-label">Employee ID</label>
          <input type="number" className="form-control" id="empId" name="empId" value={formData.empId} disabled />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="roleNames" className="form-label">Roles (comma separated)</label>
          <input type="text" className="form-control" id="roleNames" name="roleNames" value={formData.roleNames} onChange={handleChange} placeholder="e.g., ROLE_ADMIN,ROLE_USER" />
        </div>

        <button type="submit" className="btn btn-primary">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
