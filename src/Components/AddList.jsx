import React, {useState} from "react";
import styles from '../styles/AddList.module.css';

function AddList({updateTaskLists}){
  const [list, setCurrentList] = useState("");

    function addToList() {
        if (list.length > 0) {
           updateTaskLists({
            id: Date.now(),
            text: list,
            completed: false,
            tasks: []
           })
        }
        else {
            alert("Please type something before adding");
        }
    }

    return (
        <div className={styles.addItem}>
            <input className = {styles.inputBox}onChange={(e) => { setCurrentList(e.target.value) }} value={list}></input>
            <button className = {styles.addButton} onClick={addToList} disabled={list.length == 0}> Add to list</button>
        </div>
    );
}

export default AddList;