import './App.css';
import React, { useState } from 'react';
import UserLists from './UserLists';
import Feed from './Feed';
import useListGroup from '../hooks/useListGroup';
import { Box, Tab, Tabs, Container, Typography } from '@mui/material';
import UserAccountInfo from './UserAccountInfo';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

function App() {
  const { user, login, logout, signUp, loginWithEmail } = useFirebaseAuth();
  const {
    listGroup,
    addNewListGroup,
    addTaskToList,
    deleteTaskFromList,
    toggleTaskCompleteInList,
    toggleListComplete,
    deleteList,
    clearAllLists
  } = useListGroup(user);

  const [tabIndex, setTabIndex] = useState(0);

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

  const handleLogout = async () => {
    await logout();
    clearAllLists(); 
    localStorage.removeItem("listGroupData"); 
  };

  return (
    <>
      <UserAccountInfo
        user={user}
        login={login}
        logout={handleLogout}
        signUp={signUp}
        loginWithEmail={loginWithEmail}
      />
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Hello, I am a to-do list. Add stuff to me now
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
            <Tab label="My Lists" />
            {user && <Tab label="Feed" />}
          </Tabs>
        </Box>

        {tabIndex === 0 && (
          <UserLists
            listGroup={listGroup}
            addNewListGroup={addNewListGroup}
            generateListFromTitle={generateListFromTitle}
            addTaskToList={addTaskToList}
            deleteTask={deleteTaskFromList}
            toggleTaskComplete={toggleTaskCompleteInList}
            toggleListComplete={toggleListComplete}
            deleteList={deleteList}
          />
        )}

        {tabIndex === 1 && user && <Feed />}

        {tabIndex === 1 && !user && (
          <Typography variant="body1" color="text.secondary">
            Please log in to view the feed.
          </Typography>
        )}
      </Container>
    </>
  );
}


export default App;
