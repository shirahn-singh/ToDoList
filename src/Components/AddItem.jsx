import React, { useState } from "react";
import { TextField, Button, Stack } from '@mui/material';

function AddItem({updateTaskList, listName}) {
    const [task, setCurrentTask] = useState("");

    function addToList() {
        if (task.length > 0) {
            updateTaskList({
                id: Date.now(),
                text: task,
                completed: false
              });
              
            setCurrentTask("");
        }
    }

    return (
        <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label={`New '${listName}' task`}
          variant="standard"
          fullWidth
          value={task}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
      
        <Button
          variant="contained"
          color="primary"
          onClick={addToList}
          disabled={task.length === 0}
        >
          Add
        </Button>
      </Stack>
    );
}

export default AddItem;