import './App.css';
import React, { useState, useEffect } from 'react';
import List from './List';
import AddList from './AddList';
import useListGroup from '../hooks/useListGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import UserAccountInfo from './UserAccountInfo';

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
    <>
    <UserAccountInfo/>
    <Container maxWidth="xl" minWidth="md">
      <Typography variant="h4" gutterBottom>
        Hello, I am a to-do list. Add stuff to me now
      </Typography>
  
      <AddList addNewListGroup={addNewListGroup} generateListFromTitle={generateListFromTitle} />
  
      {listGroup.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tasks yet! Add some
        </Typography>
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
    </Container>
    </>
  );
}

export default App;
