import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: '10px' }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
