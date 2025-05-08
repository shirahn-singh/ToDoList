import React, { useState } from "react";
import styles from '../styles/ToDoListItem.module.css';



function ToDoListItem({ item, onDelete, onComplete }) {
    return (
        <div key={item.id} className= {item.completed? styles.toDoListItemCompleted: styles.toDoListItem}>
            <div>{item.text}</div>
            <button onClick ={onComplete}> {!item.completed ? "Done" : "Whoops"}</button>
            <button onClick={()=>{onDelete(item.id)}}>Delete</button>
        </div>
    );
}

export default ToDoListItem;