import './App.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import AddList from './AddList';
import styles from '../styles/App.module.css';
import useListGroup from '../hooks/useListGroup';

function App() {
  const {
    listGroup,
    addNewListGroup,
    addTaskToList,
    deleteTaskFromList,
    toggleTaskCompleteInList,
    toggleListComplete,
    deleteList
  } = useListGroup();

  async function generateListFromTitle(listTitle) {
    const response = await fetch('http://localhost:5000/api/generate-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ listTitle }),
    });
  
    if (!response.ok) {
      console.error('Failed to generate list');
      return null;
    }
  
    const newList = await response.json();

    addNewListGroup(newList);
  }
  
  return (
    <div className={styles.card}>
      <h1>Hello, I am a to do list. Add stuff to me now</h1>
      <AddList addNewListGroup={addNewListGroup} generateListFromTitle = {generateListFromTitle} />
      {listGroup.length === 0 ? (
        <div className={styles.noTasksYet}>No tasks yet! Add some</div>
      ) : (
        <List
          items={listGroup}
          addTaskToList={addTaskToList}
          deleteTask={deleteTaskFromList}
          toggleTaskComplete={toggleTaskCompleteInList}
          toggleListComplete={toggleListComplete}
          deleteList={deleteList}
        />
      )}
    </div>
  );
}

export default App;
