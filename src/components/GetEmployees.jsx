import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [checkedAuth, setCheckedAuth] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    
    if (!token) {
      navigate("/login");
      return;
    }

   
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employee", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (err) {
        console.error("Unauthorized or error", err);
        alert("Unauthorized");
        navigate("/login");
      } finally {
        setCheckedAuth(true); 
      }
    };

    fetchEmployees();
  }, [navigate]);

  const token = localStorage.getItem("token");

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/employee/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.empId !== empId));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Delete failed");
    }
  };

  const handleEdit = (empId) => {
    navigate(`/edit/${empId}`);
  };

  const handleViewTasks = (empId) => {
    navigate(`/employee/${empId}/tasks`);
  };

  
  if (!checkedAuth) return null;

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empId}>
              <td>{emp.empId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>
                <button
                  onClick={() => handleDelete(emp.empId)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(emp.empId)}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleViewTasks(emp.empId)}
                  className="btn btn-info btn-sm"
                >
                  View Tasks
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetEmployees;
