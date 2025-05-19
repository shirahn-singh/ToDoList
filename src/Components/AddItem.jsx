import React, { useState } from "react";
import styles from "../styles/AddItem.module.css";


function AddItem({updateTaskList}) {
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
        <div className={styles.addItem}>
            <input className = {styles.inputBox}onChange={(e) => { setCurrentTask(e.target.value) }} value={task}></input>
            <button className = {styles.addButton } onClick={addToList} disabled={task.length == 0}> Add</button>
        </div>
    );
}

export default AddItem;