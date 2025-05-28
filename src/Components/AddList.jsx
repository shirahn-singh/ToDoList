import React, { useState } from "react";
import styles from '../styles/AddList.module.css';

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
    <div className={styles.addItem}>
      <input className={styles.inputBox} onChange={(e) => { setCurrentList(e.target.value) }} value={list}></input>
      <div className={styles.buttonWrapper}>
        <button className={styles.addButton} onClick={() => { addToList(false) }} disabled={list.length == 0}> Create List</button>
        <button className={styles.addButton} onClick={() => { addToList(true) }} disabled={list.length == 0}> CreAIte my list</button>
      </div>
    </div>
  );
}

export default AddList;