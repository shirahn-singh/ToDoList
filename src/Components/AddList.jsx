import React, {useState} from "react";
import styles from '../styles/AddList.module.css';

function AddList({updateTaskLists, buttonText, useAi}){
  const [list, setCurrentList] = useState("");

  async function addToList() {
    if (list.length === 0) {
      alert("Please type something before adding");
      return;
    }
    
    if (useAi) {
      const generatedList = await updateTaskLists(list);
      if (generatedList) {
        setCurrentList("");
      }
    } else {
      updateTaskLists({
        id: Date.now(),
        text: list,
        completed: false,
        tasks: [],
      });
      setCurrentList("");
    }
  }

    return (
        <div className={styles.addItem}>
            <input className = {styles.inputBox}onChange={(e) => { setCurrentList(e.target.value) }} value={list}></input>
            <button className = {styles.addButton} onClick={addToList} disabled={list.length == 0}> {buttonText}</button>
        </div>
    );
}

export default AddList;