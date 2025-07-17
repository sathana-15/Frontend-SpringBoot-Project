import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeTasks = () => {
  const { empId } = useParams();
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:8080/task/employee/${empId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        alert("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [empId, token]);

  return (
    <div className="container mt-4">
      <h2>Tasks for Employee ID: {empId}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.taskId} className="list-group-item">
              <strong>{task.title}</strong> — <span className="badge bg-secondary">{task.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeTasks;
