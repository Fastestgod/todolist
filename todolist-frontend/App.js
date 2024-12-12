import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};
<a href="/api-links">Go to API Links</a>

export default App;
