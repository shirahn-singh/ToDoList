import './App.css'
import React, { useState } from 'react';
import List from './List';
import AddList from './AddList';
import styles from '../styles/App.module.css';
function App() {
  const [lists, setTaskLists] = useState([]);

  function deleteList(idToDelete) {
    setTaskLists(prev => prev.filter(task => task.id !== idToDelete));
  }

  function toggleTaskComplete(idToToggle) {
    setTaskLists(prev =>
      prev.map(task =>
        task.id === idToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function addNewTaskList(task) {
    setTaskLists((prev) => [...prev, task]);
  }

  return(
     <div className={styles.card}>
          <h1>Hello, I am a to do list. Add stuff to me now</h1>
          <AddList updateTaskLists={addNewTaskList}/>
          {lists.length === 0
            ? <div className = {styles.noTasksYet}>No tasks yet! Add some</div>
            : <List items={lists} DeleteItem={deleteList} ToggleComplete = {toggleTaskComplete} />}
        </div>
  );
}

export default App