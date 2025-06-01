import React, { useState } from "react";
import styles from '../styles/AddList.module.css';
import { TextField, Button, Stack } from '@mui/material';

function AddList({ addNewListGroup, generateListFromTitle }) {
  const [list, setCurrentList] = useState("");

  async function addToList(useAi) {
    if (list.length === 0) {
      alert("Please type something before adding");
      return;
    }
    if (useAi) {
      generateAIList();
    } else {
      generateStandardList();
    }
  }

  async function generateAIList() {
    const generatedList = await generateListFromTitle(list);
    if (generatedList) {
      setCurrentList("");
    }
  }

  function generateStandardList() {
    addNewListGroup({
      id: Date.now(),
      text: list,
      completed: false,
      tasks: [],
    });
    setCurrentList("");
  }

  return (
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
  <TextField
    label="What do you want to do? "
    variant="outlined"
    fullWidth
    value={list}
    onChange={(e) => setCurrentList(e.target.value)}
  />

  <Stack direction="row" spacing={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => addToList(false)}
      disabled={list.length === 0}
    >
      Create List
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => addToList(true)}
      disabled={list.length === 0}
    >
      CreAIte my list
    </Button>
  </Stack>
</Stack>
  );
}

export default AddList;