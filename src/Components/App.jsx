import './App.css'
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import React, { useState } from 'react';

function App() {
  const [taskList, setTaskList] = useState([]);

  function deleteTask(idToDelete) {
    setTaskList(prev => prev.filter(task => task.id !== idToDelete));
  }

  function toggleTaskComplete(idToToggle) {
    setTaskList(prev =>
      prev.map(task =>
        task.id === idToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function addNewTask(task) {
    setTaskList((prev) => [...prev, task]);
  }

  return (
    <>
      <h1>Hello, I am a to do list. Add stuff to me now.</h1>
      <AddItem updateTaskList={addNewTask} />
      {taskList.length === 0
        ? <div>No tasks yet! Add some</div>
        : <ToDoList items={taskList} DeleteItem={deleteTask} ToggleComplete = {toggleTaskComplete} />}
    </>
  )
}

export default App