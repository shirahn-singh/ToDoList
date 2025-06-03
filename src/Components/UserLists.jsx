import React from 'react';
import Typography from '@mui/material/Typography';
import AddList from './AddList';
import List from './List';

const UserLists = ({
  listGroup,
  addNewListGroup,
  generateListFromTitle,
  addTaskToList,
  deleteTask,
  toggleTaskComplete,
  toggleListComplete,
  deleteList
}) => {
  return (
    <>
      <AddList
        addNewListGroup={addNewListGroup}
        generateListFromTitle={generateListFromTitle}
      />
      {listGroup.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tasks yet! Add some
        </Typography>
      ) : (
        <List
          items={listGroup}
          addTaskToList={addTaskToList}
          deleteTask={deleteTask}
          toggleTaskComplete={toggleTaskComplete}
          toggleListComplete={toggleListComplete}
          deleteList={deleteList}
        />
      )}
    </>
  );
};

export default UserLists;
