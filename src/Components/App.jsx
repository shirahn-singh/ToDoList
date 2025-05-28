import './App.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import AddList from './AddList';
import styles from '../styles/App.module.css';

function App() {
  const [listGroup, setListGroup] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem('listGroupData');
    if (stored) {
      setListGroup(JSON.parse(stored));
    }
    setHasLoaded(true);
  }, []);
  
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('listGroupData', JSON.stringify(listGroup));
    }
  }, [listGroup, hasLoaded]);

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

    moveToEnd(listId, taskId);
  }

  function moveToEnd(listId, taskId){
    
    setListGroup(prev=>
      prev.map(list=>{
        if(list.id !== listId){
          return list;
        }

        if(list.tasks.length==0){
          return list;
        }

        const taskToMove = list.tasks.find(task => task?.id === taskId);

        if (!taskToMove || !taskToMove.completed) {
          return list;
        }

        const remainingTasks = list.tasks.filter((task)=>(task?.id!==taskId));
        return{
          ...list,
          tasks: [...remainingTasks, taskToMove]
        };

      })
    )
  }

  function toggleListComplete(listId){
    setListGroup((prev)=>prev.map(listItem =>
      listId == listItem.id ? {
        ...listItem,
        completed: !listItem.completed,
        tasks: listItem.tasks.map((task) =>({
          ...task,
          completed: !listItem.completed
        }))
      }:listItem
    ));
  }

  function deleteList(listId){
    setListGroup(prev =>
      prev.filter(listItem => listItem.id !== listId)
    );
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
