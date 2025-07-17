import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Yet to Start");
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, [navigate, token]);

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

  const handleCreateTask = (empId) => {
    setSelectedEmpId(empId);
    setShowModal(true);
  };

  const handleSaveTask = async () => {
    try {
      await axios.post(
        "http://localhost:8080/task",
        {
          title: newTaskTitle,
          status: newTaskStatus,
          assignedEmployee: {
            empId: selectedEmpId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task created!");
      setShowModal(false);
      setNewTaskTitle("");
      setNewTaskStatus("Yet to Start");
    } catch (err) {
      console.error("Error creating task", err);
      alert("Failed to create task");
    }
  };

  if (!checkedAuth) return null;

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
          {filteredEmployees.map((emp) => (
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
                  className="btn btn-info btn-sm me-2"
                >
                  View Tasks
                </button>
                <button
                  onClick={() => handleCreateTask(emp.empId)}
                  className="btn btn-success btn-sm"
                >
                  Create Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />

                <select
                  className="form-select"
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                >
                  <option>Yet to Start</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveTask}
                >
                  Save Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetEmployees;
