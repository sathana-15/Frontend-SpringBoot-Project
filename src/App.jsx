
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./components/Login";
import Signup from "./components/Register";
import GetEmployees from "./components/GetEmployees";
import EditEmployee from './components/EditEmployee';
import EmployeesList from './components/EmployeesList';
import EmployeeTasks from './components/EmployeeTasks';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <GetEmployees />
            </ProtectedRoute>
          }
        />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={<GetEmployees />} />
          <Route path="/edit/:empId" element={<EditEmployee />} />
          <Route path="/employeelist" element={<EmployeesList />} />
          <Route path="/employee/:empId/tasks" element={<EmployeeTasks />} />
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
