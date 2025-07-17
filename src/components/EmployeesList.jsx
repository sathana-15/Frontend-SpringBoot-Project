import { useState } from "react";
import axios from "axios";

const EmployeesList = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roleNames") {
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setForm({ ...form, [name]: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      alert("Registered Successfully!");
    } catch (error) {
      console.error("Registration Error", error);
      alert("Error while registering");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add Employees</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    value={form.userName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="roleNames" className="form-label">Role</label>
                  <select
                    name="roleNames"
                    className="form-select"
                    value={form.roleNames[0] || ""}
                    onChange={(e) =>
                      setForm({ ...form, roleNames: [e.target.value] })
                    }
                    required
                  >
                    <option value="">Select a Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  ADD
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeesList;