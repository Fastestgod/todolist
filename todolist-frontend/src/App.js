// /todolist-frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('There was an error fetching tasks!', error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask) return;
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title: newTask,
        completed: false
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (taskId, currentTitle) => {
    setEditTaskId(taskId);
    setEditTaskTitle(currentTitle);
  };

  const handleSaveEdit = async () => {
    if (!editTaskTitle) return;
    try {
      const updatedTask = { title: editTaskTitle, completed: false };
      const response = await axios.put(`http://localhost:5000/api/tasks/${editTaskId}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === editTaskId ? response.data : task)));
      setEditTaskId(null);
      setEditTaskTitle('');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {editTaskId && (
        <div>
          <input
            type="text"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            placeholder="Edit task title"
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} {task.completed ? '(Completed)' : '(Pending)'}
            <button onClick={() => handleEditTask(task._id, task.title)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
