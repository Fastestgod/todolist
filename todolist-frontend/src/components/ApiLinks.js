import React from 'react';

const ApiLinks = () => {
  return (
    <div>
      <h2>API Endpoints</h2>
      <ul>
        <li><a href="http://localhost:5000/api/tasks" target="_blank">View All Tasks</a></li>
        <li><a href="http://localhost:5000/api/tasks" target="_blank">Create Task</a></li>
        <li><a href="http://localhost:5000/api/tasks/:id" target="_blank">Update Task</a></li>
        <li><a href="http://localhost:5000/api/tasks/:id" target="_blank">Delete Task</a></li>
      </ul>
    </div>
  );
};

export default ApiLinks;
