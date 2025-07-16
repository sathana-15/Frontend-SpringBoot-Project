// src/Signup.jsx
import { useState } from "react";
import './Signup.css';

 // Make sure this line is present to import the CSS

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState(""); 

  const handleSignup = (e) => {
    e.preventDefault();
    console.log({ name, email, password, userName, userRole }); 
    alert("Signup details submitted (add backend API call here)");
  };

  return (
    <section>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        {/* Each input/select group can be wrapped in a div for better styling control */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="userRole">User Role</label>
          <select
            id="userRole"
            name="userRole"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="both">Both</option>
          </select>
        </div>
        
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default Signup;