import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand bg-custom px-4 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h2 className="text-white m-0 fs-4">EMS</h2>
        <div className="d-flex">
          <Link to="/" className="nav-btn">Home</Link>
           <Link to="/employee" className="nav-btn">Employees</Link>
           <Link  to="/employeelist" className="nav-btn">Add</Link>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
