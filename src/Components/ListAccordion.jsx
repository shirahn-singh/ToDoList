import React, { useState } from "react";
import AddItem from './AddItem';
import ToDoList from './ToDoList';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function ListAccordion({ list, addTaskToList, deleteTask, toggleTaskComplete, toggleListComplete, deleteList }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <Accordion expanded={isOpen} onChange={toggleAccordion} sx={{ mb: 2 }}>
   <AccordionSummary  expandIcon={<ExpandMoreIcon /> }>
        <Typography
          variant="h6"
          sx={{
            textDecoration: list.completed ? 'line-through' : 'none',
            flexGrow: 1,
          }}
        >
          {list.text}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component="span" variant="outlined" color="success" onClick={() => toggleListComplete(list.id)}>
            Done
          </Button>
          <Button component="span" variant="outlined" color="error" onClick={() => deleteList(list.id)}>
            Delete
          </Button>
        </Stack>
      </AccordionSummary>
  
      <AccordionDetails>
        <AddItem updateTaskList={task => addTaskToList(list.id, task)} listName={list.text} />
        {list.tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No tasks yet! Add some
          </Typography>
        ) : (
          <ToDoList
            items={list.tasks}
            DeleteItem={taskId => deleteTask(list.id, taskId)}
            ToggleComplete={taskId => toggleTaskComplete(list.id, taskId)}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default ListAccordion;
