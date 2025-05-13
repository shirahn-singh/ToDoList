import './App.css';
import React, { useState } from 'react';
import List from './List';
import AddList from './AddList';
import styles from '../styles/App.module.css';

function App() {
  const [listGroup, setListGroup] = useState([
    {
      id: 1,
      text: "Groceries",
      completed: false,
      tasks: [{ id: 101, text: "Buy eggs", completed: false }]
    }
  ]);

  function addNewListGroup(task) {
    setListGroup((prev) => [...prev, task]);
  }

  function addTaskToList(listId, task) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, task] }
          : list
      )
    );
  }

  function deleteTaskFromList(listId, taskId) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  }

  function toggleTaskCompleteInList(listId, taskId) {
    setListGroup(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : list
      )
    );
  }

  return (
    <div className={styles.card}>
      <h1>Hello, I am a to do list. Add stuff to me now</h1>
      <AddList updateTaskLists={addNewListGroup} />
      {listGroup.length === 0 ? (
        <div className={styles.noTasksYet}>No tasks yet! Add some</div>
      ) : (
        <List
          items={listGroup}
          addTaskToList={addTaskToList}
          deleteTask={deleteTaskFromList}
          toggleTaskComplete={toggleTaskCompleteInList}
        />
      )}
    </div>
  );
}

export default App;
