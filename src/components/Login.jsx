

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        userName,
        password,
      });

      const token = res.data.token;
      const role = res.data.role;

     
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      
      window.dispatchEvent(new Event("storage")); 


      alert("Login Successful");
      navigate("/employee"); 
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="d-flex justify-content-center mt-5 pt-4">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              id="userName"
              name="userName"
              value={userName}
              type="text"
              className="form-control"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              value={password}
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
