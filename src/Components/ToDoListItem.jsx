import React from "react";
import styles from '../styles/ToDoListItem.module.css';
import { Typography, Button, Stack } from '@mui/material';

function ToDoListItem({ item, onDelete, onComplete }) {
  return (
    <div className={styles.toDoListItem}>
      <Typography
        variant="body1"
        className={`${styles.taskText} ${item.completed ? styles.toDoListItemCompleted : ''}`}
      >
        {item.text}
      </Typography>

      <Stack direction="row" spacing={1} className={styles.buttonGroup}>
        <Button
          variant="outlined"
          color={item.completed ? 'warning' : 'success'}
          onClick={() => onComplete(item.id)}
        >
          {item.completed ? 'Whoops' : 'Done'}
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </Button>
      </Stack>
    </div>
  );
}

export default ToDoListItem;